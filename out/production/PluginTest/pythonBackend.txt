# Copyright 2015 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Takes a generator of values, and accumulates them for a frontend."""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import bisect
import collections
import os
import threading

import six
import tensorflow as tf

def IsGCSPath(path):
  return path.startswith("gs://")


def ListDirectoryAbsolute(directory):
  """Yields all files in the given directory. The paths are absolute."""
  return (os.path.join(directory, path)
          for path in tf.gfile.ListDirectory(directory))


def ListRecursively(top):
  """Walks a directory tree, yielding (dir_path, file_paths) tuples.

  For each of `top` and its subdirectories, yields a tuple containing the path
  to the directory and the path to each of the contained files.  Note that
  unlike os.Walk()/tf.gfile.Walk(), this does not list subdirectories and the
  file paths are all absolute.

  If the directory does not exist, this yields nothing.

  Args:
    top: A path to a directory..
  Yields:
    A list of (dir_path, file_paths) tuples.
  """
  for dir_path, _, filenames in tf.gfile.Walk(top):
    yield (dir_path, (os.path.join(dir_path, filename)
                      for filename in filenames))

class DirectoryWatcher(object):
  """A DirectoryWatcher wraps a loader to load from a sequence of paths.

  A loader reads a path and produces some kind of values as an iterator. A
  DirectoryWatcher takes a directory, a factory for loaders, and optionally a
  path filter and watches all the paths inside that directory.

  This class is only valid under the assumption that only one path will be
  written to by the backenddata source at a time and that once the source stops writing
  to a path, it will start writing to a new path that's lexicographically
  greater and never come back. It uses some heuristics to check whether this is
  true based on tracking changes to the files' sizes, but the check can have
  false negatives. However, it should have no false positives.
  """

  def __init__(self, directory, loader_factory, path_filter=lambda x: True):
    """Constructs a new DirectoryWatcher.

    Args:
      directory: The directory to load files from.
      loader_factory: A factory for creating loaders. The factory should take a
        path and return an object that has a Load method returning an
        iterator that will yield all events that have not been yielded yet.
      path_filter: If specified, only paths matching this filter are loaded.

    Raises:
      ValueError: If path_provider or loader_factory are None.
    """
    if directory is None:
      raise ValueError('A directory is required')
    if loader_factory is None:
      raise ValueError('A loader factory is required')
    self._directory = directory
    self._path = None
    self._loader_factory = loader_factory
    self._loader = None
    self._path_filter = path_filter
    self._ooo_writes_detected = False
    # The file size for each file at the time it was finalized.
    self._finalized_sizes = {}

  def Load(self):
    """Loads new values.

    The watcher will load from one path at a time; as soon as that path stops
    yielding events, it will move on to the next path. We assume that old paths
    are never modified after a newer path has been written. As a result, Load()
    can be called multiple times in a row without losing events that have not
    been yielded yet. In other words, we guarantee that every event will be
    yielded exactly once.

    Yields:
      All values that have not been yielded yet.

    Raises:
      DirectoryDeletedError: If the directory has been permanently deleted
        (as opposed to being temporarily unavailable).
    """
    try:
      for event in self._LoadInternal():
        yield event
    except tf.errors.OpError:
      if not tf.gfile.Exists(self._directory):
        raise DirectoryDeletedError(
          'Directory %s has been permanently deleted' % self._directory)

  def _LoadInternal(self):
    """Internal implementation of Load().

    The only difference between this and Load() is that the latter will throw
    DirectoryDeletedError on I/O errors if it thinks that the directory has been
    permanently deleted.

    Yields:
      All values that have not been yielded yet.
    """

    # If the loader exists, check it for a value.
    if not self._loader:
      self._InitializeLoader()

    while True:
      # Yield all the new events in the path we're currently loading from.
      for event in self._loader.Load():
        yield event

      next_path = self._GetNextPath()
      if not next_path:
        tf.logging.info('No path found after %s', self._path)
        # Current path is empty and there are no new paths, so we're done.
        return

      # There's a new path, so check to make sure there weren't any events
      # written between when we finished reading the current path and when we
      # checked for the new one. The sequence of events might look something
      # like this:
      #
      # 1. Event #1 written to path #1.
      # 2. We check for events and yield event #1 from path #1
      # 3. We check for events and see that there are no more events in path #1.
      # 4. Event #2 is written to path #1.
      # 5. Event #3 is written to path #2.
      # 6. We check for a new path and see that path #2 exists.
      #
      # Without this loop, we would miss event #2. We're also guaranteed by the
      # loader contract that no more events will be written to path #1 after
      # events start being written to path #2, so we don't have to worry about
      # that.
      for event in self._loader.Load():
        yield event

      tf.logging.info('Directory watcher advancing from %s to %s', self._path,
                      next_path)

      # Advance to the next path and start over.
      self._SetPath(next_path)

  # The number of paths before the current one to check for out of order writes.
  _OOO_WRITE_CHECK_COUNT = 20

  def OutOfOrderWritesDetected(self):
    """Returns whether any out-of-order writes have been detected.

    Out-of-order writes are only checked as part of the Load() iterator. Once an
    out-of-order write is detected, this function will always return true.

    Note that out-of-order write detection is not performed on GCS paths, so
    this function will always return false.

    Returns:
      Whether any out-of-order write has ever been detected by this watcher.

    """
    return self._ooo_writes_detected

  def _InitializeLoader(self):
    path = self._GetNextPath()
    if path:
      self._SetPath(path)
    else:
      raise StopIteration

  def _SetPath(self, path):
    """Sets the current path to watch for new events.

    This also records the size of the old path, if any. If the size can't be
    found, an error is logged.

    Args:
      path: The full path of the file to watch.
    """
    old_path = self._path
    if old_path and not IsGCSPath(old_path):
      try:
        # We're done with the path, so store its size.
        size = tf.gfile.Stat(old_path).length
        tf.logging.debug('Setting latest size of %s to %d', old_path, size)
        self._finalized_sizes[old_path] = size
      except tf.errors.OpError as e:
        tf.logging.error('Unable to get size of %s: %s', old_path, e)

    self._path = path
    self._loader = self._loader_factory(path)

  def _GetNextPath(self):
    """Gets the next path to load from.

    This function also does the checking for out-of-order writes as it iterates
    through the paths.

    Returns:
      The next path to load events from, or None if there are no more paths.
    """
    paths = sorted(path
                   for path in ListDirectoryAbsolute(self._directory)
                   if self._path_filter(path))
    if not paths:
      return None

    if self._path is None:
      return paths[0]

    # Don't bother checking if the paths are GCS (which we can't check) or if
    # we've already detected an OOO write.
    if not IsGCSPath(paths[0]) and not self._ooo_writes_detected:
      # Check the previous _OOO_WRITE_CHECK_COUNT paths for out of order writes.
      current_path_index = bisect.bisect_left(paths, self._path)
      ooo_check_start = max(0, current_path_index - self._OOO_WRITE_CHECK_COUNT)
      for path in paths[ooo_check_start:current_path_index]:
        if self._HasOOOWrite(path):
          self._ooo_writes_detected = True
          break

    next_paths = list(path
                      for path in paths
                      if self._path is None or path > self._path)
    if next_paths:
      return min(next_paths)
    else:
      return None

  def _HasOOOWrite(self, path):
    """Returns whether the path has had an out-of-order write."""
    # Check the sizes of each path before the current one.
    size = tf.gfile.Stat(path).length
    old_size = self._finalized_sizes.get(path, None)
    if size != old_size:
      if old_size is None:
        tf.logging.error('File %s created after file %s even though it\'s '
                         'lexicographically earlier', path, self._path)
      else:
        tf.logging.error('File %s updated even though the current file is %s',
                         path, self._path)
      return True
    else:
      return False


