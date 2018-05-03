// var NodeStates = [ ["A","group"], ["B","group"], ["C","A"], ["D","A"],
//     ["E","K"], ["F","G"], ["G","A"], ["H","A"],
//     ["I","K"], ["J","group"], ["K","G"] ];
// //
// var Edgs = [["A","B",1],["B","C",2],["B","D",3],["B","A",4],["C","F",5],
//             ["D","C",6],["D","E",7],["D","A",8],["E","F",9],["E","G",10],
//             ["F","H",11],["F","I",12],["G","J",13],["H","K",14],["I","K",15],
//             ["J","A",16],["K","A",17]];
//

var DrawNodes = [];

var DrawEdgs = [];

var DrawGroups = [["group",""]];

var testNodes = [["B","group"], ["C","A"], ["D","A"],["G","A"], ["H","A"],["J","group"]];

var testEdgs = [["A","B",1],["B","C",2],["B","D",3],["D","C",6],["B","A",4],["D","A",8],["J","A",16],["G","J",13]];

var testGroups = [["group",""],["A","group"]];


//初始化绘图数据
function dataInitialization() {
    // console.log(NodeStates);
    // console.log(Edgs);
    var TemporaryNode = [];
    NodeStates.forEach(function (node) {
        if(node[1] == "group") {
            console.log(node[0]);
            DrawNodes.push(node);
            TemporaryNode.push(node[0]);
        }
    });
    updateEdgs(TemporaryNode);
    DrawNodes.push(["group",""]);
    console.log("DrawNodes", DrawNodes, "DrawEdgs", DrawEdgs, "DrawGroups", DrawGroups);
}

//双击Node增加绘图数据
function dataIncreaseUpdate(group) {
    var ifUpdate = 0;

    //更新Node
    NodeStates.forEach(function (node) {
        if(node[1] == group) {
            DrawNodes.push(node);
            ifUpdate ++ ;
        }
    });

    //更新Group和Edg
    if (ifUpdate) {
        for (var i = 0; i < DrawNodes.length; i++) {
            if (DrawNodes[i][0] == group) {
                DrawGroups.push(DrawNodes[i]);
                DrawNodes = DrawNodes.del(i);
                break;
            }
        }
        DrawEdgs = [];
        var TemporaryNode = [];
        DrawNodes.forEach(function (node) {
            TemporaryNode.push(node[0]);
        });
        updateEdgs(TemporaryNode);
        console.log("DrawNodes", DrawNodes, "DrawEdgs", DrawEdgs, "DrawGroups", DrawGroups);
    }
}

//双击Group后删除数据
function dataDecreaseUpdate(group) {

    //找到要删除的Group,更新Group
    var DelGroups = [group];
    var TempGIndex = 0;
    var TempGroupLen = DrawGroups.length;
    for (var i = 0; i < TempGroupLen; i++) {
        // console.log("i",i,"TempGIndex",TempGIndex);
        for (var j = 0; j < DelGroups.length; j++) {
            if(DrawGroups[TempGIndex][1] == DelGroups[j]) {
                if(DelGroups.indexOf(DrawGroups[TempGIndex][0]) == -1) {
                    DelGroups.push(DrawGroups[TempGIndex][0]);
                    DrawGroups = DrawGroups.del(TempGIndex);
                    TempGIndex --;
                }
            }
        }
        TempGIndex ++;
    }
    for(var i = 0 ; i < DrawGroups.length ; i++) {
        if(DrawGroups[i][0] == group) {
            DrawGroups = DrawGroups.del(i);
            break;
        }
    }

    //更新Node
    var OriLength = DrawNodes.length;
    var tempIndex = 0;
    for (var i = 0; i < OriLength; i++) {
        DelGroups.forEach(function (delgroup) {
            if (DrawNodes[tempIndex][0] != "group" && DrawNodes[tempIndex][1] == delgroup) {
                DrawNodes = DrawNodes.del(tempIndex);
                tempIndex -- ;
            }
        });
        tempIndex ++;
    }
    for (var i = 0; i < NodeStates.length; i++) {
        if(NodeStates[i][0] == group) {
            DrawNodes.push(NodeStates[i]);
            break;
        }
    }

    //更新Edg
    DrawEdgs = [];
    var TemporaryNode = [];
    DrawNodes.forEach(function (node) {
        TemporaryNode.push(node[0]);
    });
    updateEdgs(TemporaryNode);
    console.log("DrawNodes", DrawNodes, "DrawEdgs", DrawEdgs, "DrawGroups", DrawGroups);
}

//Edg 更新
function updateEdgs(TemporaryNode) {
    Edgs.forEach(function (edg) {
        if ((TemporaryNode.indexOf(edg[0]) != -1) && (TemporaryNode.indexOf(edg[1]) != -1)) {
            DrawEdgs.push(edg);
        }
    });
}
//del 方法
Array.prototype.del=function(n) {　
    if(n<0)　
        return this;
    else
        return this.slice(0,n).concat(this.slice(n+1,this.length));
};