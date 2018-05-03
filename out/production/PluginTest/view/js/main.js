function drawMainSVG(states, groups, edgs) {
    var g = new dagreD3.graphlib.Graph({compound:true}).setGraph({});
    var colors = ["#d3d7e8" , "#ffd47f", "#5f9488" , "#009966", "#33FFFF", "#FFFF00", "#00FFCC"];
    var num = 0;
    if (groups) {
        groups.forEach(function (group) {
            g.setNode(group[0], {label: group[0], style: "fill:" + colors[(num++) % 7]});
            if (group[1]) {
                g.setParent(group[0], group[1]);
            }
        });
    }
    states.forEach(function(state) {
        g.setNode(state[0], { label: state[0], style: "fill:" + colors[(num++) % 7]});
        if(state[1]) {
            g.setParent(state[0], state[1]);
        }
    });
    edgs.forEach(function (edg) {
        g.setEdge(edg[0], edg[1], { label: edg[2]} );
    });
    g.nodes().forEach(function(v) {
        var node = g.node(v);
        node.rx = node.ry = 5;
        node.width = 100;
        node.height = 50;
    });
    g.edges().forEach(function (e) {
        var edge = g.edge(e.v, e.w);
        edge.lineInterpolate = "basis";
    });
    g.node("group").style = "fill: white";
    var svg = d3.select("svg"),
        inner = svg.select("g");

    var zoom = d3.zoom().on("zoom", function() {
        inner.attr("transform", d3.event.transform);
    });
    svg.call(zoom);
    var render = new dagreD3.render();
    render(inner, g);
    var initialScale = 0.75;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 10, 20).scale(initialScale));
    svg.attr('height', g.graph().height * initialScale + 40);

    svg.selectAll("g.node rect")
        .attr("id", function (d) {
            return d;
        });
    svg.selectAll("g.edgePath path")
        .attr("id", function (e) {
            return e.v + "-" + e.w;
        });
    svg.selectAll("g.edgeLabel g")
        .attr("id", function (e) {
            return 'label_'+e.v + "-" + e.w;
        });
    g.nodes().forEach(function(v) {
        var node = g.node(v);
        node.customId = node.label;
    });
    g.edges().forEach(function (e) {
        var edge = g.edge(e.v, e.w);
        edge.customId = e.v + "-" + e.w
    });

    //Node 双击事件
    d3.selectAll(".node").on("dblclick",function () {
        var SelectGroup = d3.select(this).select("rect").attr("id");
        d3.select("svg > g").remove();
        d3.select("svg").append("g");
        dataIncreaseUpdate(SelectGroup);
        var _g = drawMainSVG(DrawNodes,DrawGroups,DrawEdgs);
        dragSvg(_g);
    });

    //Group 双击事件
    d3.selectAll(".cluster").on("dblclick",function () {
        var DelGroup = d3.select(this).text();
        if(DelGroup != "group") {
            d3.select("svg > g").remove();
            d3.select("svg").append("g");
            dataDecreaseUpdate(DelGroup);
            var _g = drawMainSVG(DrawNodes,DrawGroups,DrawEdgs);
            dragSvg(_g);
        }
    });
    return g;
}