class DirectoryDeletedError(Exception):
  """Thrown by Load() when the directory is *permanently* gone.

  We distinguish this from temporary errors so that other code can decide to
  drop all of our backenddata only when a directory has been intentionally deleted,
  as opposed to due to transient filesystem errors.
  """
  pass

class EventFileLoader(object):
  """An EventLoader is an iterator that yields Event protos."""

  def __init__(self, file_path):
    if file_path is None:
      raise ValueError('A file path is required')
    file_path = tf.resource_loader.readahead_file_path(file_path)
    tf.logging.debug('Opening a record reader pointing at %s', file_path)
    with tf.errors.raise_exception_on_not_ok_status() as status:
      self._reader = tf.pywrap_tensorflow.PyRecordReader_New(
        tf.compat.as_bytes(file_path), 0, tf.compat.as_bytes(''), status)
    # Store it for logging purposes.
    self._file_path = file_path
    if not self._reader:
      raise IOError('Failed to open a record reader pointing to %s' % file_path)

  def Load(self):
    """Loads all new values from disk.

    Calling Load multiple times in a row will not 'drop' events as long as the
    return value is not iterated over.

    Yields:
      All values that were written to disk that have not been yielded yet.
    """
    tf.logging.debug('Loading events from %s', self._file_path)
    while True:
      try:
        with tf.errors.raise_exception_on_not_ok_status() as status:
          self._reader.GetNext(status)
      except (tf.errors.DataLossError, tf.errors.OutOfRangeError):
        # We ignore partial read exceptions, because a record may be truncated.
        # PyRecordReader holds the offset prior to the failed read, so retrying
        # will succeed.
        break
      event = tf.Event()
      event.ParseFromString(self._reader.record())
      yield event
    tf.logging.debug('No more events in %s', self._file_path)


_PLUGINS_DIR = "plugins"


def _IsDirectory(parent, item):
  """Helper that returns if parent/item is a directory."""
  return tf.gfile.IsDirectory(os.path.join(parent, item))


