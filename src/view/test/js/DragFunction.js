function dragSvg(g) {
    var nodeDrag = d3.drag().on("start", dragstart).on("drag",dragmove);
    var edgeDrag = d3.drag().on("start", dragstart).on("drag", function (d) {
        translateEdge(g.edge(d.v, d.w), d3.event.dx, d3.event.dy);
        d3.select('#' + g.edge(d.v, d.w).customId).attr('d', calcPoints(d));
    });

    d3.selectAll(".node").call(nodeDrag);
    d3.selectAll(".edgePath").call(edgeDrag);

    function dragstart(d) {
        d3.event.sourceEvent.stopPropagation();
    }

    function dragmove(d) {
        var node = d3.select(this),
            selectedNode = g.node(d);
        var prevX = selectedNode.x,
            prevY = selectedNode.y;

        selectedNode.x += d3.event.dx;
        selectedNode.y += d3.event.dy;
        node.attr('transform', 'translate(' + selectedNode.x + ',' + selectedNode.y + ')');

        var dx = selectedNode.x - prevX,
            dy = selectedNode.y - prevY;

        g.edges().forEach(function (e) {
            if (e.v == d || e.w == d) {
                edge = g.edge(e.v, e.w);
                translateEdge(g.edge(e.v, e.w), dx, dy);
                d3.select('#' + edge.customId).attr('d', calcPoints(e));
                label = d3.select('#label_' + edge.customId);
                var xforms = label.attr('transform');
                var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                var X = parseInt(parts[1])+dx, Y = parseInt(parts[2])+dy;
                label.attr('transform','translate('+X+','+Y+')');

            }
        })
    }
    function translateEdge(e, dx, dy) {
        e.points.forEach(function (p) {
            p.x = p.x + dx;
            p.y = p.y + dy;
        });
    }

    //taken from dagre-d3 source code (not the exact same)
    function calcPoints(e) {
        var edge = g.edge(e.v, e.w),
            tail = g.node(e.v),
            head = g.node(e.w);

        var points = edge.points.slice(1, edge.points.length - 1);

        points.unshift(intersectRect(tail, points[0]));

        points.push(intersectRect(head, points[points.length - 1]));
        return d3.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .curve(d3.curveBasis)(points)
    }

    function intersectRect(node, point) {
        var x = node.x;
        var y = node.y;
        var dx = point.x - x;
        var dy = point.y - y;
        var w = parseInt(d3.select("#" + node.customId).attr("width")) / 2;
        var h = parseInt(d3.select("#" + node.customId).attr('height')) / 2;
        var sx = 0,
            sy = 0;
        if (Math.abs(dy) * w > Math.abs(dx) * h) {
            // Intersection is top or bottom of rect.
            if (dy < 0) {
                h = -h;
            }
            sx = dy === 0 ? 0 : h * dx / dy;
            sy = h;
        } else {
            // Intersection is left or right of rect.
            if (dx < 0) {
                w = -w;
            }
            sx = w;
            sy = dx === 0 ? 0 : w * dy / dx;
        }
        return {
            x: x + sx,
            y: y + sy
        };
    }
}
