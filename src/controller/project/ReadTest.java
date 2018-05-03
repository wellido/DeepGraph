package controller.project;
import com.intellij.ide.plugins.PluginManager;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.extensions.PluginId;
import com.intellij.openapi.fileEditor.FileDocumentManager;
import com.intellij.openapi.vfs.LocalFileSystem;
import com.intellij.openapi.vfs.VirtualFile;

import java.io.*;
import java.nio.file.Paths;

public class ReadTest {
    public static void main(String[] args) {
        new ReadTest().execute();
    }

    private void execute() {
        String s = "# Copyright 2015 The TensorFlow Authors. All Rights Reserved.\n" +
                "#\n" +
                "# Licensed under the Apache License, Version 2.0 (the \"License\");\n" +
                "# you may not use this file except in compliance with the License.\n" +
                "# You may obtain a copy of the License at\n" +
                "#\n" +
                "#     http://www.apache.org/licenses/LICENSE-2.0\n" +
                "#\n" +
                "# Unless required by applicable law or agreed to in writing, software\n" +
                "# distributed under the License is distributed on an \"AS IS\" BASIS,\n" +
                "# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" +
                "# See the License for the specific language governing permissions and\n" +
                "# limitations under the License.\n" +
                "# ==============================================================================\n" +
                "\"\"\"Takes a generator of values, and accumulates them for a frontend.\"\"\"\n" +
                "from __future__ import absolute_import\n" +
                "from __future__ import division\n" +
                "from __future__ import print_function\n" +
                "import bisect\n" +
                "import collections\n" +
                "import os\n" +
                "import threading\n" +
                "\n" +
                "import six\n" +
                "import tensorflow as tf\n" +
                "\n" +
                "def IsGCSPath(path):\n" +
                "  return path.startswith(\"gs://\")\n" +
                "\n" +
                "\n" +
                "def ListDirectoryAbsolute(directory):\n" +
                "  \"\"\"Yields all files in the given directory. The paths are absolute.\"\"\"\n" +
                "  return (os.path.join(directory, path)\n" +
                "          for path in tf.gfile.ListDirectory(directory))\n" +
                "\n" +
                "\n" +
                "def ListRecursively(top):\n" +
                "  \"\"\"Walks a directory tree, yielding (dir_path, file_paths) tuples.\n" +
                "\n" +
                "  For each of `top` and its subdirectories, yields a tuple containing the path\n" +
                "  to the directory and the path to each of the contained files.  Note that\n" +
                "  unlike os.Walk()/tf.gfile.Walk(), this does not list subdirectories and the\n" +
                "  file paths are all absolute.\n" +
                "\n" +
                "  If the directory does not exist, this yields nothing.\n" +
                "\n" +
                "  Args:\n" +
                "    top: A path to a directory..\n" +
                "  Yields:\n" +
                "    A list of (dir_path, file_paths) tuples.\n" +
                "  \"\"\"\n" +
                "  for dir_path, _, filenames in tf.gfile.Walk(top):\n" +
                "    yield (dir_path, (os.path.join(dir_path, filename)\n" +
                "                      for filename in filenames))\n" +
                "\n" +
                "class DirectoryWatcher(object):\n" +
                "  \"\"\"A DirectoryWatcher wraps a loader to load from a sequence of paths.\n" +
                "\n" +
                "  A loader reads a path and produces some kind of values as an iterator. A\n" +
                "  DirectoryWatcher takes a directory, a factory for loaders, and optionally a\n" +
                "  path filter and watches all the paths inside that directory.\n" +
                "\n" +
                "  This class is only valid under the assumption that only one path will be\n" +
                "  written to by the backenddata source at a time and that once the source stops writing\n" +
                "  to a path, it will start writing to a new path that's lexicographically\n" +
                "  greater and never come back. It uses some heuristics to check whether this is\n" +
                "  true based on tracking changes to the files' sizes, but the check can have\n" +
                "  false negatives. However, it should have no false positives.\n" +
                "  \"\"\"\n" +
                "\n" +
                "  def __init__(self, directory, loader_factory, path_filter=lambda x: True):\n" +
                "    \"\"\"Constructs a new DirectoryWatcher.\n" +
                "\n" +
                "    Args:\n" +
                "      directory: The directory to load files from.\n" +
                "      loader_factory: A factory for creating loaders. The factory should take a\n" +
                "        path and return an object that has a Load method returning an\n" +
                "        iterator that will yield all events that have not been yielded yet.\n" +
                "      path_filter: If specified, only paths matching this filter are loaded.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If path_provider or loader_factory are None.\n" +
                "    \"\"\"\n" +
                "    if directory is None:\n" +
                "      raise ValueError('A directory is required')\n" +
                "    if loader_factory is None:\n" +
                "      raise ValueError('A loader factory is required')\n" +
                "    self._directory = directory\n" +
                "    self._path = None\n" +
                "    self._loader_factory = loader_factory\n" +
                "    self._loader = None\n" +
                "    self._path_filter = path_filter\n" +
                "    self._ooo_writes_detected = False\n" +
                "    # The file size for each file at the time it was finalized.\n" +
                "    self._finalized_sizes = {}\n" +
                "\n" +
                "  def Load(self):\n" +
                "    \"\"\"Loads new values.\n" +
                "\n" +
                "    The watcher will load from one path at a time; as soon as that path stops\n" +
                "    yielding events, it will move on to the next path. We assume that old paths\n" +
                "    are never modified after a newer path has been written. As a result, Load()\n" +
                "    can be called multiple times in a row without losing events that have not\n" +
                "    been yielded yet. In other words, we guarantee that every event will be\n" +
                "    yielded exactly once.\n" +
                "\n" +
                "    Yields:\n" +
                "      All values that have not been yielded yet.\n" +
                "\n" +
                "    Raises:\n" +
                "      DirectoryDeletedError: If the directory has been permanently deleted\n" +
                "        (as opposed to being temporarily unavailable).\n" +
                "    \"\"\"\n" +
                "    try:\n" +
                "      for event in self._LoadInternal():\n" +
                "        yield event\n" +
                "    except tf.errors.OpError:\n" +
                "      if not tf.gfile.Exists(self._directory):\n" +
                "        raise DirectoryDeletedError(\n" +
                "          'Directory %s has been permanently deleted' % self._directory)\n" +
                "\n" +
                "  def _LoadInternal(self):\n" +
                "    \"\"\"Internal implementation of Load().\n" +
                "\n" +
                "    The only difference between this and Load() is that the latter will throw\n" +
                "    DirectoryDeletedError on I/O errors if it thinks that the directory has been\n" +
                "    permanently deleted.\n" +
                "\n" +
                "    Yields:\n" +
                "      All values that have not been yielded yet.\n" +
                "    \"\"\"\n" +
                "\n" +
                "    # If the loader exists, check it for a value.\n" +
                "    if not self._loader:\n" +
                "      self._InitializeLoader()\n" +
                "\n" +
                "    while True:\n" +
                "      # Yield all the new events in the path we're currently loading from.\n" +
                "      for event in self._loader.Load():\n" +
                "        yield event\n" +
                "\n" +
                "      next_path = self._GetNextPath()\n" +
                "      if not next_path:\n" +
                "        tf.logging.info('No path found after %s', self._path)\n" +
                "        # Current path is empty and there are no new paths, so we're done.\n" +
                "        return\n" +
                "\n" +
                "      # There's a new path, so check to make sure there weren't any events\n" +
                "      # written between when we finished reading the current path and when we\n" +
                "      # checked for the new one. The sequence of events might look something\n" +
                "      # like this:\n" +
                "      #\n" +
                "      # 1. Event #1 written to path #1.\n" +
                "      # 2. We check for events and yield event #1 from path #1\n" +
                "      # 3. We check for events and see that there are no more events in path #1.\n" +
                "      # 4. Event #2 is written to path #1.\n" +
                "      # 5. Event #3 is written to path #2.\n" +
                "      # 6. We check for a new path and see that path #2 exists.\n" +
                "      #\n" +
                "      # Without this loop, we would miss event #2. We're also guaranteed by the\n" +
                "      # loader contract that no more events will be written to path #1 after\n" +
                "      # events start being written to path #2, so we don't have to worry about\n" +
                "      # that.\n" +
                "      for event in self._loader.Load():\n" +
                "        yield event\n" +
                "\n" +
                "      tf.logging.info('Directory watcher advancing from %s to %s', self._path,\n" +
                "                      next_path)\n" +
                "\n" +
                "      # Advance to the next path and start over.\n" +
                "      self._SetPath(next_path)\n" +
                "\n" +
                "  # The number of paths before the current one to check for out of order writes.\n" +
                "  _OOO_WRITE_CHECK_COUNT = 20\n" +
                "\n" +
                "  def OutOfOrderWritesDetected(self):\n" +
                "    \"\"\"Returns whether any out-of-order writes have been detected.\n" +
                "\n" +
                "    Out-of-order writes are only checked as part of the Load() iterator. Once an\n" +
                "    out-of-order write is detected, this function will always return true.\n" +
                "\n" +
                "    Note that out-of-order write detection is not performed on GCS paths, so\n" +
                "    this function will always return false.\n" +
                "\n" +
                "    Returns:\n" +
                "      Whether any out-of-order write has ever been detected by this watcher.\n" +
                "\n" +
                "    \"\"\"\n" +
                "    return self._ooo_writes_detected\n" +
                "\n" +
                "  def _InitializeLoader(self):\n" +
                "    path = self._GetNextPath()\n" +
                "    if path:\n" +
                "      self._SetPath(path)\n" +
                "    else:\n" +
                "      raise StopIteration\n" +
                "\n" +
                "  def _SetPath(self, path):\n" +
                "    \"\"\"Sets the current path to watch for new events.\n" +
                "\n" +
                "    This also records the size of the old path, if any. If the size can't be\n" +
                "    found, an error is logged.\n" +
                "\n" +
                "    Args:\n" +
                "      path: The full path of the file to watch.\n" +
                "    \"\"\"\n" +
                "    old_path = self._path\n" +
                "    if old_path and not IsGCSPath(old_path):\n" +
                "      try:\n" +
                "        # We're done with the path, so store its size.\n" +
                "        size = tf.gfile.Stat(old_path).length\n" +
                "        tf.logging.debug('Setting latest size of %s to %d', old_path, size)\n" +
                "        self._finalized_sizes[old_path] = size\n" +
                "      except tf.errors.OpError as e:\n" +
                "        tf.logging.error('Unable to get size of %s: %s', old_path, e)\n" +
                "\n" +
                "    self._path = path\n" +
                "    self._loader = self._loader_factory(path)\n" +
                "\n" +
                "  def _GetNextPath(self):\n" +
                "    \"\"\"Gets the next path to load from.\n" +
                "\n" +
                "    This function also does the checking for out-of-order writes as it iterates\n" +
                "    through the paths.\n" +
                "\n" +
                "    Returns:\n" +
                "      The next path to load events from, or None if there are no more paths.\n" +
                "    \"\"\"\n" +
                "    paths = sorted(path\n" +
                "                   for path in ListDirectoryAbsolute(self._directory)\n" +
                "                   if self._path_filter(path))\n" +
                "    if not paths:\n" +
                "      return None\n" +
                "\n" +
                "    if self._path is None:\n" +
                "      return paths[0]\n" +
                "\n" +
                "    # Don't bother checking if the paths are GCS (which we can't check) or if\n" +
                "    # we've already detected an OOO write.\n" +
                "    if not IsGCSPath(paths[0]) and not self._ooo_writes_detected:\n" +
                "      # Check the previous _OOO_WRITE_CHECK_COUNT paths for out of order writes.\n" +
                "      current_path_index = bisect.bisect_left(paths, self._path)\n" +
                "      ooo_check_start = max(0, current_path_index - self._OOO_WRITE_CHECK_COUNT)\n" +
                "      for path in paths[ooo_check_start:current_path_index]:\n" +
                "        if self._HasOOOWrite(path):\n" +
                "          self._ooo_writes_detected = True\n" +
                "          break\n" +
                "\n" +
                "    next_paths = list(path\n" +
                "                      for path in paths\n" +
                "                      if self._path is None or path > self._path)\n" +
                "    if next_paths:\n" +
                "      return min(next_paths)\n" +
                "    else:\n" +
                "      return None\n" +
                "\n" +
                "  def _HasOOOWrite(self, path):\n" +
                "    \"\"\"Returns whether the path has had an out-of-order write.\"\"\"\n" +
                "    # Check the sizes of each path before the current one.\n" +
                "    size = tf.gfile.Stat(path).length\n" +
                "    old_size = self._finalized_sizes.get(path, None)\n" +
                "    if size != old_size:\n" +
                "      if old_size is None:\n" +
                "        tf.logging.error('File %s created after file %s even though it\\'s '\n" +
                "                         'lexicographically earlier', path, self._path)\n" +
                "      else:\n" +
                "        tf.logging.error('File %s updated even though the current file is %s',\n" +
                "                         path, self._path)\n" +
                "      return True\n" +
                "    else:\n" +
                "      return False\n" +
                "\n" +
                "\n" +
                "class DirectoryDeletedError(Exception):\n" +
                "  \"\"\"Thrown by Load() when the directory is *permanently* gone.\n" +
                "\n" +
                "  We distinguish this from temporary errors so that other code can decide to\n" +
                "  drop all of our backenddata only when a directory has been intentionally deleted,\n" +
                "  as opposed to due to transient filesystem errors.\n" +
                "  \"\"\"\n" +
                "  pass\n" +
                "\n" +
                "class EventFileLoader(object):\n" +
                "  \"\"\"An EventLoader is an iterator that yields Event protos.\"\"\"\n" +
                "\n" +
                "  def __init__(self, file_path):\n" +
                "    if file_path is None:\n" +
                "      raise ValueError('A file path is required')\n" +
                "    file_path = tf.resource_loader.readahead_file_path(file_path)\n" +
                "    tf.logging.debug('Opening a record reader pointing at %s', file_path)\n" +
                "    with tf.errors.raise_exception_on_not_ok_status() as status:\n" +
                "      self._reader = tf.pywrap_tensorflow.PyRecordReader_New(\n" +
                "        tf.compat.as_bytes(file_path), 0, tf.compat.as_bytes(''), status)\n" +
                "    # Store it for logging purposes.\n" +
                "    self._file_path = file_path\n" +
                "    if not self._reader:\n" +
                "      raise IOError('Failed to open a record reader pointing to %s' % file_path)\n" +
                "\n" +
                "  def Load(self):\n" +
                "    \"\"\"Loads all new values from disk.\n" +
                "\n" +
                "    Calling Load multiple times in a row will not 'drop' events as long as the\n" +
                "    return value is not iterated over.\n" +
                "\n" +
                "    Yields:\n" +
                "      All values that were written to disk that have not been yielded yet.\n" +
                "    \"\"\"\n" +
                "    tf.logging.debug('Loading events from %s', self._file_path)\n" +
                "    while True:\n" +
                "      try:\n" +
                "        with tf.errors.raise_exception_on_not_ok_status() as status:\n" +
                "          self._reader.GetNext(status)\n" +
                "      except (tf.errors.DataLossError, tf.errors.OutOfRangeError):\n" +
                "        # We ignore partial read exceptions, because a record may be truncated.\n" +
                "        # PyRecordReader holds the offset prior to the failed read, so retrying\n" +
                "        # will succeed.\n" +
                "        break\n" +
                "      event = tf.Event()\n" +
                "      event.ParseFromString(self._reader.record())\n" +
                "      yield event\n" +
                "    tf.logging.debug('No more events in %s', self._file_path)\n" +
                "\n" +
                "\n" +
                "_PLUGINS_DIR = \"plugins\"\n" +
                "\n" +
                "\n" +
                "def _IsDirectory(parent, item):\n" +
                "  \"\"\"Helper that returns if parent/item is a directory.\"\"\"\n" +
                "  return tf.gfile.IsDirectory(os.path.join(parent, item))\n" +
                "\n" +
                "\n" +
                "def PluginDirectory(logdir, plugin_name):\n" +
                "  \"\"\"Returns the plugin directory for plugin_name.\"\"\"\n" +
                "  return os.path.join(logdir, _PLUGINS_DIR, plugin_name)\n" +
                "\n" +
                "\n" +
                "def ListPlugins(logdir):\n" +
                "  \"\"\"List all the plugins that have registered assets in logdir.\n" +
                "\n" +
                "  If the plugins_dir does not exist, it returns an empty list. This maintains\n" +
                "  compatibility with old directories that have no plugins written.\n" +
                "\n" +
                "  Args:\n" +
                "    logdir: A directory that was created by a TensorFlow events writer.\n" +
                "\n" +
                "  Returns:\n" +
                "    a list of plugin names, as strings\n" +
                "  \"\"\"\n" +
                "  plugins_dir = os.path.join(logdir, _PLUGINS_DIR)\n" +
                "  if not tf.gfile.IsDirectory(plugins_dir):\n" +
                "    return []\n" +
                "  entries = tf.gfile.ListDirectory(plugins_dir)\n" +
                "  return [x for x in entries if _IsDirectory(plugins_dir, x)]\n" +
                "\n" +
                "\n" +
                "def ListAssets(logdir, plugin_name):\n" +
                "  \"\"\"List all the assets that are available for given plugin in a logdir.\n" +
                "\n" +
                "  Args:\n" +
                "    logdir: A directory that was created by a TensorFlow summary.FileWriter.\n" +
                "    plugin_name: A string name of a plugin to list assets for.\n" +
                "\n" +
                "  Returns:\n" +
                "    A string list of available plugin assets. If the plugin subdirectory does\n" +
                "    not exist (either because the logdir doesn't exist, or because the plugin\n" +
                "    didn't register) an empty list is returned.\n" +
                "  \"\"\"\n" +
                "  plugin_dir = PluginDirectory(logdir, plugin_name)\n" +
                "  if not tf.gfile.IsDirectory(plugin_dir):\n" +
                "    return []\n" +
                "  entries = tf.gfile.ListDirectory(plugin_dir)\n" +
                "  return [x for x in entries if not _IsDirectory(plugin_dir, x)]\n" +
                "\n" +
                "\n" +
                "def RetrieveAsset(logdir, plugin_name, asset_name):\n" +
                "  \"\"\"Retrieve a particular plugin asset from a logdir.\n" +
                "\n" +
                "  Args:\n" +
                "    logdir: A directory that was created by a TensorFlow summary.FileWriter.\n" +
                "    plugin_name: The plugin we want an asset from.\n" +
                "    asset_name: The name of the requested asset.\n" +
                "\n" +
                "  Returns:\n" +
                "    string contents of the plugin asset.\n" +
                "\n" +
                "  Raises:\n" +
                "    KeyError: if the asset does not exist.\n" +
                "  \"\"\"\n" +
                "\n" +
                "  asset_path = os.path.join(PluginDirectory(logdir, plugin_name), asset_name)\n" +
                "  try:\n" +
                "    with tf.gfile.Open(asset_path, \"r\") as f:\n" +
                "      return f.read()\n" +
                "  except tf.errors.NotFoundError:\n" +
                "    raise KeyError(\"Asset path %s not found\" % asset_path)\n" +
                "  except tf.errors.OpError as e:\n" +
                "    raise KeyError(\"Couldn't read asset path: %s, OpError %s\" % (asset_path, e))\n" +
                "\n" +
                "import collections\n" +
                "import random\n" +
                "import threading\n" +
                "\n" +
                "\n" +
                "class Reservoir(object):\n" +
                "  \"\"\"A map-to-arrays container, with deterministic Reservoir Sampling.\n" +
                "\n" +
                "  Items are added with an associated key. Items may be retrieved by key, and\n" +
                "  a list of keys can also be retrieved. If size is not zero, then it dictates\n" +
                "  the maximum number of items that will be stored with each key. Once there are\n" +
                "  more items for a given key, they are replaced via reservoir sampling, such\n" +
                "  that each item has an equal probability of being included in the sample.\n" +
                "\n" +
                "  Deterministic means that for any given seed and bucket size, the sequence of\n" +
                "  values that are kept for any given tag will always be the same, and that this\n" +
                "  is independent of any insertions on other tags. That is:\n" +
                "\n" +
                "  >>> separate_reservoir = reservoir.Reservoir(10)\n" +
                "  >>> interleaved_reservoir = reservoir.Reservoir(10)\n" +
                "  >>> for i in xrange(100):\n" +
                "  >>>   separate_reservoir.AddItem('key1', i)\n" +
                "  >>> for i in xrange(100):\n" +
                "  >>>   separate_reservoir.AddItem('key2', i)\n" +
                "  >>> for i in xrange(100):\n" +
                "  >>>   interleaved_reservoir.AddItem('key1', i)\n" +
                "  >>>   interleaved_reservoir.AddItem('key2', i)\n" +
                "\n" +
                "  separate_reservoir and interleaved_reservoir will be in identical states.\n" +
                "\n" +
                "  See: https://en.wikipedia.org/wiki/Reservoir_sampling\n" +
                "\n" +
                "  Adding items has amortized O(1) runtime.\n" +
                "\n" +
                "  Fields:\n" +
                "    always_keep_last: Whether the latest seen sample is always at the\n" +
                "      end of the reservoir. Defaults to True.\n" +
                "    size: An integer of the maximum number of samples.\n" +
                "  \"\"\"\n" +
                "\n" +
                "  def __init__(self, size, seed=0, always_keep_last=True):\n" +
                "    \"\"\"Creates a new reservoir.\n" +
                "\n" +
                "    Args:\n" +
                "      size: The number of values to keep in the reservoir for each tag. If 0,\n" +
                "        all values will be kept.\n" +
                "      seed: The seed of the random number generator to use when sampling.\n" +
                "        Different values for |seed| will produce different samples from the same\n" +
                "        input items.\n" +
                "      always_keep_last: Whether to always keep the latest seen item in the\n" +
                "        end of the reservoir. Defaults to True.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If size is negative or not an integer.\n" +
                "    \"\"\"\n" +
                "    if size < 0 or size != round(size):\n" +
                "      raise ValueError('size must be nonegative integer, was %s' % size)\n" +
                "    self._buckets = collections.defaultdict(\n" +
                "      lambda: _ReservoirBucket(size, random.Random(seed), always_keep_last))\n" +
                "    # _mutex guards the keys - creating new keys, retrieving by key, etc\n" +
                "    # the internal items are guarded by the ReservoirBuckets' internal mutexes\n" +
                "    self._mutex = threading.Lock()\n" +
                "    self.size = size\n" +
                "    self.always_keep_last = always_keep_last\n" +
                "\n" +
                "  def Keys(self):\n" +
                "    \"\"\"Return all the keys in the reservoir.\n" +
                "\n" +
                "    Returns:\n" +
                "      ['list', 'of', 'keys'] in the Reservoir.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      return list(self._buckets.keys())\n" +
                "\n" +
                "  def Items(self, key):\n" +
                "    \"\"\"Return items associated with given key.\n" +
                "\n" +
                "    Args:\n" +
                "      key: The key for which we are finding associated items.\n" +
                "\n" +
                "    Raises:\n" +
                "      KeyError: If the key is not found in the reservoir.\n" +
                "\n" +
                "    Returns:\n" +
                "      [list, of, items] associated with that key.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      if key not in self._buckets:\n" +
                "        raise KeyError('Key %s was not found in Reservoir' % key)\n" +
                "      bucket = self._buckets[key]\n" +
                "    return bucket.Items()\n" +
                "\n" +
                "  def AddItem(self, key, item, f=lambda x: x):\n" +
                "    \"\"\"Add a new item to the Reservoir with the given tag.\n" +
                "\n" +
                "    If the reservoir has not yet reached full size, the new item is guaranteed\n" +
                "    to be added. If the reservoir is full, then behavior depends on the\n" +
                "    always_keep_last boolean.\n" +
                "\n" +
                "    If always_keep_last was set to true, the new item is guaranteed to be added\n" +
                "    to the reservoir, and either the previous last item will be replaced, or\n" +
                "    (with low probability) an older item will be replaced.\n" +
                "\n" +
                "    If always_keep_last was set to false, then the new item will replace an\n" +
                "    old item with low probability.\n" +
                "\n" +
                "    If f is provided, it will be applied to transform item (lazily, iff item is\n" +
                "      going to be included in the reservoir).\n" +
                "\n" +
                "    Args:\n" +
                "      key: The key to store the item under.\n" +
                "      item: The item to add to the reservoir.\n" +
                "      f: An optional function to transform the item prior to addition.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      bucket = self._buckets[key]\n" +
                "    bucket.AddItem(item, f)\n" +
                "\n" +
                "  def FilterItems(self, filterFn, key=None):\n" +
                "    \"\"\"Filter items within a Reservoir, using a filtering function.\n" +
                "\n" +
                "    Args:\n" +
                "      filterFn: A function that returns True for the items to be kept.\n" +
                "      key: An optional bucket key to filter. If not specified, will filter all\n" +
                "        all buckets.\n" +
                "\n" +
                "    Returns:\n" +
                "      The number of items removed.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      if key:\n" +
                "        if key in self._buckets:\n" +
                "          return self._buckets[key].FilterItems(filterFn)\n" +
                "        else:\n" +
                "          return 0\n" +
                "      else:\n" +
                "        return sum(bucket.FilterItems(filterFn)\n" +
                "                   for bucket in self._buckets.values())\n" +
                "\n" +
                "\n" +
                "class _ReservoirBucket(object):\n" +
                "  \"\"\"A container for items from a stream, that implements reservoir sampling.\n" +
                "\n" +
                "  It always stores the most recent item as its final item.\n" +
                "  \"\"\"\n" +
                "\n" +
                "  def __init__(self, _max_size, _random=None, always_keep_last=True):\n" +
                "    \"\"\"Create the _ReservoirBucket.\n" +
                "\n" +
                "    Args:\n" +
                "      _max_size: The maximum size the reservoir bucket may grow to. If size is\n" +
                "        zero, the bucket has unbounded size.\n" +
                "      _random: The random number generator to use. If not specified, defaults to\n" +
                "        random.Random(0).\n" +
                "      always_keep_last: Whether the latest seen item should always be included\n" +
                "        in the end of the bucket.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: if the size is not a nonnegative integer.\n" +
                "    \"\"\"\n" +
                "    if _max_size < 0 or _max_size != round(_max_size):\n" +
                "      raise ValueError('_max_size must be nonegative int, was %s' % _max_size)\n" +
                "    self.items = []\n" +
                "    # This mutex protects the internal items, ensuring that calls to Items and\n" +
                "    # AddItem are thread-safe\n" +
                "    self._mutex = threading.Lock()\n" +
                "    self._max_size = _max_size\n" +
                "    self._num_items_seen = 0\n" +
                "    if _random is not None:\n" +
                "      self._random = _random\n" +
                "    else:\n" +
                "      self._random = random.Random(0)\n" +
                "    self.always_keep_last = always_keep_last\n" +
                "\n" +
                "  def AddItem(self, item, f=lambda x: x):\n" +
                "    \"\"\"Add an item to the ReservoirBucket, replacing an old item if necessary.\n" +
                "\n" +
                "    The new item is guaranteed to be added to the bucket, and to be the last\n" +
                "    element in the bucket. If the bucket has reached capacity, then an old item\n" +
                "    will be replaced. With probability (_max_size/_num_items_seen) a random item\n" +
                "    in the bucket will be popped out and the new item will be appended\n" +
                "    to the end. With probability (1 - _max_size/_num_items_seen)\n" +
                "    the last item in the bucket will be replaced.\n" +
                "\n" +
                "    Since the O(n) replacements occur with O(1/_num_items_seen) likelihood,\n" +
                "    the amortized runtime is O(1).\n" +
                "\n" +
                "    Args:\n" +
                "      item: The item to add to the bucket.\n" +
                "      f: A function to transform item before addition, if it will be kept in\n" +
                "        the reservoir.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      if len(self.items) < self._max_size or self._max_size == 0:\n" +
                "        self.items.append(f(item))\n" +
                "      else:\n" +
                "        r = self._random.randint(0, self._num_items_seen)\n" +
                "        if r < self._max_size:\n" +
                "          self.items.pop(r)\n" +
                "          self.items.append(f(item))\n" +
                "        elif self.always_keep_last:\n" +
                "          self.items[-1] = f(item)\n" +
                "      self._num_items_seen += 1\n" +
                "\n" +
                "  def FilterItems(self, filterFn):\n" +
                "    \"\"\"Filter items in a ReservoirBucket, using a filtering function.\n" +
                "\n" +
                "    Filtering items from the reservoir bucket must update the\n" +
                "    internal state variable self._num_items_seen, which is used for determining\n" +
                "    the rate of replacement in reservoir sampling. Ideally, self._num_items_seen\n" +
                "    would contain the exact number of items that have ever seen by the\n" +
                "    ReservoirBucket and satisfy filterFn. However, the ReservoirBucket does not\n" +
                "    have access to all items seen -- it only has access to the subset of items\n" +
                "    that have survived sampling (self.items). Therefore, we estimate\n" +
                "    self._num_items_seen by scaling it by the same ratio as the ratio of items\n" +
                "    not removed from self.items.\n" +
                "\n" +
                "    Args:\n" +
                "      filterFn: A function that returns True for items to be kept.\n" +
                "\n" +
                "    Returns:\n" +
                "      The number of items removed from the bucket.\n" +
                "    \"\"\"\n" +
                "    with self._mutex:\n" +
                "      size_before = len(self.items)\n" +
                "      self.items = list(filter(filterFn, self.items))\n" +
                "      size_diff = size_before - len(self.items)\n" +
                "\n" +
                "      # Estimate a correction the number of items seen\n" +
                "      prop_remaining = len(self.items) / float(\n" +
                "        size_before) if size_before > 0 else 0\n" +
                "      self._num_items_seen = int(round(self._num_items_seen * prop_remaining))\n" +
                "      return size_diff\n" +
                "\n" +
                "  def Items(self):\n" +
                "    \"\"\"Get all the items in the bucket.\"\"\"\n" +
                "    with self._mutex:\n" +
                "      return list(self.items)\n" +
                "\n" +
                "namedtuple = collections.namedtuple\n" +
                "\n" +
                "TensorEvent = namedtuple('TensorEvent', ['wall_time', 'step', 'tensor_proto'])\n" +
                "\n" +
                "## Different types of summary events handled by the event_accumulator\n" +
                "SUMMARY_TYPES = {\n" +
                "    'tensor': '_ProcessTensor',\n" +
                "}\n" +
                "\n" +
                "## The tagTypes below are just arbitrary strings chosen to pass the type\n" +
                "## information of the tag from the backend to the frontend\n" +
                "TENSORS = 'tensors'\n" +
                "GRAPH = 'graph'\n" +
                "META_GRAPH = 'meta_graph'\n" +
                "RUN_METADATA = 'run_metadata'\n" +
                "\n" +
                "DEFAULT_SIZE_GUIDANCE = {\n" +
                "    TENSORS: 500,\n" +
                "}\n" +
                "\n" +
                "STORE_EVERYTHING_SIZE_GUIDANCE = {\n" +
                "    TENSORS: 0,\n" +
                "}\n" +
                "\n" +
                "_TENSOR_RESERVOIR_KEY = \".\"  # arbitrary\n" +
                "\n" +
                "\n" +
                "def IsTensorFlowEventsFile(path):\n" +
                "  \"\"\"Check the path name to see if it is probably a TF Events file.\n" +
                "\n" +
                "  Args:\n" +
                "    path: A file path to check if it is an event file.\n" +
                "\n" +
                "  Raises:\n" +
                "    ValueError: If the path is an empty string.\n" +
                "\n" +
                "  Returns:\n" +
                "    If path is formatted like a TensorFlowEventsFile.\n" +
                "  \"\"\"\n" +
                "  if not path:\n" +
                "    raise ValueError('Path must be a nonempty string')\n" +
                "  return 'tfevents' in tf.compat.as_str_any(os.path.basename(path))\n" +
                "\n" +
                "\n" +
                "class EventAccumulator(object):\n" +
                "  \"\"\"An `EventAccumulator` takes an event generator, and accumulates the values.\n" +
                "\n" +
                "  The `EventAccumulator` is intended to provide a convenient Python\n" +
                "  interface for loading Event backenddata written during a TensorFlow run.\n" +
                "  TensorFlow writes out `Event` protobuf objects, which have a timestamp\n" +
                "  and step number, and often contain a `Summary`. Summaries can have\n" +
                "  different kinds of backenddata stored as arbitrary tensors. The Summaries\n" +
                "  also have a tag, which we use to organize logically related backenddata. The\n" +
                "  `EventAccumulator` supports retrieving the `Event` and `Summary` backenddata\n" +
                "  by its tag.\n" +
                "\n" +
                "  Calling `Tags()` gets a map from `tagType` (i.e., `tensors`) to the\n" +
                "  associated tags for those backenddata types. Then, the functional endpoint\n" +
                "  (i.g., `Accumulator.Tensors(tag)`) allows for the retrieval of all\n" +
                "  backenddata associated with that tag.\n" +
                "\n" +
                "  The `Reload()` method synchronously loads all of the backenddata written so far.\n" +
                "\n" +
                "  Fields:\n" +
                "    most_recent_step: Step of last Event proto added. This should only\n" +
                "        be accessed from the thread that calls Reload. This is -1 if\n" +
                "        nothing has been loaded yet.\n" +
                "    most_recent_wall_time: Timestamp of last Event proto added. This is\n" +
                "        a float containing seconds from the UNIX epoch, or -1 if\n" +
                "        nothing has been loaded yet. This should only be accessed from\n" +
                "        the thread that calls Reload.\n" +
                "    path: A file path to a directory containing tf events files, or a single\n" +
                "        tf events file. The accumulator will load events from this path.\n" +
                "    tensors_by_tag: A dictionary mapping each tag name to a\n" +
                "      reservoir.Reservoir of tensor summaries. Each such reservoir will\n" +
                "      only use a single key, given by `_TENSOR_RESERVOIR_KEY`.\n" +
                "\n" +
                "  @@Tensors\n" +
                "  \"\"\"\n" +
                "\n" +
                "  def __init__(self,\n" +
                "               path,\n" +
                "               size_guidance=None,\n" +
                "               tensor_size_guidance=None,\n" +
                "               purge_orphaned_data=True):\n" +
                "    \"\"\"Construct the `EventAccumulator`.\n" +
                "\n" +
                "    Args:\n" +
                "      path: A file path to a directory containing tf events files, or a single\n" +
                "        tf events file. The accumulator will load events from this path.\n" +
                "      size_guidance: Information on how much backenddata the EventAccumulator should\n" +
                "        store in memory. The DEFAULT_SIZE_GUIDANCE tries not to store too much\n" +
                "        so as to avoid OOMing the client. The size_guidance should be a map\n" +
                "        from a `tagType` string to an integer representing the number of\n" +
                "        items to keep per tag for items of that `tagType`. If the size is 0,\n" +
                "        all events are stored.\n" +
                "      tensor_size_guidance: Like `size_guidance`, but allowing finer\n" +
                "        granularity for tensor summaries. Should be a map from the\n" +
                "        `plugin_name` field on the `PluginData` proto to an integer\n" +
                "        representing the number of items to keep per tag. Plugins for\n" +
                "        which there is no entry in this map will default to the value of\n" +
                "        `size_guidance[event_accumulator.TENSORS]`. Defaults to `{}`.\n" +
                "      purge_orphaned_data: Whether to discard any events that were \"orphaned\" by\n" +
                "        a TensorFlow restart.\n" +
                "    \"\"\"\n" +
                "    size_guidance = dict(size_guidance or DEFAULT_SIZE_GUIDANCE)\n" +
                "    sizes = {}\n" +
                "    for key in DEFAULT_SIZE_GUIDANCE:\n" +
                "      if key in size_guidance:\n" +
                "        sizes[key] = size_guidance[key]\n" +
                "      else:\n" +
                "        sizes[key] = DEFAULT_SIZE_GUIDANCE[key]\n" +
                "    self._size_guidance = size_guidance\n" +
                "    self._tensor_size_guidance = dict(tensor_size_guidance or {})\n" +
                "\n" +
                "    self._first_event_timestamp = None\n" +
                "\n" +
                "    self._graph = None\n" +
                "    self._graph_from_metagraph = False\n" +
                "    self._meta_graph = None\n" +
                "    self._tagged_metadata = {}\n" +
                "    self.summary_metadata = {}\n" +
                "    self.tensors_by_tag = {}\n" +
                "    self._tensors_by_tag_lock = threading.Lock()\n" +
                "\n" +
                "    # Keep a mapping from plugin name to a dict mapping from tag to plugin backenddata\n" +
                "    # content obtained from the SummaryMetadata (metadata field of Value) for\n" +
                "    # that plugin (This is not the entire SummaryMetadata proto - only the\n" +
                "    # content for that plugin). The SummaryWriter only keeps the content on the\n" +
                "    # first event encountered per tag, so we must store that first instance of\n" +
                "    # content for each tag.\n" +
                "    self._plugin_to_tag_to_content = collections.defaultdict(dict)\n" +
                "\n" +
                "    self._generator_mutex = threading.Lock()\n" +
                "    self.path = path\n" +
                "    self._generator = _GeneratorFromPath(path)\n" +
                "\n" +
                "    self.purge_orphaned_data = purge_orphaned_data\n" +
                "\n" +
                "    self.most_recent_step = -1\n" +
                "    self.most_recent_wall_time = -1\n" +
                "    self.file_version = None\n" +
                "\n" +
                "  def Reload(self):\n" +
                "    \"\"\"Loads all events added since the last call to `Reload`.\n" +
                "\n" +
                "    If `Reload` was never called, loads all events in the file.\n" +
                "\n" +
                "    Returns:\n" +
                "      The `EventAccumulator`.\n" +
                "    \"\"\"\n" +
                "    with self._generator_mutex:\n" +
                "      for event in self._generator.Load():\n" +
                "        self._ProcessEvent(event)\n" +
                "    return self\n" +
                "\n" +
                "  def PluginAssets(self, plugin_name):\n" +
                "    \"\"\"Return a list of all plugin assets for the given plugin.\n" +
                "\n" +
                "    Args:\n" +
                "      plugin_name: The string name of a plugin to retrieve assets for.\n" +
                "\n" +
                "    Returns:\n" +
                "      A list of string plugin asset names, or empty list if none are available.\n" +
                "      If the plugin was not registered, an empty list is returned.\n" +
                "    \"\"\"\n" +
                "    return ListAssets(self.path, plugin_name)\n" +
                "\n" +
                "  def RetrievePluginAsset(self, plugin_name, asset_name):\n" +
                "    \"\"\"Return the contents of a given plugin asset.\n" +
                "\n" +
                "    Args:\n" +
                "      plugin_name: The string name of a plugin.\n" +
                "      asset_name: The string name of an asset.\n" +
                "\n" +
                "    Returns:\n" +
                "      The string contents of the plugin asset.\n" +
                "\n" +
                "    Raises:\n" +
                "      KeyError: If the asset is not available.\n" +
                "    \"\"\"\n" +
                "    return RetrieveAsset(self.path, plugin_name, asset_name)\n" +
                "\n" +
                "  def FirstEventTimestamp(self):\n" +
                "    \"\"\"Returns the timestamp in seconds of the first event.\n" +
                "\n" +
                "    If the first event has been loaded (either by this method or by `Reload`,\n" +
                "    this returns immediately. Otherwise, it will load in the first event. Note\n" +
                "    that this means that calling `Reload` will cause this to block until\n" +
                "    `Reload` has finished.\n" +
                "\n" +
                "    Returns:\n" +
                "      The timestamp in seconds of the first event that was loaded.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If no events have been loaded and there were no events found\n" +
                "      on disk.\n" +
                "    \"\"\"\n" +
                "    if self._first_event_timestamp is not None:\n" +
                "      return self._first_event_timestamp\n" +
                "    with self._generator_mutex:\n" +
                "      try:\n" +
                "        event = next(self._generator.Load())\n" +
                "        self._ProcessEvent(event)\n" +
                "        return self._first_event_timestamp\n" +
                "\n" +
                "      except StopIteration:\n" +
                "        raise ValueError('No event timestamp could be found')\n" +
                "\n" +
                "  def PluginTagToContent(self, plugin_name):\n" +
                "    \"\"\"Returns a dict mapping tags to content specific to that plugin.\n" +
                "\n" +
                "    Args:\n" +
                "      plugin_name: The name of the plugin for which to fetch plugin-specific\n" +
                "        content.\n" +
                "\n" +
                "    Raises:\n" +
                "      KeyError: if the plugin name is not found.\n" +
                "\n" +
                "    Returns:\n" +
                "      A dict mapping tags to plugin-specific content (which are always strings).\n" +
                "      Those strings are often serialized protos.\n" +
                "    \"\"\"\n" +
                "    if plugin_name not in self._plugin_to_tag_to_content:\n" +
                "      raise KeyError('Plugin %r could not be found.' % plugin_name)\n" +
                "    return self._plugin_to_tag_to_content[plugin_name]\n" +
                "\n" +
                "  def SummaryMetadata(self, tag):\n" +
                "    \"\"\"Given a summary tag name, return the associated metadata object.\n" +
                "\n" +
                "    Args:\n" +
                "      tag: The name of a tag, as a string.\n" +
                "\n" +
                "    Raises:\n" +
                "      KeyError: If the tag is not found.\n" +
                "\n" +
                "    Returns:\n" +
                "      A `SummaryMetadata` protobuf.\n" +
                "    \"\"\"\n" +
                "    return self.summary_metadata[tag]\n" +
                "\n" +
                "  def _ProcessEvent(self, event):\n" +
                "    \"\"\"Called whenever an event is loaded.\"\"\"\n" +
                "    if self._first_event_timestamp is None:\n" +
                "      self._first_event_timestamp = event.wall_time\n" +
                "\n" +
                "    if event.HasField('file_version'):\n" +
                "      new_file_version = _ParseFileVersion(event.file_version)\n" +
                "      if self.file_version and self.file_version != new_file_version:\n" +
                "        ## This should not happen.\n" +
                "        tf.logging.warn(('Found new file_version for event.proto. This will '\n" +
                "                         'affect purging logic for TensorFlow restarts. '\n" +
                "                         'Old: {0} New: {1}').format(self.file_version,\n" +
                "                                                     new_file_version))\n" +
                "      self.file_version = new_file_version\n" +
                "\n" +
                "    self._MaybePurgeOrphanedData(event)\n" +
                "\n" +
                "    ## Process the event.\n" +
                "    # GraphDef and MetaGraphDef are handled in a special way:\n" +
                "    # If no graph_def Event is available, but a meta_graph_def is, and it\n" +
                "    # contains a graph_def, then use the meta_graph_def.graph_def as our graph.\n" +
                "    # If a graph_def Event is available, always prefer it to the graph_def\n" +
                "    # inside the meta_graph_def.\n" +
                "    if event.HasField('graph_def'):\n" +
                "      # print('graph_def')\n" +
                "      if self._graph is not None:\n" +
                "        tf.logging.warn(\n" +
                "            ('Found more than one graph event per run, or there was '\n" +
                "             'a metagraph containing a graph_def, as well as one or '\n" +
                "             'more graph events.  Overwriting the graph with the '\n" +
                "             'newest event.'))\n" +
                "      self._graph = event.graph_def\n" +
                "      self._graph_from_metagraph = False\n" +
                "    elif event.HasField('meta_graph_def'):\n" +
                "      print('meta_graph_def')\n" +
                "      if self._meta_graph is not None:\n" +
                "        tf.logging.warn(('Found more than one metagraph event per run. '\n" +
                "                         'Overwriting the metagraph with the newest event.'))\n" +
                "      self._meta_graph = event.meta_graph_def\n" +
                "      if self._graph is None or self._graph_from_metagraph:\n" +
                "        # We may have a graph_def in the metagraph.  If so, and no\n" +
                "        # graph_def is directly available, use this one instead.\n" +
                "        meta_graph = tf.MetaGraphDef()\n" +
                "        meta_graph.ParseFromString(self._meta_graph)\n" +
                "        if meta_graph.graph_def:\n" +
                "          if self._graph is not None:\n" +
                "            tf.logging.warn(\n" +
                "                ('Found multiple metagraphs containing graph_defs,'\n" +
                "                 'but did not find any graph events.  Overwriting the '\n" +
                "                 'graph with the newest metagraph version.'))\n" +
                "          self._graph_from_metagraph = True\n" +
                "          self._graph = meta_graph.graph_def.SerializeToString()\n" +
                "    elif event.HasField('tagged_run_metadata'):\n" +
                "      print('tagged_run_metadata')\n" +
                "      tag = event.tagged_run_metadata.tag\n" +
                "      if tag in self._tagged_metadata:\n" +
                "        tf.logging.warn('Found more than one \"run metadata\" event with tag ' +\n" +
                "                        tag + '. Overwriting it with the newest event.')\n" +
                "      self._tagged_metadata[tag] = event.tagged_run_metadata.run_metadata\n" +
                "\n" +
                "  def Tags(self):\n" +
                "    \"\"\"Return all tags found in the value stream.\n" +
                "\n" +
                "    Returns:\n" +
                "      A `{tagType: ['list', 'of', 'tags']}` dictionary.\n" +
                "    \"\"\"\n" +
                "    return {\n" +
                "        TENSORS: list(self.tensors_by_tag.keys()),\n" +
                "        # Use a heuristic: if the metagraph is available, but\n" +
                "        # graph is not, then we assume the metagraph contains the graph.\n" +
                "        GRAPH: self._graph is not None,\n" +
                "        META_GRAPH: self._meta_graph is not None,\n" +
                "        RUN_METADATA: list(self._tagged_metadata.keys())\n" +
                "    }\n" +
                "\n" +
                "  def Graph(self):\n" +
                "    \"\"\"Return the graph definition, if there is one.\n" +
                "\n" +
                "    If the graph is stored directly, return that.  If no graph is stored\n" +
                "    directly but a metagraph is stored containing a graph, return that.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If there is no graph for this run.\n" +
                "\n" +
                "    Returns:\n" +
                "      The `graph_def` proto.\n" +
                "    \"\"\"\n" +
                "    graph = tf.GraphDef()\n" +
                "    if self._graph is not None:\n" +
                "      graph.ParseFromString(self._graph)\n" +
                "      return graph\n" +
                "    raise ValueError('There is no graph in this EventAccumulator')\n" +
                "\n" +
                "  def MetaGraph(self):\n" +
                "    \"\"\"Return the metagraph definition, if there is one.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If there is no metagraph for this run.\n" +
                "\n" +
                "    Returns:\n" +
                "      The `meta_graph_def` proto.\n" +
                "    \"\"\"\n" +
                "    if self._meta_graph is None:\n" +
                "      raise ValueError('There is no metagraph in this EventAccumulator')\n" +
                "    meta_graph = tf.MetaGraphDef()\n" +
                "    meta_graph.ParseFromString(self._meta_graph)\n" +
                "    return meta_graph\n" +
                "\n" +
                "  def RunMetadata(self, tag):\n" +
                "    \"\"\"Given a tag, return the associated session.run() metadata.\n" +
                "\n" +
                "    Args:\n" +
                "      tag: A string tag associated with the event.\n" +
                "\n" +
                "    Raises:\n" +
                "      ValueError: If the tag is not found.\n" +
                "\n" +
                "    Returns:\n" +
                "      The metadata in form of `RunMetadata` proto.\n" +
                "    \"\"\"\n" +
                "    if tag not in self._tagged_metadata:\n" +
                "      raise ValueError('There is no run metadata with this tag name')\n" +
                "\n" +
                "    run_metadata = tf.RunMetadata()\n" +
                "    run_metadata.ParseFromString(self._tagged_metadata[tag])\n" +
                "    return run_metadata\n" +
                "\n" +
                "  def Tensors(self, tag):\n" +
                "    \"\"\"Given a summary tag, return all associated tensors.\n" +
                "\n" +
                "    Args:\n" +
                "      tag: A string tag associated with the events.\n" +
                "\n" +
                "    Raises:\n" +
                "      KeyError: If the tag is not found.\n" +
                "\n" +
                "    Returns:\n" +
                "      An array of `TensorEvent`s.\n" +
                "    \"\"\"\n" +
                "    return self.tensors_by_tag[tag].Items(_TENSOR_RESERVOIR_KEY)\n" +
                "\n" +
                "  def _MaybePurgeOrphanedData(self, event):\n" +
                "    \"\"\"Maybe purge orphaned backenddata due to a TensorFlow crash.\n" +
                "\n" +
                "    When TensorFlow crashes at step T+O and restarts at step T, any events\n" +
                "    written after step T are now \"orphaned\" and will be at best misleading if\n" +
                "    they are included in TensorBoard.\n" +
                "\n" +
                "    This logic attempts to determine if there is orphaned backenddata, and purge it\n" +
                "    if it is found.\n" +
                "\n" +
                "    Args:\n" +
                "      event: The event to use as a reference, to determine if a purge is needed.\n" +
                "    \"\"\"\n" +
                "    if not self.purge_orphaned_data:\n" +
                "      return\n" +
                "    ## Check if the event happened after a crash, and purge expired tags.\n" +
                "    if self.file_version and self.file_version >= 2:\n" +
                "      ## If the file_version is recent enough, use the SessionLog enum\n" +
                "      ## to check for restarts.\n" +
                "      self._CheckForRestartAndMaybePurge(event)\n" +
                "    else:\n" +
                "      ## If there is no file version, default to old logic of checking for\n" +
                "      ## out of order steps.\n" +
                "      self._CheckForOutOfOrderStepAndMaybePurge(event)\n" +
                "    # After checking, update the most recent summary step and wall time.\n" +
                "    if event.HasField('summary'):\n" +
                "      self.most_recent_step = event.step\n" +
                "      self.most_recent_wall_time = event.wall_time\n" +
                "\n" +
                "  def _CheckForRestartAndMaybePurge(self, event):\n" +
                "    \"\"\"Check and discard expired events using SessionLog.START.\n" +
                "\n" +
                "    Check for a SessionLog.START event and purge all previously seen events\n" +
                "    with larger steps, because they are out of date. Because of supervisor\n" +
                "    threading, it is possible that this logic will cause the first few event\n" +
                "    messages to be discarded since supervisor threading does not guarantee\n" +
                "    that the START message is deterministically written first.\n" +
                "\n" +
                "    This method is preferred over _CheckForOutOfOrderStepAndMaybePurge which\n" +
                "    can inadvertently discard events due to supervisor threading.\n" +
                "\n" +
                "    Args:\n" +
                "      event: The event to use as reference. If the event is a START event, all\n" +
                "        previously seen events with a greater event.step will be purged.\n" +
                "    \"\"\"\n" +
                "    if event.HasField(\n" +
                "        'session_log') and event.session_log.status == tf.SessionLog.START:\n" +
                "      self._Purge(event, by_tags=False)\n" +
                "\n" +
                "  def _CheckForOutOfOrderStepAndMaybePurge(self, event):\n" +
                "    \"\"\"Check for out-of-order event.step and discard expired events for tags.\n" +
                "\n" +
                "    Check if the event is out of order relative to the global most recent step.\n" +
                "    If it is, purge outdated summaries for tags that the event contains.\n" +
                "\n" +
                "    Args:\n" +
                "      event: The event to use as reference. If the event is out-of-order, all\n" +
                "        events with the same tags, but with a greater event.step will be purged.\n" +
                "    \"\"\"\n" +
                "    if event.step < self.most_recent_step and event.HasField('summary'):\n" +
                "      self._Purge(event, by_tags=True)\n" +
                "\n" +
                "  def _ProcessTensor(self, tag, wall_time, step, tensor):\n" +
                "    tv = TensorEvent(wall_time=wall_time, step=step, tensor_proto=tensor)\n" +
                "    with self._tensors_by_tag_lock:\n" +
                "      if tag not in self.tensors_by_tag:\n" +
                "        reservoir_size = self._GetTensorReservoirSize(tag)\n" +
                "        self.tensors_by_tag[tag] = Reservoir(reservoir_size)\n" +
                "    self.tensors_by_tag[tag].AddItem(_TENSOR_RESERVOIR_KEY, tv)\n" +
                "\n" +
                "  def _GetTensorReservoirSize(self, tag):\n" +
                "    default = self._size_guidance[TENSORS]\n" +
                "    summary_metadata = self.summary_metadata.get(tag)\n" +
                "    if summary_metadata is None:\n" +
                "      return default\n" +
                "    return self._tensor_size_guidance.get(\n" +
                "        summary_metadata.plugin_data.plugin_name, default)\n" +
                "\n" +
                "  def _Purge(self, event, by_tags):\n" +
                "    \"\"\"Purge all events that have occurred after the given event.step.\n" +
                "\n" +
                "    If by_tags is True, purge all events that occurred after the given\n" +
                "    event.step, but only for the tags that the event has. Non-sequential\n" +
                "    event.steps suggest that a TensorFlow restart occurred, and we discard\n" +
                "    the out-of-order events to display a consistent view in TensorBoard.\n" +
                "\n" +
                "    Discarding by tags is the safer method, when we are unsure whether a restart\n" +
                "    has occurred, given that threading in supervisor can cause events of\n" +
                "    different tags to arrive with unsynchronized step values.\n" +
                "\n" +
                "    If by_tags is False, then purge all events with event.step greater than the\n" +
                "    given event.step. This can be used when we are certain that a TensorFlow\n" +
                "    restart has occurred and these events can be discarded.\n" +
                "\n" +
                "    Args:\n" +
                "      event: The event to use as reference for the purge. All events with\n" +
                "        the same tags, but with a greater event.step will be purged.\n" +
                "      by_tags: Bool to dictate whether to discard all out-of-order events or\n" +
                "        only those that are associated with the given reference event.\n" +
                "    \"\"\"\n" +
                "    ## Keep backenddata in reservoirs that has a step less than event.step\n" +
                "    _NotExpired = lambda x: x.step < event.step\n" +
                "\n" +
                "    num_expired = 0\n" +
                "    if by_tags:\n" +
                "      for value in event.summary.value:\n" +
                "        if value.tag in self.tensors_by_tag:\n" +
                "          tag_reservoir = self.tensors_by_tag[value.tag]\n" +
                "          num_expired += tag_reservoir.FilterItems(\n" +
                "              _NotExpired, _TENSOR_RESERVOIR_KEY)\n" +
                "    else:\n" +
                "      for tag_reservoir in six.itervalues(self.tensors_by_tag):\n" +
                "        num_expired += tag_reservoir.FilterItems(\n" +
                "            _NotExpired, _TENSOR_RESERVOIR_KEY)\n" +
                "    if num_expired > 0:\n" +
                "      purge_msg = _GetPurgeMessage(self.most_recent_step,\n" +
                "                                   self.most_recent_wall_time, event.step,\n" +
                "                                   event.wall_time, num_expired)\n" +
                "      tf.logging.warn(purge_msg)\n" +
                "\n" +
                "\n" +
                "def _GetPurgeMessage(most_recent_step, most_recent_wall_time, event_step,\n" +
                "                     event_wall_time, num_expired):\n" +
                "  \"\"\"Return the string message associated with TensorBoard purges.\"\"\"\n" +
                "  return ('Detected out of order event.step likely caused by a TensorFlow '\n" +
                "          'restart. Purging {} expired tensor events from Tensorboard display '\n" +
                "          'between the previous step: {} (timestamp: {}) and current step: {} '\n" +
                "          '(timestamp: {}).'\n" +
                "         ).format(num_expired, most_recent_step, most_recent_wall_time,\n" +
                "                  event_step, event_wall_time)\n" +
                "\n" +
                "\n" +
                "def _GeneratorFromPath(path):\n" +
                "  \"\"\"Create an event generator for file or directory at given path string.\"\"\"\n" +
                "  if not path:\n" +
                "    raise ValueError('path must be a valid string')\n" +
                "  if IsTensorFlowEventsFile(path):\n" +
                "    return EventFileLoader(path)\n" +
                "  else:\n" +
                "    return DirectoryWatcher(\n" +
                "        path, EventFileLoader, IsTensorFlowEventsFile)\n" +
                "\n" +
                "\n" +
                "def _ParseFileVersion(file_version):\n" +
                "  \"\"\"Convert the string file_version in event.proto into a float.\n" +
                "\n" +
                "  Args:\n" +
                "    file_version: String file_version from event.proto\n" +
                "\n" +
                "  Returns:\n" +
                "    Version number as a float.\n" +
                "  \"\"\"\n" +
                "  tokens = file_version.split('brain.Event:')\n" +
                "  try:\n" +
                "    return float(tokens[-1])\n" +
                "  except ValueError:\n" +
                "    ## This should never happen according to the definition of file_version\n" +
                "    ## specified in event.proto.\n" +
                "    tf.logging.warn(\n" +
                "        ('Invalid event.proto file_version. Defaulting to use of '\n" +
                "         'out-of-order event.step logic for purging expired events.'))\n" +
                "    return -1\n" +
                "\n" +
                "\n" +
                "def main():\n" +
                "    path = \"C:\\\\tensorflow\\mnist\\logs\\mnist_with_summaries\\\\train\"\n" +
                "    acc = EventAccumulator(path)\n" +
                "    acc.Reload()\n" +
                "    graph = acc.Graph()\n" +
                "    print(graph)\n" +
                "    return 0\n" +
                "\n" +
                "\n" +
                "if __name__ == '__main__':\n" +
                "    main()\n";
        byte[] bytesISO8859 =null;
        byte[] bytesGBK = null;
        try
        {
            bytesISO8859 =
                    s.getBytes("iso-8859-1");
            bytesGBK = s.getBytes("GBK");
//            System.out.println(bytesGBK);
        }
        catch
                (java.io.UnsupportedEncodingException e)
        {
            e.printStackTrace();
        }
//        System.out.println(bytesGBK.toString().getClass().toString());
        System.out.println
                ("--------------\n 8859 bytes:");
        System.out.println("bytes is:     " + arrayToString(bytesISO8859));
//        System.out.println("hex format is:"
//                + encodeHex(bytesISO8859));
        System.out.println();
        System.out.println
                ("--------------\n GBK bytes:");
        String byteString = arrayToString(bytesGBK);
        System.out.println("bytes is:" + byteString);
//        System.out.println("hex format is:" + encodeHex(bytesGBK));
    }

    public static final String
    encodeHex (byte[] bytes)
    {
        StringBuffer buff =
                new StringBuffer(bytes.length * 2);
        String b;
        for (int i=0; i<bytes.length ; i++)
        {
            b = Integer.toHexString(bytes[i]);
            // byte是两个字节的,而上面的Integer.toHexString会把字节扩展为4个字节
            buff.append(b.length() > 2 ? b.substring(6,8) : b);
            buff.append(" ");
        }
        return buff.toString();
    }

    public static final String arrayToString(byte[] bytes) {
        StringBuffer buff = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            buff.append(bytes[i] + " ");
        }
        System.out.println(buff.toString().getClass().toString());
        return buff.toString();
    }
}