def PluginDirectory(logdir, plugin_name):
  """Returns the plugin directory for plugin_name."""
  return os.path.join(logdir, _PLUGINS_DIR, plugin_name)


def ListPlugins(logdir):
  """List all the plugins that have registered assets in logdir.

  If the plugins_dir does not exist, it returns an empty list. This maintains
  compatibility with old directories that have no plugins written.

  Args:
    logdir: A directory that was created by a TensorFlow events writer.

  Returns:
    a list of plugin names, as strings
  """
  plugins_dir = os.path.join(logdir, _PLUGINS_DIR)
  if not tf.gfile.IsDirectory(plugins_dir):
    return []
  entries = tf.gfile.ListDirectory(plugins_dir)
  return [x for x in entries if _IsDirectory(plugins_dir, x)]


def ListAssets(logdir, plugin_name):
  """List all the assets that are available for given plugin in a logdir.

  Args:
    logdir: A directory that was created by a TensorFlow summary.FileWriter.
    plugin_name: A string name of a plugin to list assets for.

  Returns:
    A string list of available plugin assets. If the plugin subdirectory does
    not exist (either because the logdir doesn't exist, or because the plugin
    didn't register) an empty list is returned.
  """
  plugin_dir = PluginDirectory(logdir, plugin_name)
  if not tf.gfile.IsDirectory(plugin_dir):
    return []
  entries = tf.gfile.ListDirectory(plugin_dir)
  return [x for x in entries if not _IsDirectory(plugin_dir, x)]


def RetrieveAsset(logdir, plugin_name, asset_name):
  """Retrieve a particular plugin asset from a logdir.

  Args:
    logdir: A directory that was created by a TensorFlow summary.FileWriter.
    plugin_name: The plugin we want an asset from.
    asset_name: The name of the requested asset.

  Returns:
    string contents of the plugin asset.

  Raises:
    KeyError: if the asset does not exist.
  """

  asset_path = os.path.join(PluginDirectory(logdir, plugin_name), asset_name)
  try:
    with tf.gfile.Open(asset_path, "r") as f:
      return f.read()
  except tf.errors.NotFoundError:
    raise KeyError("Asset path %s not found" % asset_path)
  except tf.errors.OpError as e:
    raise KeyError("Couldn't read asset path: %s, OpError %s" % (asset_path, e))

import collections
import random
import threading


class Reservoir(object):
  """A map-to-arrays container, with deterministic Reservoir Sampling.

  Items are added with an associated key. Items may be retrieved by key, and
  a list of keys can also be retrieved. If size is not zero, then it dictates
  the maximum number of items that will be stored with each key. Once there are
  more items for a given key, they are replaced via reservoir sampling, such
  that each item has an equal probability of being included in the sample.

  Deterministic means that for any given seed and bucket size, the sequence of
  values that are kept for any given tag will always be the same, and that this
  is independent of any insertions on other tags. That is:

  >>> separate_reservoir = reservoir.Reservoir(10)
  >>> interleaved_reservoir = reservoir.Reservoir(10)
  >>> for i in xrange(100):
  >>>   separate_reservoir.AddItem('key1', i)
  >>> for i in xrange(100):
  >>>   separate_reservoir.AddItem('key2', i)
  >>> for i in xrange(100):
  >>>   interleaved_reservoir.AddItem('key1', i)
  >>>   interleaved_reservoir.AddItem('key2', i)

  separate_reservoir and interleaved_reservoir will be in identical states.

  See: https://en.wikipedia.org/wiki/Reservoir_sampling

  Adding items has amortized O(1) runtime.

  Fields:
    always_keep_last: Whether the latest seen sample is always at the
      end of the reservoir. Defaults to True.
    size: An integer of the maximum number of samples.
  """

  def __init__(self, size, seed=0, always_keep_last=True):
    """Creates a new reservoir.

    Args:
      size: The number of values to keep in the reservoir for each tag. If 0,
        all values will be kept.
      seed: The seed of the random number generator to use when sampling.
        Different values for |seed| will produce different samples from the same
        input items.
      always_keep_last: Whether to always keep the latest seen item in the
        end of the reservoir. Defaults to True.

    Raises:
      ValueError: If size is negative or not an integer.
    """
    if size < 0 or size != round(size):
      raise ValueError('size must be nonegative integer, was %s' % size)
    self._buckets = collections.defaultdict(
      lambda: _ReservoirBucket(size, random.Random(seed), always_keep_last))
    # _mutex guards the keys - creating new keys, retrieving by key, etc
    # the internal items are guarded by the ReservoirBuckets' internal mutexes
    self._mutex = threading.Lock()
    self.size = size
    self.always_keep_last = always_keep_last

  def Keys(self):
    """Return all the keys in the reservoir.

    Returns:
      ['list', 'of', 'keys'] in the Reservoir.
    """
    with self._mutex:
      return list(self._buckets.keys())

  def Items(self, key):
    """Return items associated with given key.

    Args:
      key: The key for which we are finding associated items.

    Raises:
      KeyError: If the key is not found in the reservoir.

    Returns:
      [list, of, items] associated with that key.
    """
    with self._mutex:
      if key not in self._buckets:
        raise KeyError('Key %s was not found in Reservoir' % key)
      bucket = self._buckets[key]
    return bucket.Items()

  def AddItem(self, key, item, f=lambda x: x):
    """Add a new item to the Reservoir with the given tag.

    If the reservoir has not yet reached full size, the new item is guaranteed
    to be added. If the reservoir is full, then behavior depends on the
    always_keep_last boolean.

    If always_keep_last was set to true, the new item is guaranteed to be added
    to the reservoir, and either the previous last item will be replaced, or
    (with low probability) an older item will be replaced.

    If always_keep_last was set to false, then the new item will replace an
    old item with low probability.

    If f is provided, it will be applied to transform item (lazily, iff item is
      going to be included in the reservoir).

    Args:
      key: The key to store the item under.
      item: The item to add to the reservoir.
      f: An optional function to transform the item prior to addition.
    """
    with self._mutex:
      bucket = self._buckets[key]
    bucket.AddItem(item, f)

  def FilterItems(self, filterFn, key=None):
    """Filter items within a Reservoir, using a filtering function.

    Args:
      filterFn: A function that returns True for the items to be kept.
      key: An optional bucket key to filter. If not specified, will filter all
        all buckets.

    Returns:
      The number of items removed.
    """
    with self._mutex:
      if key:
        if key in self._buckets:
          return self._buckets[key].FilterItems(filterFn)
        else:
          return 0
      else:
        return sum(bucket.FilterItems(filterFn)
                   for bucket in self._buckets.values())


