var NodeStates = new Array();
var Edgs = new Array();
function TbDataToPrepareData() {
    var hierarchyParams = {
        verifyTemplate: true,
        // If a set of numbered op nodes has at least this number of nodes
        // then group them into a series node.
        seriesNodeMinSize: 5,
        // A map of series node names to series grouping settings, to indicate
        // if a series is to be rendered as grouped or ungrouped.
        // Starts out empty which allows the renderer to decide which series
        // are initially rendered grouped and which aren't.
        seriesMap: {}
    };
    var tracker = tf.graph.util.getTracker({
        set: function () {
            return;
        }, progress: 0
    });
    var pbtxt = tf.graph.test.util.stringToArrayBuffer(ModelDate);
    var refEdges = {};
    refEdges["Assign 0"] = true;
    refEdges["AssignAdd 0"] = true;
    refEdges["AssignSub 0"] = true;
    refEdges["assign 0"] = true;
    refEdges["assign_add 0"] = true;
    refEdges["assign_sub 0"] = true;
    refEdges["count_up_to 0"] = true;
    refEdges["ScatterAdd 0"] = true;
    refEdges["ScatterSub 0"] = true;
    refEdges["ScatterUpdate 0"] = true;
    refEdges["scatter_add 0"] = true;
    refEdges["scatter_sub 0"] = true;
    refEdges["scatter_update 0"] = true;
    var buildParams = {
        enableEmbedding: true,
        inEmbeddingTypes: ['Const'],
        outEmbeddingTypes: ['^[a-zA-Z]+Summary$'],
        refEdges: refEdges
    };
    var dummyTracker = tf.graph.util.getTracker({
        set: function () {
            return;
        }, progress: 0
    });
    tf.graph.parser.parseGraphPbTxt(pbtxt).then(function (nodes) {
        var i = 0;
        nodes.node.forEach(function (node) {
            NodeStates[i] = [node.name,];
            i ++ ;
        });
        tf.graph.build(nodes, buildParams, dummyTracker)
            .then(function (slimGraph) {
                var i = 0;
                slimGraph.edges.forEach(function (edg) {
                    Edgs[i] = [edg["v"], edg["w"],i++];
                });
                tf.graph.op.checkOpsForCompatibility(slimGraph);
                var hierarchyTracker = tf.graph.util.getSubtaskTracker(tracker, 50,
                    'Namespace hierarchy');
                return tf.graph.hierarchy.build(slimGraph, hierarchyParams, hierarchyTracker);
            }.bind(this)).then(function (graphHierarchy) {
            var i = 0;
            for (i ; i < NodeStates.length ; i++) {
                if (graphHierarchy.index[NodeStates[i]].parentNode.name != "__root__") {
                    NodeStates[i][1] = graphHierarchy.index[NodeStates[i]].parentNode.name;
                } else {
                    NodeStates[i].push("group");
                }
            }
            console.log(NodeStates);
            dataInitialization();
            var g = drawMainSVG(DrawNodes,DrawGroups,DrawEdgs);
            dragSvg(g);
        });
    });

}
function asyncRandom() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, Math.floor(Math.random() * 100) + 1);
    });
}