/* Copyright 2015 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

    var assert = chai.assert;
    // test('simple pbtxt', function (done) {
        var pbtxt = tf.graph.test.util.stringToArrayBuffer("node {\n       name: \"Q\"\n       op: \"Input\"\n     }\n     node {\n       name: \"W\"\n       op: \"Input\"\n     }\n     node {\n       name: \"X\"\n       op: \"MatMul\"\n       input: \"Q\"\n       input: \"W\"\n     }");
        tf.graph.parser.parseGraphPbTxt(pbtxt).then(function (nodes) {
            // console.log(nodes.node[0]);
            assert.isTrue(nodes.node != null && nodes.node.length === 3);
            assert.equal('Q', nodes.node[0].name);
            assert.equal('Input', nodes.node[0].op);
            assert.equal('W', nodes.node[1].name);
            assert.equal('Input', nodes.node[1].op);
            assert.equal('X', nodes.node[2].name);
            assert.equal('MatMul', nodes.node[2].op);
            assert.equal('Q', nodes.node[2].input[0]);
            assert.equal('W', nodes.node[2].input[1]);
            // done();
        });
    // });
    // test('stats pbtxt parsing', function (done) {
        var statsPbtxt = tf.graph.test.util.stringToArrayBuffer("step_stats {\n      dev_stats {\n        device: \"cpu\"\n        node_stats {\n          node_name: \"Q\"\n          all_start_micros: 10\n          all_end_rel_micros: 4\n        }\n        node_stats {\n          node_name: \"Q\"\n          all_start_micros: 12\n          all_end_rel_micros: 4\n        }\n      }\n    }");
        tf.graph.parser.parseStatsPbTxt(statsPbtxt).then(function (stepStats) {
            assert.equal(stepStats.dev_stats.length, 1);
            assert.equal(stepStats.dev_stats[0].device, 'cpu');
            assert.equal(stepStats.dev_stats[0].node_stats.length, 2);
            assert.equal(stepStats.dev_stats[0].node_stats[0].all_start_micros, 10);
            assert.equal(stepStats.dev_stats[0].node_stats[1].node_name, 'Q');
            assert.equal(stepStats.dev_stats[0].node_stats[1].all_end_rel_micros, 4);
            // done();
        });
    // });
    assert.isTrue(d3 != null)
    // TODO(nsthorat): write tests.