class _ReservoirBucket(object):
  """A container for items from a stream, that implements reservoir sampling.

  It always stores the most recent item as its final item.
  """

  def __init__(self, _max_size, _random=None, always_keep_last=True):
    """Create the _ReservoirBucket.

    Args:
      _max_size: The maximum size the reservoir bucket may grow to. If size is
        zero, the bucket has unbounded size.
      _random: The random number generator to use. If not specified, defaults to
        random.Random(0).
      always_keep_last: Whether the latest seen item should always be included
        in the end of the bucket.

    Raises:
      ValueError: if the size is not a nonnegative integer.
    """
    if _max_size < 0 or _max_size != round(_max_size):
      raise ValueError('_max_size must be nonegative int, was %s' % _max_size)
    self.items = []
    # This mutex protects the internal items, ensuring that calls to Items and
    # AddItem are thread-safe
    self._mutex = threading.Lock()
    self._max_size = _max_size
    self._num_items_seen = 0
    if _random is not None:
      self._random = _random
    else:
      self._random = random.Random(0)
    self.always_keep_last = always_keep_last

  def AddItem(self, item, f=lambda x: x):
    """Add an item to the ReservoirBucket, replacing an old item if necessary.

    The new item is guaranteed to be added to the bucket, and to be the last
    element in the bucket. If the bucket has reached capacity, then an old item
    will be replaced. With probability (_max_size/_num_items_seen) a random item
    in the bucket will be popped out and the new item will be appended
    to the end. With probability (1 - _max_size/_num_items_seen)
    the last item in the bucket will be replaced.

    Since the O(n) replacements occur with O(1/_num_items_seen) likelihood,
    the amortized runtime is O(1).

    Args:
      item: The item to add to the bucket.
      f: A function to transform item before addition, if it will be kept in
        the reservoir.
    """
    with self._mutex:
      if len(self.items) < self._max_size or self._max_size == 0:
        self.items.append(f(item))
      else:
        r = self._random.randint(0, self._num_items_seen)
        if r < self._max_size:
          self.items.pop(r)
          self.items.append(f(item))
        elif self.always_keep_last:
          self.items[-1] = f(item)
      self._num_items_seen += 1

  def FilterItems(self, filterFn):
    """Filter items in a ReservoirBucket, using a filtering function.

    Filtering items from the reservoir bucket must update the
    internal state variable self._num_items_seen, which is used for determining
    the rate of replacement in reservoir sampling. Ideally, self._num_items_seen
    would contain the exact number of items that have ever seen by the
    ReservoirBucket and satisfy filterFn. However, the ReservoirBucket does not
    have access to all items seen -- it only has access to the subset of items
    that have survived sampling (self.items). Therefore, we estimate
    self._num_items_seen by scaling it by the same ratio as the ratio of items
    not removed from self.items.

    Args:
      filterFn: A function that returns True for items to be kept.

    Returns:
      The number of items removed from the bucket.
    """
    with self._mutex:
      size_before = len(self.items)
      self.items = list(filter(filterFn, self.items))
      size_diff = size_before - len(self.items)

      # Estimate a correction the number of items seen
      prop_remaining = len(self.items) / float(
        size_before) if size_before > 0 else 0
      self._num_items_seen = int(round(self._num_items_seen * prop_remaining))
      return size_diff

  def Items(self):
    """Get all the items in the bucket."""
    with self._mutex:
      return list(self.items)

namedtuple = collections.namedtuple

TensorEvent = namedtuple('TensorEvent', ['wall_time', 'step', 'tensor_proto'])

## Different types of summary events handled by the event_accumulator
SUMMARY_TYPES = {
    'tensor': '_ProcessTensor',
}

## The tagTypes below are just arbitrary strings chosen to pass the type
## information of the tag from the backend to the frontend
TENSORS = 'tensors'
GRAPH = 'graph'
META_GRAPH = 'meta_graph'
RUN_METADATA = 'run_metadata'

DEFAULT_SIZE_GUIDANCE = {
    TENSORS: 500,
}

STORE_EVERYTHING_SIZE_GUIDANCE = {
    TENSORS: 0,
}

_TENSOR_RESERVOIR_KEY = "."  # arbitrary


def IsTensorFlowEventsFile(path):
  """Check the path name to see if it is probably a TF Events file.

  Args:
    path: A file path to check if it is an event file.

  Raises:
    ValueError: If the path is an empty string.

  Returns:
    If path is formatted like a TensorFlowEventsFile.
  """
  if not path:
    raise ValueError('Path must be a nonempty string')
  return 'tfevents' in tf.compat.as_str_any(os.path.basename(path))


class EventAccumulator(object):
  """An `EventAccumulator` takes an event generator, and accumulates the values.

  The `EventAccumulator` is intended to provide a convenient Python
  interface for loading Event backenddata written during a TensorFlow run.
  TensorFlow writes out `Event` protobuf objects, which have a timestamp
  and step number, and often contain a `Summary`. Summaries can have
  different kinds of backenddata stored as arbitrary tensors. The Summaries
  also have a tag, which we use to organize logically related backenddata. The
  `EventAccumulator` supports retrieving the `Event` and `Summary` backenddata
  by its tag.

  Calling `Tags()` gets a map from `tagType` (i.e., `tensors`) to the
  associated tags for those backenddata types. Then, the functional endpoint
  (i.g., `Accumulator.Tensors(tag)`) allows for the retrieval of all
  backenddata associated with that tag.

  The `Reload()` method synchronously loads all of the backenddata written so far.

  Fields:
    most_recent_step: Step of last Event proto added. This should only
        be accessed from the thread that calls Reload. This is -1 if
        nothing has been loaded yet.
    most_recent_wall_time: Timestamp of last Event proto added. This is
        a float containing seconds from the UNIX epoch, or -1 if
        nothing has been loaded yet. This should only be accessed from
        the thread that calls Reload.
    path: A file path to a directory containing tf events files, or a single
        tf events file. The accumulator will load events from this path.
    tensors_by_tag: A dictionary mapping each tag name to a
      reservoir.Reservoir of tensor summaries. Each such reservoir will
      only use a single key, given by `_TENSOR_RESERVOIR_KEY`.

  @@Tensors
  """

  def __init__(self,
               path,
               size_guidance=None,
               tensor_size_guidance=None,
               purge_orphaned_data=True):
    """Construct the `EventAccumulator`.

    Args:
      path: A file path to a directory containing tf events files, or a single
        tf events file. The accumulator will load events from this path.
      size_guidance: Information on how much backenddata the EventAccumulator should
        store in memory. The DEFAULT_SIZE_GUIDANCE tries not to store too much
        so as to avoid OOMing the client. The size_guidance should be a map
        from a `tagType` string to an integer representing the number of
        items to keep per tag for items of that `tagType`. If the size is 0,
        all events are stored.
      tensor_size_guidance: Like `size_guidance`, but allowing finer
        granularity for tensor summaries. Should be a map from the
        `plugin_name` field on the `PluginData` proto to an integer
        representing the number of items to keep per tag. Plugins for
        which there is no entry in this map will default to the value of
        `size_guidance[event_accumulator.TENSORS]`. Defaults to `{}`.
      purge_orphaned_data: Whether to discard any events that were "orphaned" by
        a TensorFlow restart.
    """
    size_guidance = dict(size_guidance or DEFAULT_SIZE_GUIDANCE)
    sizes = {}
    for key in DEFAULT_SIZE_GUIDANCE:
      if key in size_guidance:
        sizes[key] = size_guidance[key]
      else:
        sizes[key] = DEFAULT_SIZE_GUIDANCE[key]
    self._size_guidance = size_guidance
    self._tensor_size_guidance = dict(tensor_size_guidance or {})

    self._first_event_timestamp = None

    self._graph = None
    self._graph_from_metagraph = False
    self._meta_graph = None
    self._tagged_metadata = {}
    self.summary_metadata = {}
    self.tensors_by_tag = {}
    self._tensors_by_tag_lock = threading.Lock()

    # Keep a mapping from plugin name to a dict mapping from tag to plugin backenddata
    # content obtained from the SummaryMetadata (metadata field of Value) for
    # that plugin (This is not the entire SummaryMetadata proto - only the
    # content for that plugin). The SummaryWriter only keeps the content on the
    # first event encountered per tag, so we must store that first instance of
    # content for each tag.
    self._plugin_to_tag_to_content = collections.defaultdict(dict)

    self._generator_mutex = threading.Lock()
    self.path = path
    self._generator = _GeneratorFromPath(path)

    self.purge_orphaned_data = purge_orphaned_data

    self.most_recent_step = -1
    self.most_recent_wall_time = -1
    self.file_version = None

  def Reload(self):
    """Loads all events added since the last call to `Reload`.

    If `Reload` was never called, loads all events in the file.

    Returns:
      The `EventAccumulator`.
    """
    with self._generator_mutex:
      for event in self._generator.Load():
        self._ProcessEvent(event)
    return self

  def PluginAssets(self, plugin_name):
    """Return a list of all plugin assets for the given plugin.

    Args:
      plugin_name: The string name of a plugin to retrieve assets for.

    Returns:
      A list of string plugin asset names, or empty list if none are available.
      If the plugin was not registered, an empty list is returned.
    """
    return ListAssets(self.path, plugin_name)

  def RetrievePluginAsset(self, plugin_name, asset_name):
    """Return the contents of a given plugin asset.

    Args:
      plugin_name: The string name of a plugin.
      asset_name: The string name of an asset.

    Returns:
      The string contents of the plugin asset.

    Raises:
      KeyError: If the asset is not available.
    """
    return RetrieveAsset(self.path, plugin_name, asset_name)

  def FirstEventTimestamp(self):
    """Returns the timestamp in seconds of the first event.

    If the first event has been loaded (either by this method or by `Reload`,
    this returns immediately. Otherwise, it will load in the first event. Note
    that this means that calling `Reload` will cause this to block until
    `Reload` has finished.

    Returns:
      The timestamp in seconds of the first event that was loaded.

    Raises:
      ValueError: If no events have been loaded and there were no events found
      on disk.
    """
    if self._first_event_timestamp is not None:
      return self._first_event_timestamp
    with self._generator_mutex:
      try:
        event = next(self._generator.Load())
        self._ProcessEvent(event)
        return self._first_event_timestamp

      except StopIteration:
        raise ValueError('No event timestamp could be found')

  def PluginTagToContent(self, plugin_name):
    """Returns a dict mapping tags to content specific to that plugin.

    Args:
      plugin_name: The name of the plugin for which to fetch plugin-specific
        content.

    Raises:
      KeyError: if the plugin name is not found.

    Returns:
      A dict mapping tags to plugin-specific content (which are always strings).
      Those strings are often serialized protos.
    """
    if plugin_name not in self._plugin_to_tag_to_content:
      raise KeyError('Plugin %r could not be found.' % plugin_name)
    return self._plugin_to_tag_to_content[plugin_name]

  def SummaryMetadata(self, tag):
    """Given a summary tag name, return the associated metadata object.

    Args:
      tag: The name of a tag, as a string.

    Raises:
      KeyError: If the tag is not found.

    Returns:
      A `SummaryMetadata` protobuf.
    """
    return self.summary_metadata[tag]

  def _ProcessEvent(self, event):
    """Called whenever an event is loaded."""
    if self._first_event_timestamp is None:
      self._first_event_timestamp = event.wall_time

    if event.HasField('file_version'):
      new_file_version = _ParseFileVersion(event.file_version)
      if self.file_version and self.file_version != new_file_version:
        ## This should not happen.
        tf.logging.warn(('Found new file_version for event.proto. This will '
                         'affect purging logic for TensorFlow restarts. '
                         'Old: {0} New: {1}').format(self.file_version,
                                                     new_file_version))
      self.file_version = new_file_version

    self._MaybePurgeOrphanedData(event)

    ## Process the event.
    # GraphDef and MetaGraphDef are handled in a special way:
    # If no graph_def Event is available, but a meta_graph_def is, and it
    # contains a graph_def, then use the meta_graph_def.graph_def as our graph.
    # If a graph_def Event is available, always prefer it to the graph_def
    # inside the meta_graph_def.
    if event.HasField('graph_def'):
      # print('graph_def')
      if self._graph is not None:
        tf.logging.warn(
            ('Found more than one graph event per run, or there was '
             'a metagraph containing a graph_def, as well as one or '
             'more graph events.  Overwriting the graph with the '
             'newest event.'))
      self._graph = event.graph_def
      self._graph_from_metagraph = False
    elif event.HasField('meta_graph_def'):
      print('meta_graph_def')
      if self._meta_graph is not None:
        tf.logging.warn(('Found more than one metagraph event per run. '
                         'Overwriting the metagraph with the newest event.'))
      self._meta_graph = event.meta_graph_def
      if self._graph is None or self._graph_from_metagraph:
        # We may have a graph_def in the metagraph.  If so, and no
        # graph_def is directly available, use this one instead.
        meta_graph = tf.MetaGraphDef()
        meta_graph.ParseFromString(self._meta_graph)
        if meta_graph.graph_def:
          if self._graph is not None:
            tf.logging.warn(
                ('Found multiple metagraphs containing graph_defs,'
                 'but did not find any graph events.  Overwriting the '
                 'graph with the newest metagraph version.'))
          self._graph_from_metagraph = True
          self._graph = meta_graph.graph_def.SerializeToString()
    elif event.HasField('tagged_run_metadata'):
      print('tagged_run_metadata')
      tag = event.tagged_run_metadata.tag
      if tag in self._tagged_metadata:
        tf.logging.warn('Found more than one "run metadata" event with tag ' +
                        tag + '. Overwriting it with the newest event.')
      self._tagged_metadata[tag] = event.tagged_run_metadata.run_metadata

  def Tags(self):
    """Return all tags found in the value stream.

    Returns:
      A `{tagType: ['list', 'of', 'tags']}` dictionary.
    """
    return {
        TENSORS: list(self.tensors_by_tag.keys()),
        # Use a heuristic: if the metagraph is available, but
        # graph is not, then we assume the metagraph contains the graph.
        GRAPH: self._graph is not None,
        META_GRAPH: self._meta_graph is not None,
        RUN_METADATA: list(self._tagged_metadata.keys())
    }

  def Graph(self):
    """Return the graph definition, if there is one.

    If the graph is stored directly, return that.  If no graph is stored
    directly but a metagraph is stored containing a graph, return that.

    Raises:
      ValueError: If there is no graph for this run.

    Returns:
      The `graph_def` proto.
    """
    graph = tf.GraphDef()
    if self._graph is not None:
      graph.ParseFromString(self._graph)
      return graph
    raise ValueError('There is no graph in this EventAccumulator')

  def MetaGraph(self):
    """Return the metagraph definition, if there is one.

    Raises:
      ValueError: If there is no metagraph for this run.

    Returns:
      The `meta_graph_def` proto.
    """
    if self._meta_graph is None:
      raise ValueError('There is no metagraph in this EventAccumulator')
    meta_graph = tf.MetaGraphDef()
    meta_graph.ParseFromString(self._meta_graph)
    return meta_graph

  def RunMetadata(self, tag):
    """Given a tag, return the associated session.run() metadata.

    Args:
      tag: A string tag associated with the event.

    Raises:
      ValueError: If the tag is not found.

    Returns:
      The metadata in form of `RunMetadata` proto.
    """
    if tag not in self._tagged_metadata:
      raise ValueError('There is no run metadata with this tag name')

    run_metadata = tf.RunMetadata()
    run_metadata.ParseFromString(self._tagged_metadata[tag])
    return run_metadata

  def Tensors(self, tag):
    """Given a summary tag, return all associated tensors.

    Args:
      tag: A string tag associated with the events.

    Raises:
      KeyError: If the tag is not found.

    Returns:
      An array of `TensorEvent`s.
    """
    return self.tensors_by_tag[tag].Items(_TENSOR_RESERVOIR_KEY)

  def _MaybePurgeOrphanedData(self, event):
    """Maybe purge orphaned backenddata due to a TensorFlow crash.

    When TensorFlow crashes at step T+O and restarts at step T, any events
    written after step T are now "orphaned" and will be at best misleading if
    they are included in TensorBoard.

    This logic attempts to determine if there is orphaned backenddata, and purge it
    if it is found.

    Args:
      event: The event to use as a reference, to determine if a purge is needed.
    """
    if not self.purge_orphaned_data:
      return
    ## Check if the event happened after a crash, and purge expired tags.
    if self.file_version and self.file_version >= 2:
      ## If the file_version is recent enough, use the SessionLog enum
      ## to check for restarts.
      self._CheckForRestartAndMaybePurge(event)
    else:
      ## If there is no file version, default to old logic of checking for
      ## out of order steps.
      self._CheckForOutOfOrderStepAndMaybePurge(event)
    # After checking, update the most recent summary step and wall time.
    if event.HasField('summary'):
      self.most_recent_step = event.step
      self.most_recent_wall_time = event.wall_time

  def _CheckForRestartAndMaybePurge(self, event):
    """Check and discard expired events using SessionLog.START.

    Check for a SessionLog.START event and purge all previously seen events
    with larger steps, because they are out of date. Because of supervisor
    threading, it is possible that this logic will cause the first few event
    messages to be discarded since supervisor threading does not guarantee
    that the START message is deterministically written first.

    This method is preferred over _CheckForOutOfOrderStepAndMaybePurge which
    can inadvertently discard events due to supervisor threading.

    Args:
      event: The event to use as reference. If the event is a START event, all
        previously seen events with a greater event.step will be purged.
    """
    if event.HasField(
        'session_log') and event.session_log.status == tf.SessionLog.START:
      self._Purge(event, by_tags=False)

  def _CheckForOutOfOrderStepAndMaybePurge(self, event):
    """Check for out-of-order event.step and discard expired events for tags.

    Check if the event is out of order relative to the global most recent step.
    If it is, purge outdated summaries for tags that the event contains.

    Args:
      event: The event to use as reference. If the event is out-of-order, all
        events with the same tags, but with a greater event.step will be purged.
    """
    if event.step < self.most_recent_step and event.HasField('summary'):
      self._Purge(event, by_tags=True)

  def _ProcessTensor(self, tag, wall_time, step, tensor):
    tv = TensorEvent(wall_time=wall_time, step=step, tensor_proto=tensor)
    with self._tensors_by_tag_lock:
      if tag not in self.tensors_by_tag:
        reservoir_size = self._GetTensorReservoirSize(tag)
        self.tensors_by_tag[tag] = Reservoir(reservoir_size)
    self.tensors_by_tag[tag].AddItem(_TENSOR_RESERVOIR_KEY, tv)

  def _GetTensorReservoirSize(self, tag):
    default = self._size_guidance[TENSORS]
    summary_metadata = self.summary_metadata.get(tag)
    if summary_metadata is None:
      return default
    return self._tensor_size_guidance.get(
        summary_metadata.plugin_data.plugin_name, default)

  def _Purge(self, event, by_tags):
    """Purge all events that have occurred after the given event.step.

    If by_tags is True, purge all events that occurred after the given
    event.step, but only for the tags that the event has. Non-sequential
    event.steps suggest that a TensorFlow restart occurred, and we discard
    the out-of-order events to display a consistent view in TensorBoard.

    Discarding by tags is the safer method, when we are unsure whether a restart
    has occurred, given that threading in supervisor can cause events of
    different tags to arrive with unsynchronized step values.

    If by_tags is False, then purge all events with event.step greater than the
    given event.step. This can be used when we are certain that a TensorFlow
    restart has occurred and these events can be discarded.

    Args:
      event: The event to use as reference for the purge. All events with
        the same tags, but with a greater event.step will be purged.
      by_tags: Bool to dictate whether to discard all out-of-order events or
        only those that are associated with the given reference event.
    """
    ## Keep backenddata in reservoirs that has a step less than event.step
    _NotExpired = lambda x: x.step < event.step

    num_expired = 0
    if by_tags:
      for value in event.summary.value:
        if value.tag in self.tensors_by_tag:
          tag_reservoir = self.tensors_by_tag[value.tag]
          num_expired += tag_reservoir.FilterItems(
              _NotExpired, _TENSOR_RESERVOIR_KEY)
    else:
      for tag_reservoir in six.itervalues(self.tensors_by_tag):
        num_expired += tag_reservoir.FilterItems(
            _NotExpired, _TENSOR_RESERVOIR_KEY)
    if num_expired > 0:
      purge_msg = _GetPurgeMessage(self.most_recent_step,
                                   self.most_recent_wall_time, event.step,
                                   event.wall_time, num_expired)
      tf.logging.warn(purge_msg)


def _GetPurgeMessage(most_recent_step, most_recent_wall_time, event_step,
                     event_wall_time, num_expired):
  """Return the string message associated with TensorBoard purges."""
  return ('Detected out of order event.step likely caused by a TensorFlow '
          'restart. Purging {} expired tensor events from Tensorboard display '
          'between the previous step: {} (timestamp: {}) and current step: {} '
          '(timestamp: {}).'
         ).format(num_expired, most_recent_step, most_recent_wall_time,
                  event_step, event_wall_time)


def _GeneratorFromPath(path):
  """Create an event generator for file or directory at given path string."""
  if not path:
    raise ValueError('path must be a valid string')
  if IsTensorFlowEventsFile(path):
    return EventFileLoader(path)
  else:
    return DirectoryWatcher(
        path, EventFileLoader, IsTensorFlowEventsFile)


def _ParseFileVersion(file_version):
  """Convert the string file_version in event.proto into a float.

  Args:
    file_version: String file_version from event.proto

  Returns:
    Version number as a float.
  """
  tokens = file_version.split('brain.Event:')
  try:
    return float(tokens[-1])
  except ValueError:
    ## This should never happen according to the definition of file_version
    ## specified in event.proto.
    tf.logging.warn(
        ('Invalid event.proto file_version. Defaulting to use of '
         'out-of-order event.step logic for purging expired events.'))
    return -1


def main():
    path = "C:\\tensorflow\mnist\logs\mnist_with_summaries\\train"
    acc = EventAccumulator(path)
    acc.Reload()
    graph = acc.Graph()
    print(graph)
    return 0


if __name__ == '__main__':
    main()
