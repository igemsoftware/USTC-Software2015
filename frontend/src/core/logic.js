﻿﻿﻿﻿/**
 * This js works as BioBLESS.logic's drawing function
 * @author USTC-software frontend
 * @author needsay
 * @author Ubrok
 * @since 2015-8-12
 */

BioBLESS.logic.init = function() {
    this.stage = BioBLESS.utils.init_stage();
};

/**
 * circuit is a data structure of logiv gates which communicate between frontend and backend
 */
BioBLESS.logic.circuit = {
    "nodes": [],
    "arcs": []
};

BioBLESS.logic.mark =[]; 

/**
 * circuit_add_gate is the function to add the structure based on element 
 * @param {type} element
 */
BioBLESS.logic.circuit_add_gate = function(type, title) {
    if(type === "not" || type === "NOT"){
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = title._text;
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 1, "to":BioBLESS.logic.circuit.nodes.length - 2};
        BioBLESS.logic.mark[BioBLESS.logic.mark.length] = BioBLESS.logic.circuit.nodes.length - 2;
    }
    else{
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = title._text;
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 2, "to":BioBLESS.logic.circuit.nodes.length - 3};
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 1, "to":BioBLESS.logic.circuit.nodes.length - 3};
        BioBLESS.logic.mark[BioBLESS.logic.mark.length] = BioBLESS.logic.circuit.nodes.length - 3;
    }
};

/**
 * circuit_add_line is the function to add the structure based on line
 * @param {mama} line.mother or line.father
 * @param {papa} line.mother or line.father
 */
BioBLESS.logic.circuit_add_line = function(mama, papa) {
    var i,j;
    var m,d;
    var k;
    for(k = 0;k < BioBLESS.logic.elements.length;k++){
        if(mama.parent === BioBLESS.logic.elements[k]){
            i = k;
        }
        if(papa.parent === BioBLESS.logic.elements[k]){
            j = k;
        }
    }//确定线父母的家长是哪个节点
    if(mama === mama.parent.input_1 || mama === mama.parent.input_2){
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[i]){
                if(BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.arcs[k].from] === "INPUT"){
                    m = BioBLESS.logic.circuit.arcs[k].from;
                    break;
                }
            }
        }
    }
    else{
        m = null;
    }//确定线母亲是哪一个接口
    if(papa === papa.parent.input_1 || papa === papa.parent.input_2){
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[j]){
                if(BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.arcs[k].from] === "INPUT"){
                    d = BioBLESS.logic.circuit.arcs[k].from;
                    break;
                }
            }
        }
    }
    else{
        d = null;
    }//确定线父亲是哪一个接口

    if(m !== null && d !== null){
        BioBLESS.logic.circuit.nodes.splice(d, 1);
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from > d){
                BioBLESS.logic.circuit.arcs[k].from -= 1;
            }
            if(BioBLESS.logic.circuit.arcs[k].to > d){
                BioBLESS.logic.circuit.arcs[k].to -= 1;
            }
        }
        for(k = 0; k < BioBLESS.logic.mark.length; k++){
            if(BioBLESS.logic.mark[k] > d){
                BioBLESS.logic.mark[k] -= 1;
            }
        }
        if(m > d){
            m -= 1;
        }
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from === d && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[j]){
                BioBLESS.logic.circuit.arcs.splice(k, 1);
                break;
            }
        }
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":m, "to":BioBLESS.logic.mark[j]};
    }//INPUT----INPUT
    else if(m !== null && d ===null){
        BioBLESS.logic.circuit.nodes.splice(m, 1);
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from > m){
                BioBLESS.logic.circuit.arcs[k].from -= 1;
            }
            if(BioBLESS.logic.circuit.arcs[k].to > m){
                BioBLESS.logic.circuit.arcs[k].to -= 1;
            }
        }
        for(k = 0; k < BioBLESS.logic.mark.length; k++){
            if(BioBLESS.logic.mark[k] > m){
                BioBLESS.logic.mark[k] -= 1;
            }
        }
       for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from === m && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[i]){
                BioBLESS.logic.circuit.arcs.splice(k, 1);
                break;
            }
        }
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.mark[j], "to":BioBLESS.logic.mark[i]};
    }// papa's OUTPUT--->mama's INPUT
    else if(m === null && d !==null){
        BioBLESS.logic.circuit.nodes.splice(d, 1);
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from > d){
                BioBLESS.logic.circuit.arcs[k].from -= 1;
            }
            if(BioBLESS.logic.circuit.arcs[k].to > d){
                BioBLESS.logic.circuit.arcs[k].to -= 1;
            }
        }
        for(k = 0; k < BioBLESS.logic.mark.length; k++){
            if(BioBLESS.logic.mark[k] > d){
                BioBLESS.logic.mark[k] -= 1;
            }
        }
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from === d && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[j]){
                BioBLESS.logic.circuit.arcs.splice(k, 1);
                break;
            }
        }
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.mark[i], "to":BioBLESS.logic.mark[j]};
    }// mama's OUTPUT--->papa's INPUT
    else{
        alert("Createline error! Output connect output is undefined. Please delete it.");
    }// OUTPUT----OUTPUT error.
};

/**
 * circuit_delete_line is the function to remove structure based on line
 * @param {mama} line.mother or line.father
 * @param {papa} line.mother or line.father
 */
BioBLESS.logic.circuit_delete_line = function(mama, papa) {
    var i,j;
    var m,d;
    var k;
    for(k = 0; k < BioBLESS.logic.elements.length; k++){
        if(mama.parent === BioBLESS.logic.elements[k]){
            i = k;
        }
        if(papa.parent === BioBLESS.logic.elements[k]){
            j = k;
        }
    }//确定线父母的家长是哪个节点
    if((mama === mama.parent.input_1 || mama === mama.parent.input_2) && (papa === papa.parent.input_1 || papa === papa.parent.input_2)){
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[i] && BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.arcs[k].from] === "INPUT"){
                for(var l = 0; l < BioBLESS.logic.circuit.arcs.length; l++){
                    if(BioBLESS.logic.circuit.arcs[l].to === BioBLESS.logic.mark[j] && BioBLESS.logic.circuit.arcs[l].from === BioBLESS.logic.circuit.arcs[k].from){
                        BioBLESS.logic.circuit.arcs.splice(l, 1);
                        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
                        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 1, "to":BioBLESS.logic.mark[j]};
                        break;
                    }
                }
                break;
            }
        }
    }//INPUT----INPUT
    else if((mama === mama.parent.input_1 || mama === mama.parent.input_2) && (papa === papa.parent.output)){
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from === BioBLESS.logic.mark[j] && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[i]){
                BioBLESS.logic.circuit.arcs.splice(k, 1);
                BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
                BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 1, "to":BioBLESS.logic.mark[i]};
                break;
            }
        }
    }// papa's OUTPUT--->mama's INPUT
    else if((mama === mama.parent.output) && (papa === papa.parent.input_1 || papa === papa.parent.input_2)){
        for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
            if(BioBLESS.logic.circuit.arcs[k].from === BioBLESS.logic.mark[i] && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[j]){
                BioBLESS.logic.circuit.arcs.splice(k, 1);
                BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = "INPUT";
                BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":BioBLESS.logic.circuit.nodes.length - 1, "to":BioBLESS.logic.mark[j]};
                break;
            }
        }
    }// mama's OUTPUT--->papa's INPUT
    else{
        alert("Delete the errorline");
    }// OUTPUT----OUTPUT error.
};

/**
 * circuit_delete_gate is the function to remove structure based on gate
 * @param {thing} gate
 */
BioBLESS.logic.circuit_delete_gate = function(thing) {
    var k;
    if(thing.input_1.connection === true){
        for(k = 0; k < thing.input_1.counts; k++){
            BioBLESS.logic.circuit_delete_line(thing.input_1.lines[k][0].mother, thing.input_1.lines[k][0].father);
        }
    }
    if(thing.input_2.connection === true){
        for(k = 0; k < thing.input_2.counts; k++){
            BioBLESS.logic.circuit_delete_line(thing.input_2.lines[k][0].mother, thing.input_2.lines[k][0].father);
        }
    }
    if(thing.output.connection === true){
        for(k = 0; k < thing.output.counts; k++){
            BioBLESS.logic.circuit_delete_line(thing.output.lines[k][0].mother, thing.output.lines[k][0].father);
        }
    }
    var i, j;
    for(i = 0; i < BioBLESS.logic.elements.length; i++){
        if(BioBLESS.logic.elements[i] === thing){
            break;
        }
    }
    for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
        j = BioBLESS.logic.circuit.arcs[k].from;
        if(BioBLESS.logic.circuit.nodes[j] === "INPUT" && BioBLESS.logic.circuit.arcs[k].to === BioBLESS.logic.mark[i]){
            BioBLESS.logic.circuit.nodes.splice(j, 1);
            BioBLESS.logic.circuit.arcs.splice(k, 1);
            var m;
            for(m = 0; m < BioBLESS.logic.circuit.arcs.length; m++){
                if(BioBLESS.logic.circuit.arcs[m].from > j){
                    BioBLESS.logic.circuit.arcs[m].from -= 1;
                }
                if(BioBLESS.logic.circuit.arcs[m].to > j){
                    BioBLESS.logic.circuit.arcs[m].to -= 1;
                }
            }
            for(m = 0; m < BioBLESS.logic.circuit.arcs.length; m++){
                if(BioBLESS.logic.mark[m] > j){
                    BioBLESS.logic.mark[m] -= 1;
                }
            }
            k--;
        }
    }
    var d = BioBLESS.logic.mark[i];
    BioBLESS.logic.circuit.nodes.splice(BioBLESS.logic.mark[i], 1);
    BioBLESS.logic.mark.splice(i, 1);
    for(k = 0; k < BioBLESS.logic.circuit.arcs.length; k++){
        if(BioBLESS.logic.circuit.arcs[k].from > d){
            BioBLESS.logic.circuit.arcs[k].from -= 1;
        }
        if(BioBLESS.logic.circuit.arcs[k].to > d){
            BioBLESS.logic.circuit.arcs[k].to -= 1;
        }
    }
    for(k = 0; k < BioBLESS.logic.mark.length; k++){
        if(BioBLESS.logic.mark[k] > d){
            BioBLESS.logic.mark[k] -= 1;
        }
    }
    BioBLESS.logic.elements.splice(i, 1);
    return("OK");
};

/**
 * draw_gate function works for preparing the svg of logicgate
 * @function
 * @param {device} caused by users
 * @return {element} PIXI.Graphics
 */

BioBLESS.logic.draw_gate = function(device){
    /**
     * element is a stage to draw the gate
     * @type {PIXI.Graphics}
     */
    var icon = device.id;
    var Regx = /^[0-9]*$/;
    var gate_style = {
        font : 'bold 16px "Open Sans",sans-serif',
        fill : 'white',
        align : 'left'
    };
    var site_style = {
        fill : 'white',
        align : 'center'
    };
    while(Regx.test(icon[icon.length - 1])){
        icon = icon.substring(0, icon.length - 1);
    }
    var element = new PIXI.Container();
    element.graphics = new PIXI.Graphics();
    element.title = new PIXI.Text(device.id, gate_style);
    element.input_1 = new PIXI.Graphics();
    element.input_1.lines = [];
    element.input_1.counts = 0;
    element.input_1.connection = false;
    element.input_2 = new PIXI.Graphics();
    element.input_2.lines = [];
    element.input_2.counts = 0;
    element.input_2.connection = false;
    element.output = new PIXI.Graphics();
    element.output.lines = [];
    element.output.counts = 0;
    element.output.connection = false;
    element.title.anchor.x = element.title.anchor.y = 0.5;
    element.title.position.x = 75;
    element.title.position.y = 84;
    element.title.style.fill = "white";
    element.type = icon;
    element.graphics.lineStyle(3, 0xffffff, 1);
    element.graphics.beginFill(0, 0);
    element.graphics.drawRect(30, 0, 90, 70);
    element.graphics.endFill();
    element.gate_delete_button = new PIXI.Graphics();

    element.output.beginFill(0xffffff, 1);
    element.output.drawRect(0, 0, -30, 3);
    element.output.position.x = 150;
    element.output.position.y = 34;
    element.output.endFill();
    element.output.beginFill(0, 0);
    element.output.drawRect(-30, -1, 30, 5);
    element.output.endFill();
            
    element.ieee_type = new PIXI.Text("", site_style);
    element.ieee_type.position.x = 75;
    element.ieee_type.position.y = 35;
    element.ieee_type.anchor.x = 0.5;
    element.ieee_type.anchor.y = 0.5;


    switch(icon){
        default: 
            alert("Error - 1001!");
            break;
        case "XOR":
        case "xor":
            break;
        case "AND":
        case "and":
            element.ieee_type._text = "&";
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.position.x = 0;
            element.input_1.position.y = 17;
            element.input_1.endFill();
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 30, 5);
            element.input_1.endFill();
            element.input_2.beginFill(0xffffff, 1);
            element.input_2.drawRect(0, 0, 30, 3);
            element.input_2.position.x = 0;
            element.input_2.position.y = 51;
            element.input_2.endFill();
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 30, 5);
            element.input_2.endFill();
            break;
        case "OR":
        case "or":
            element.ieee_type._text = "≥1";
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.position.x = 0;
            element.input_1.position.y = 17;
            element.input_1.endFill();
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 30, 5);
            element.input_1.endFill();
            element.input_2.beginFill(0xffffff, 1);
            element.input_2.drawRect(0, 0, 30, 3);
            element.input_2.position.x = 0;
            element.input_2.position.y = 51;
            element.input_2.endFill();
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 30, 5);
            element.input_2.endFill();
            break;
        case "NOT":
        case "not":
            element.ieee_type._text = "1";
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.position.x = 0;
            element.input_1.position.y = 34;
            element.input_1.endFill();
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 30, 5);
            element.input_1.endFill();
            element.graphics.moveTo(138, 35);
            element.graphics.lineTo(120, 20);
            break;
        case "NAND":
        case "nand":
        case "NOR":
        case "nor":
            element.ieee_type._text = "≥1";
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.position.x = 0;
            element.input_1.position.y = 17;
            element.input_1.endFill();
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 30, 5);
            element.input_1.endFill();
            element.input_2.beginFill(0xffffff, 1);
            element.input_2.drawRect(0, 0, 30, 3);
            element.input_2.position.x = 0;
            element.input_2.position.y = 51;
            element.input_2.endFill();
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 30, 5);
            element.input_2.endFill();
            element.graphics.moveTo(138, 35);
            element.graphics.lineTo(120, 20);
            break;
        case "XNOR":
        case "xnor":
            element.ieee_type._text = "=1";
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.position.x = 0;
            element.input_1.position.y = 17;
            element.input_1.endFill();
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 30, 5);
            element.input_1.endFill();
            element.input_2.beginFill(0xffffff, 1);
            element.input_2.drawRect(0, 0, 30, 3);
            element.input_2.position.x = 0;
            element.input_2.position.y = 51;
            element.input_2.endFill();
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 30, 5);
            element.input_2.endFill();
            element.graphics.moveTo(138, 35);
            element.graphics.lineTo(120, 20);
            break;
    }
    element.addChild(element.graphics);
    element.addChild(element.input_1);
    element.addChild(element.input_2);
    element.addChild(element.output);
    element.addChild(element.title);
    element.addChild(element.ieee_type);
    return element;
};

var waitForDoubleClick = false;

/**
 * on_drag_start_e makes element to be move-available
 * @function
 * @param {event} cause by users
 */
BioBLESS.logic.on_drag_start_e = function(event) {
    if(waitForDoubleClick){
        var i; 
        for(i = 0; i < BioBLESS.logic.elements.length; i++){
             if(BioBLESS.logic.elements[i] === this.parent)
                 break;
        }
        BioBLESS.gene_network.gates = BioBLESS.logic.circuit;
        var that = this;
        if(BioBLESS.gene_network.gates){
            BioBLESS.logic.mark_back = [];
            for(var j = 0; j < BioBLESS.logic.mark.length; j++){
                BioBLESS.logic.mark_back[BioBLESS.logic.mark[j]] = j;
            }
            BioBLESS.gene_network.draw(BioBLESS.gates, -1, BioBLESS.logic.mark[i]);
            BioBLESS.base_stage.removeChild(BioBLESS.logic.stage);
            BioBLESS.base_stage.addChild(BioBLESS.gene_network.stage);
            BioBLESS.base_stage.addChild(BioBLESS.navigation);
            BioBLESS.navigation.tag.y = BioBLESS.navigation.button[BioBLESS.gene_network.tag_index].y;
            BioBLESS.stage = BioBLESS.gene_network.stage;
        }
        return;
    } else {
        waitForDoubleClick = true;
        setTimeout(function(){
            waitForDoubleClick = false;
        }, 500);
    }
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
};
/**
 * on_drag_move_e makes element to keep draging and handles the lines
 * @function
 */
BioBLESS.logic.on_drag_move_e = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        this.parent.position.x = newPosition.x - 75;
        this.parent.position.y = newPosition.y - 35;
        var xRect;
        var yRect;
        var wRect;
        var hRect;
        var i;
        if(this.parent.input_1.connection){
            for(i = 0; i < this.parent.input_1.counts; i++){
                if(this.parent.input_1.lines[i][0].father === this.parent.input_1){
                    xRect = this.parent.input_1.lines[i][0].mother.position.x + this.parent.input_1.lines[i][0].mother.parent.position.x;
                    yRect = this.parent.input_1.lines[i][0].mother.position.y + this.parent.input_1.lines[i][0].mother.parent.position.y;
                } else{
                    xRect = this.parent.input_1.lines[i][0].father.position.x + this.parent.input_1.lines[i][0].father.parent.position.x;
                    yRect = this.parent.input_1.lines[i][0].father.position.y + this.parent.input_1.lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_1.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_1.position.y - yRect;
                this.parent.input_1.lines[i][0].clear();
                this.parent.input_1.lines[i][0].beginFill(this.parent.input_1.lines[i][0].line_color, 1);
                this.parent.input_1.lines[i][0].lineStyle(0, this.parent.input_1.lines[i][0].line_color, 1);
                this.parent.input_1.lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.input_1.lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_1.lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_1.lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.input_1.lines[i][0].endFill();
                this.parent.input_1.lines[i][0].lineStyle(3, this.parent.input_1.lines[i][0].line_color, 1);
                this.parent.input_1.lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.input_1.lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.input_1.lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.input_1.lines[i][0].beginFill(0, 0);
                this.parent.input_1.lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.input_1.lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.input_1.lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.input_1.lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.input_1.lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.input_1.lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.input_1.lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.input_1.lines[i][0].endFill();
            }
        }
        if(this.parent.input_2.connection){
            for(i = 0; i < this.parent.input_2.counts; i++){
                if(this.parent.input_2.lines[i][0].father === this.parent.input_2){
                    xRect = this.parent.input_2.lines[i][0].mother.position.x + this.parent.input_2.lines[i][0].mother.parent.position.x;
                    yRect = this.parent.input_2.lines[i][0].mother.position.y + this.parent.input_2.lines[i][0].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.input_2.lines[i][0].father.position.x + this.parent.input_2.lines[i][0].father.parent.position.x;
                    yRect = this.parent.input_2.lines[i][0].father.position.y + this.parent.input_2.lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_2.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_2.position.y - yRect;
                this.parent.input_2.lines[i][0].clear();
                this.parent.input_2.lines[i][0].beginFill(this.parent.input_2.lines[i][0].line_color, 1);
                this.parent.input_2.lines[i][0].lineStyle(0, this.parent.input_2.lines[i][0].line_color, 1);
                this.parent.input_2.lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.input_2.lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_2.lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_2.lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.input_2.lines[i][0].endFill();
                this.parent.input_2.lines[i][0].lineStyle(3, this.parent.input_2.lines[i][0].line_color, 1);
                this.parent.input_2.lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.input_2.lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.input_2.lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.input_2.lines[i][0].beginFill(0, 0);
                this.parent.input_2.lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.input_2.lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.input_2.lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.input_2.lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.input_2.lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.input_2.lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.input_2.lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.input_2.lines[i][0].endFill();
            }
        }
        if(this.parent.output.connection){
            for(i = 0; i < this.parent.output.counts; i++){
                if(this.parent.output.lines[i][0].father === this.parent.output){
                    xRect = this.parent.output.lines[i][0].mother.position.x + this.parent.output.lines[i][0].mother.parent.position.x;
                    yRect = this.parent.output.lines[i][0].mother.position.y + this.parent.output.lines[i][0].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.output.lines[i][0].father.position.x + this.parent.output.lines[i][0].father.parent.position.x;
                    yRect = this.parent.output.lines[i][0].father.position.y + this.parent.output.lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.output.position.x - xRect;
                hRect = this.parent.position.y + this.parent.output.position.y - yRect;
                this.parent.output.lines[i][0].clear();
                this.parent.output.lines[i][0].beginFill(this.parent.output.lines[i][0].line_color, 1);
                this.parent.output.lines[i][0].lineStyle(0, this.parent.output.lines[i][0].line_color, 1);
                this.parent.output.lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.output.lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.output.lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.output.lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.output.lines[i][0].endFill();
                this.parent.output.lines[i][0].lineStyle(3, this.parent.output.lines[i][0].line_color, 1);
                this.parent.output.lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.output.lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.output.lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.output.lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.output.lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.output.lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.output.lines[i][0].beginFill(0, 0);
                this.parent.output.lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.output.lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.output.lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.output.lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.output.lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.output.lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.output.lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.output.lines[i][0].endFill();
            }
        }
    }
};

/**
 * on_drag_end_e makes element to end draging
 * @function
 */
BioBLESS.logic.on_drag_end_e = function() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
};

var line_color_style = [0xaaaaaa, 0x0000aa, 0x00aa00, 0xaa0000, 0xaaaa00, 0xaa00aa, 0x00aaaa];
var line_color_select = 0;
var waitFordrawBegin = false;
var moving = false;
var drawPart;
/**
 * on_draw_line_up works for star andend of drawlines
 * @function
 * @param  event caused by users
 */
BioBLESS.logic.on_draw_line_up = function(event){
    waitFordrawBegin = !waitFordrawBegin;
    if(waitFordrawBegin){
        this.lines[this.counts] = [];
        drawPart = this.lines[this.counts];
        this.counts ++;
        this.connection = true;
        moving = true;
        drawPart[0] = new PIXI.Graphics();
        drawPart[0].father = this;
        drawPart[0].line_color = line_color_style[line_color_select++ % line_color_style.length];
    }
    else{
        moving = false;
        this.connection = true;
        this.lines[this.counts] = [];
        this.lines[this.counts] = drawPart;
        this.counts ++;
        drawPart[0].interactive = true;
        drawPart[0].buttonMode = true;
        drawPart[0].mother = this;
        drawPart[0].on('mouseover', BioBLESS.logic.line_delete_button_create)
                   .on('mouseout', BioBLESS.logic.line_delete_button_remove)
                   .on('click', BioBLESS.logic.line_wait_for_key);
        BioBLESS.logic.circuit_add_line(drawPart[0].mother, drawPart[0].father);
    }
};
/**
 * on_draw_line_move works for keeping drawing lines
 * @function
 * @param  event caused by users
 */
BioBLESS.logic.on_draw_line_move = function(event){
    if(moving){
            var xRect = drawPart[0].father.position.x + drawPart[0].father.parent.position.x;
            var yRect = drawPart[0].father.position.y + drawPart[0].father.parent.position.y;
            var newPosition =  event.data.getLocalPosition(this.parent.parent);
            var wRect = newPosition.x - xRect;
            var hRect = newPosition.y - yRect;
            drawPart[0].line_delete_button = new PIXI.Graphics();
            drawPart[0].line_delete_button.father = drawPart[0];
            drawPart[0].clear();
            drawPart[0].beginFill(drawPart[0].line_color, 1);
            drawPart[0].lineStyle(0, drawPart[0].line_color, 1);
            drawPart[0].drawCircle(xRect, yRect + 1.5, 1.5);
            drawPart[0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
            drawPart[0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
            drawPart[0].endFill();
            drawPart[0].lineStyle(3, drawPart[0].line_color, 1);
            drawPart[0].moveTo(xRect, yRect + 1.5);
            drawPart[0].lineTo(xRect, yRect + hRect/2 + 1.5);
            drawPart[0].moveTo(xRect, yRect + hRect/2 + 1.5);
            drawPart[0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
            drawPart[0].moveTo(xRect + wRect, yRect + hRect/2);
            drawPart[0].lineTo(xRect + wRect, yRect + hRect + 1.5);
            drawPart[0].beginFill(0, 0);
            drawPart[0].lineStyle(0, 0, 0);
            // if(hRect > 0){
            //     drawPart[0].drawRect(xRect - 1, yRect, 5, hRect/2);
            //     drawPart[0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
            // }
            // else{
            //     drawPart[0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
            //     drawPart[0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
            // }
            if(wRect > 0){
                drawPart[0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
            }
            else{
                drawPart[0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
            }
            drawPart[0].endFill();
            drawPart[0].line_delete_button.interactive = true;
            drawPart[0].line_delete_button.buttonMode = true;
            drawPart[0].father.parent.parent.addChild(drawPart[0]);
    }
};

/**
 * line_delete_button_create means to create a button on its line
 * @function
 * @param {event} mouseover the line
 */
BioBLESS.logic.line_delete_button_create = function(event) {
    var xRect = this.father.parent.position.x + this.father.position.x;
    var yRect = this.father.parent.position.y + this.father.position.y;
    var wRect = this.mother.parent.position.x + this.mother.position.y - xRect;
    var hRect = this.mother.parent.position.y + this.mother.position.y - yRect;
    this.line_delete_button.clear();
    this.line_delete_button.position.x = xRect + wRect/2 - 10;
    this.line_delete_button.position.y = yRect + hRect/2 - 20;
    this.line_delete_button.beginFill(0x345678, 0.5);
    this.line_delete_button.drawCircle(0, 0, 20);
    this.line_delete_button.endFill();
    this.line_delete_button.lineStyle(4, 0xffff00, 1);
    this.line_delete_button.moveTo(-8, 0);
    this.line_delete_button.lineTo(8, 0);
    this.line_delete_button.alpha = 1;
    this.line_delete_button.on('mouseover', BioBLESS.logic.line_delete_button_up)
                           .on('click', BioBLESS.logic.line_delete_button_right)
                           .on('mouseout', BioBLESS.logic.line_delete_button_down);
    this.father.parent.parent.addChild(this.line_delete_button);
    clearInterval(this.line_delete_button.her_animation);
    clearTimeout(this.line_delete_button.her_workend);
};

/**
 * line_delete_button_remove is the function to delete the button after mouseout the line
 * @function
 */
BioBLESS.logic.line_delete_button_remove = function() {
    var that = this;
    this.line_delete_button.her_animation = setInterval(function(){if(that.line_delete_button.alpha > 0){that.line_delete_button.alpha -= 0.05;}}, 100);        
    this.line_delete_button.her_workend = setTimeout(function(){that.father.parent.parent.removeChild(that.line_delete_button);}, 2000);
};

/**
 * line_delete_button_right is the function for delete itself and its line
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.line_delete_button_right = function(event) {
    var that = this.father;
    BioBLESS.logic.circuit_delete_line(that.mother, that.father);//delete
    that.mother.counts -= 1;
    if(that.mother.counts === 0){
        that.mother.connection = false;
    }
    that.father.counts -= 1;
    if(that.father.counts === 0){
        that.father.connection = false;
    }
    that.mother.parent.parent.removeChild(this);
    that.mother.parent.parent.removeChild(that);
};

/**
 * line_delete_button_up is the function to turn on the button
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.line_delete_button_up = function(event) {
    this.father.father.parent.parent.addChild(this);
    this.alpha = 1;
    clearInterval(this.her_animation);
    clearTimeout(this.her_workend);
};

/**
 * line_delete_button_down is the function to turn off the button
 * @function
 */
BioBLESS.logic.line_delete_button_down = function() {

};

/**
 * line_wait_for_key is the function  to detect keypress for itself, the line
 * @function
 * @param {event}
 */
BioBLESS.logic.line_wait_for_key = function(event) {
    var currkey;
    this.keypress = function(e) {
        e = e || event;
        currkey = e.keyCode || e.which || e.charCode;
    };
    this.keypress();
    switch(currkey){
        case 46: //delete
            BioBLESS.logic.circuit_delete_line(this.father, this.mother);
            this.mother.counts -= 1;
            if(this.mother.counts === 0){
                this.mother.connection = false;
            }
            this.father.counts -= 1;
            if(this.father.counts === 0){
                this.father.connection = false;
            }
            this.father.parent.parent.removeChild(this.line_delete_button);
            this.father.parent.parent.removeChild(this);
            break;
        }
};

/**
 * gate_delete_buttonCreate means to create a button on its element
 * @function
 * @param {event} mouseover the element.graphics
 */
BioBLESS.logic.gate_delete_buttonCreate = function(event) {
    this.parent.gate_delete_button.clear();
    this.parent.gate_delete_button.beginFill(0x345678, 0.5);
    this.parent.gate_delete_button.drawCircle(75, 35, 20);
    this.parent.gate_delete_button.endFill();
    this.parent.gate_delete_button.lineStyle(4, 0xffff00, 1);
    this.parent.gate_delete_button.moveTo(75 - 8, 35);
    this.parent.gate_delete_button.lineTo(75 + 8, 35);
    this.parent.gate_delete_button.y = -65;
    this.parent.gate_delete_button.alpha = 1;
    this.parent.gate_delete_button.on('mouseover', BioBLESS.logic.gate_delete_button_up)
                                  .on('mouseout', BioBLESS.logic.gate_delete_button_down)
                                  .on('click', BioBLESS.logic.gate_delete_button_right);
    this.parent.addChild(this.parent.gate_delete_button);
    clearInterval(this.parent.gate_delete_button.his_animation);
    clearTimeout(this.parent.gate_delete_button.his_workend);
};

/**
 * gate_delete_buttonDelete is the function to delete the button after mouseout the element.graphics
 * @function
 */
BioBLESS.logic.gate_delete_buttonDelete = function() {
    var that = this;
    this.parent.gate_delete_button.his_animation = setInterval(function(){if(that.parent.gate_delete_button.alpha > 0){that.parent.gate_delete_button.alpha -= 0.05;}}, 100);
    this.parent.gate_delete_button.his_workend = setTimeout(function(){that.parent.removeChild(that.parent.gate_delete_button);}, 2000);
};

/**
 * gate_delete_button_right is the function for delete its element with all thing in it
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.gate_delete_button_right = function(event) {
    var ready;
    var k;
    ready = BioBLESS.logic.circuit_delete_gate(this.parent);
    if(ready === "OK"){
        if(this.parent.input_1.connection === true){
            for(k = 0; k < this.parent.input_1.counts; k++){
                this.parent.parent.removeChild(this.parent.input_1.lines[k][0]);
            }
            this.parent.input_1.counts = 0;
            this.parent.input_1.connection = false;
        }
        if(this.parent.input_2.connection === true){
            for(k = 0; k < this.parent.input_2.counts; k++){
                this.parent.parent.removeChild(this.parent.input_2.lines[k][0]);
            }
            this.parent.input_2.counts = 0;
            this.parent.input_2.connection = false;
        }
        if(this.parent.output.connection === true){
            for(k = 0; k < this.parent.output.counts; k++){
                this.parent.parent.removeChild(this.parent.output.lines[k][0]);
            }
            this.parent.output.counts = 0;
            this.parent.output.connection = false;
        }
        this.parent.parent.removeChild(this.parent);
        this.parent.removeChild(this);
    }
};


/**
 * gate_delete_button_up is the function to turn on the button
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.gate_delete_button_up = function(event) {
    this.parent.addChild(this);
    this.alpha = 1;
    clearInterval(this.his_animation);
    clearTimeout(this.his_workend);
};

/**
 * gate_delete_button_down is the function to turn off the button
 * @function
 */
BioBLESS.logic.gate_delete_button_down = function() {
    // var that = this;
    // this.his_animation2 = setInterval(function(){if(that.alpha > 0){that.alpha -= 0.05;}}, 100);
    // this.his_workend2 = setTimeout(function(){that.parent.removeChild(that);}, 2000);
};

/**
 * gate_wait_for_key is the function  to detect keypress for itself, the element
 * @function
 * @param {event}
 */

BioBLESS.logic.gate_wait_for_key = function() {
    var currkey;
    var ready;
    this.keydown = function(e){
        e = e || event;
        currkey = e.keyCode || e.which || e.charCode;
    };
    this.keydown();
    switch(currkey){
        case 46: //delete
            ready = BioBLESS.logic.circuit_delete_gate(this.parent);
            var k;
            if(ready === "OK"){
                if(this.parent.input_1.connection === true){
                    for(k = 0; k < this.parent.input_1.counts; k++){
                        this.parent.parent.removeChild(this.parent.input_1.lines[k][0]);
                    }
                    this.parent.input_1.counts = 0;
                    this.parent.input_1.connection = false;
                }
                if(this.parent.input_2.connection === true){
                    for(k = 0; k < this.parent.input_2.counts; k++){
                        this.parent.parent.removeChild(this.parent.input_2.lines[k][0]);
                    }
                    this.parent.input_2.counts = 0;
                    this.parent.input_2.connection = false;
                }
                if(this.parent.output.connection === true){
                    for(k = 0; k < this.parent.output.counts; k++){
                        this.parent.parent.removeChild(this.parent.output.lines[k][0]);
                    }
                    this.parent.output.counts = 0;
                    this.parent.output.connection = false;
                }
                this.parent.parent.removeChild(this.parent);
                this.parent.removeChild(this);
            }
            break;
        case 17: //Control_L
            this.keydown();
            break;
    }
    if(currkey === 67){
        BioBLESS.logic.copy_target = this.parent.type;
    }
};


/**
 * on_drag_start makes element could be dragged from list
 * @function
 */
BioBLESS.logic.on_drag_start = function(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.startX = this.position.x;
    this.startY = this.position.y;
};
/**
 * on_drag_move makes element to move
 * @function
 */
BioBLESS.logic.on_drag_move = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - 75;
        this.position.y = newPosition.y - 35;
        this.childPosition = this.data.getLocalPosition(BioBLESS.logic.stage.movable_stage);
    }
};
/**
 * create a button with text
 * @function
 */
BioBLESS.logic.create_textbutton = function(t, w, h, color){
    var button = new PIXI.Container();
    button.background = new PIXI.Graphics();
    button.text = new PIXI.Text(t);
    button.text.style.fill = "white";
    button.background.beginFill(color, 1);
    button.background.drawRoundedRect(0, 0, w, h, h / 5);
    button.background.endFill();
    
    button.text.anchor.x = 0.5;
    button.text.anchor.y = 0.5;
    button.text.x = w / 2;
    button.text.y = h / 2;
    
    button.addChild(button.background);
    button.addChild(button.text);
    return button;
};

/**
 * create a circle button with text
 * @function
 */
BioBLESS.logic.create_circlebutton = function(t, w){
    var button = new PIXI.Container();
    button.background = new PIXI.Graphics();
    button.text = new PIXI.Text(t);
    button.text2 = new PIXI.Text(t);
    button.text2.style.fill = "white";
    button.background.beginFill(0xffffff, 1);
    button.background.drawCircle(w / 2, w / 2, w / 2);
    button.background.endFill();
    
    button.text.anchor.x = 0.5;
    button.text.anchor.y = 0.5;
    button.text.x = w / 2;
    button.text.y = w / 2;
    
    button.text2.anchor.x = 0.5;
    button.text2.anchor.y = 0.5;
    button.text2.x = w / 2;
    button.text2.y = w / 2;
    
    button.redraw = function(){
        button.background.clear();
        button.background.beginFill(0xffffff, 1);
        button.background.drawCircle(w / 2, w / 2, w / 2);
        button.background.endFill();
        button.addChild(button.text);
        button.removeChild(button.text2);
        button.interactive = true;
        button.buttonMode = true;
    };
    
    button.change = function(){
        button.background.clear();
        button.background.beginFill(0x000000, 1);
        button.background.drawCircle(w / 2, w / 2, w / 2);
        button.background.endFill();
        button.addChild(button.text2);
        button.removeChild(button.text);
        button.interactive = false;
        button.buttonMode = false;
    };
    
    button.addChild(button.background);
    button.addChild(button.text);
    return button;
};

/**
 * create a picture button with text
 * @function
 */
BioBLESS.logic.create_picturebutton = function(w){
    var button = new PIXI.Container();
    button.condition = 1;
    var icon1 = new PIXI.Sprite(BioBLESS.ustc_software.button1_logo_texture);
    var icon2 = new PIXI.Sprite(BioBLESS.ustc_software.button2_logo_texture);
    icon1.anchor.x = icon1.anchor.y = 0.5;
    icon2.anchor.x = icon2.anchor.y = 0.5;
    icon1.scale.x = icon1.scale.y = w / 1000;
    icon2.scale.x = icon2.scale.y = w / 1000;
    icon1.x = icon1.y = w / 2;
    icon2.x = icon2.y = w / 2;
    button.redraw = function(){
        button.addChild(icon1);
        button.removeChild(icon2);
        button.condition = 1;
    };
    button.change = function(){
        button.addChild(icon2);
        button.removeChild(icon1);
        button.condition = 2;
    };
    button.addChild(icon1);
    return button;
};

BioBLESS.logic.on_drag_s = function(event){
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
};

BioBLESS.logic.on_drag_m = function(){
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        var y = newPosition.y;
        if(newPosition.y >= this.end_y){
            y = this.end_y;
        }else if(newPosition.y <= this.start_y){
            y = this.start_y;
        }
        this.position.y = y;
        var t = (y - this.start_y) / (this.end_y - this.start_y);
        this.contain.y = 0 - t * (this.contain_h - this.area_h);
    }
};

BioBLESS.logic.on_drag_e = function(){
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
};

/**
 * create a scroll area for truth table stage
 * @function
 */
BioBLESS.logic.create_scrollarea = function(contain, contain_h, w, h){
    var stage = new PIXI.Container();
    stage.h = h;
    contain.h = contain_h;
    var bg = new PIXI.Graphics();
    bg.lineStyle(2, 0x000000, 1);
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, w, h);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    var mask = new PIXI.Graphics();
    mask.beginFill(0, 0);
    mask.drawRect(1, 1, w - 2, h - 2);
    mask.endFill();
    mask.is_out = true;
    contain.mask = mask;
    stage.addChild(mask);
    stage.addChild(contain);
    if(contain_h > h){
        var line = new PIXI.Graphics();
        line.lineStyle(2, 0x000000, 0.5);
        line.moveTo(w - 5, 5);
        line.lineTo(w - 5, h - 5);
        stage.addChild(line);
        var button = new PIXI.Graphics();
        button.w = 7;
        button.h = h / contain_h * (h - 10);
        button.beginFill(0x000000, 1);
        button.drawRect(0 - button.w / 2, 0 - button.h / 2, button.w, button.h);
        button.endFill();
        button.x = w - 5;
        button.y = 5 + button.h / 2;
        button.interactive = true;
        button.start_y = button.y;
        button.end_y = h - button.y;
        button.contain_h = contain_h;
        button.area_h = h;
        button.contain = contain;
        button.on('mousedown', BioBLESS.logic.on_drag_s)
              .on('touchstart', BioBLESS.logic.on_drag_s)
              .on('mouseup', BioBLESS.logic.on_drag_e)
              .on('mouseupoutside', BioBLESS.logic.on_drag_e)
              .on('touchend', BioBLESS.logic.on_drag_e)
              .on('touchendoutside', BioBLESS.logic.on_drag_e)
              .on('mousemove', BioBLESS.logic.on_drag_m)
              .on('touchmove', BioBLESS.logic.on_drag_m);
        stage.addChild(button);
        mask.button = button;
        mask.contain = contain;
    }
    stage.contain = contain;
    stage.change_position = function(x, y){
        this.position.x = x;
        this.position.y = y;
    };
    mask.interactive = true;
    if(contain_h > h){
        stage.scroll_fun = function(){};
        stage.scroll_function = function(d){
            if(d < 0){
                contain.y -= 50;
                if(contain.y < stage.h - contain.h){
                    contain.y = stage.h - contain.h;
                }
            }
            else{
                contain.y += 50;
                if(contain.y > 0){
                    contain.y = 0;
                }
            }
            var t = (0 - contain.y) / (contain.h - stage.h);
            button.y = button.start_y + t * (button.end_y - button.start_y);
            stage.scroll_fun(d);
        };
    }else
        stage.scroll_function = function(){};
    
    var on_mouse_over = function(event){
        
        if(this.is_out){
            this.is_out = false;
            BioBLESS.scroll_function = stage.scroll_function;
        }
    };
    var on_mouse_out = function(){
        if(this.is_out === false){
            this.is_out = true;
        }
    };
    mask.on("mouseover", on_mouse_over);
    mask.on("mouseout", on_mouse_out);
    return stage;
};

/**
 * create the base stage of truth table
 * @function
 */
BioBLESS.logic.create_base_stage_of_truth_table = function(h){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, 300, h);
    //bg.drawRect(152, 0, 148, -10);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    
    stage.scroll_area = new PIXI.Container();
    stage.addChild(stage.scroll_area);
    
    var number = 1;
    var num_bg = new PIXI.Graphics();
    num_bg.beginFill(0x000000, 1);
    num_bg.drawRect(100, 15, 100, 40);
    num_bg.endFill();
    var num = new PIXI.Text("1");
    num.style.fill = "white";
    num.anchor.x = num.anchor.y = 0.5;
    num.x = 150;
    num.y = 35;
    stage.addChild(num_bg);
    stage.addChild(num);
    
    var on_click = function(){
        if(this.condition === 1){
            this.change();
            BioBLESS.logic.truth_table_parameter = BioBLESS.logic.truth_table_parameter.substring(0, this.n) + "1" + BioBLESS.logic.truth_table_parameter.substring(this.n + 1, BioBLESS.logic.truth_table_parameter.length);
        }else{
            this.redraw();
            BioBLESS.logic.truth_table_parameter = BioBLESS.logic.truth_table_parameter.substring(0, this.n) + "0" + BioBLESS.logic.truth_table_parameter.substring(this.n + 1, BioBLESS.logic.truth_table_parameter.length);
        }
    };

    var num_function = function(){
        
        BioBLESS.logic.truth_table_parameter = "";
        var contain = new PIXI.Container();
        var num = [];
        var row = 1;
        var i, j = 2, k;
        var dis = 170 / (number + 1);
        this.button = [];
        for(i = 0; i < number; i++)
            row *= 2;
        for(k = 0; k < row; k++){
            var t = k;
            for(i = 0; i < number; i++){
                num[number - 1 - i] = t % j;
                t -= num[number - 1 - i];
                t /= 2;
            }
            for(i = 0; i < number; i++){
                var button = BioBLESS.logic.create_circlebutton(num[i].toString(), 40);
                if(num[i] === 1)
                    button.change();
                button.scale.x = 27 / 40;
                button.scale.y = 27 / 40;
                button.x = dis + i * dis - 5;
                button.y = 20 + 40 * k;
                if(number > 5){
                    button.scale.x = button.scale.y = button.scale.x * 5 / number;
                    button.y +=  17 - 85 / number;
                }
                contain.addChild(button);
            }
            this.button[k] = BioBLESS.logic.create_picturebutton(40);
            this.button[k].scale.x = 27 / 40;
            this.button[k].scale.y = 27 / 40;
            this.button[k].x = 28 + 6 * 28;
            this.button[k].y = 20 + 40 * k;
            this.button[k].n = k;
            this.button[k].interactive = true;
            this.button[k].buttonMode = true;
            this.button[k].on('click', on_click);
            contain.addChild(this.button[k]);
            BioBLESS.logic.truth_table_parameter += "0";
        }
        var scroll_area = BioBLESS.logic.create_scrollarea(contain, (row + 1) * 40, 260, h - 150);
        scroll_area.x = 20;
        scroll_area.y = 70;
        var mask = new PIXI.Graphics();
        mask.lineStyle(0, 0, 0);
        mask.beginFill(0, 0);
        mask.drawRect(0, -1000, 260, 1000);
        mask.drawRect(0, h - 150, 260, 1000);
        mask.endFill();
        mask.interactive = true;
        scroll_area.addChild(mask);
        
        stage.scroll_area.removeChildren();
        stage.scroll_area.addChild(scroll_area);
        if(stage.has_OK)
            return;
        var OK = BioBLESS.logic.create_textbutton("Create", 100, 40, 0x000000);
        OK.x = 100;
        OK.y = h - 60;
        stage.addChild(OK);
        OK.interactive = true;
        OK.buttonMode = true;
        var OK_function = function(){
            OK.alpha = 0.5;
            OK.interactive = false;
            OK.buttonMode = false;
            setTimeout(function(){
                if(OK.interactive)
                    return;
                OK.alpha = 1;
                OK.interactive = true;
                OK.buttonMode = true;
                alert("TIME OUT!");
            }, 24000);
            $.getJSON(BioBLESS.host + "/biocircuit/" + BioBLESS.logic.truth_table_parameter + "/", function(data) {
                    BioBLESS.logic.gates_sup = data;
                    var new_stage = BioBLESS.logic.create_output_stage_of_truth_table(stage, h);
                    stage.parent.addChild(new_stage);
                    stage.parent.removeChild(stage);
                    OK.alpha = 1;
                    OK.interactive = true;
                    OK.buttonMode = true;
            }.bind(this));
        };
        OK.on("click", OK_function);
        stage.has_OK = true;
    };

    num_function();
    
    var button1 = new PIXI.Graphics();
    button1.beginFill(0xffffff, 1);
    button1.moveTo(0, 0);
    button1.lineTo(0, 20);
    button1.lineTo(17, 10);
    button1.x = 210;
    button1.y = 25;
    button1.interactive = true;
    button1.buttonMode = true;
    button1.on("click", function(){
        number++;
        if(number > 8){
            number = 8;
            return;
        }
        num.text = number.toString();
        num_function();
    });
    stage.addChild(button1);
    
    
    var button2 = new PIXI.Graphics();
    button2.beginFill(0xffffff, 1);
    button2.moveTo(0, 0);
    button2.lineTo(0, 20);
    button2.lineTo(-17, 10);
    button2.x = 90;
    button2.y = 25;
    button2.interactive = true;
    button2.buttonMode = true;
    button2.on("click", function(){
        number--;
        if(number < 1){
            number = 1;
            return;
        }
        num.text = number.toString();
        num_function();
    });
    stage.addChild(button2);

    var _stage = new PIXI.Container();
    _stage.addChild(stage);
    return _stage;
};

/**
 * a constructor can calculate circuits to picture
 * @constructor
 */
BioBLESS.logic.circuits = function(){
    this.stage = new PIXI.Container();
    this.draw_lines_between_gates = function(){
        var i, j, k, l, temp;
        for(i = 0; i < this.devs.length; i++){
            for(j = 0; j < this.devs[i].output.length; j++){
                for(l = 0; l < this.devs[i].output[j].to_dev_index.length; l++){
                    if(this.devs[i].output[j].to_dev_index !== undefined){
                        var graphic = new PIXI.Graphics();
                        graphic.lineStyle(6, 0x7ec02a, 1);
                        var input_dev =  this.devs[this.devs[i].output[j].to_dev_index[l]];
                        var input_x = input_dev.position.x + input_dev.input[this.devs[i].output[j].to_dev_input_index[l]].x;
                        var input_y = input_dev.position.y + input_dev.input[this.devs[i].output[j].to_dev_input_index[l]].y;
                        var output_x = this.devs[i].position.x + this.devs[i].output[j].x;
                        var output_y = this.devs[i].position.y + this.devs[i].output[j].y;
                        graphic.moveTo(input_x, input_y);
                        graphic.lineTo(output_x, output_y);
                        this.stage.addChild(graphic);
                    }
                }
            }
        }
    };
    this.draw = function(gates) {
        var i, j, k, l, temp, out_index;
        this.devs = [];
        for(i = 0; i < gates.nodes.length; i++){
            var device = {};
            device.id = gates.nodes[i];
            if(device.id === "INPUT"){
                this.devs[i] = BioBLESS.gene_network.create_textbutton("INPUT", 150, 80, 0x37b899);
            }
            else if(device.id === "OUT"){
                this.devs[i] = BioBLESS.gene_network.create_textbutton("OUT", 100, 80, 0x2672bd);
            }
            else{
                this.devs[i] = BioBLESS.logic.draw_gate(device);
            }
            var Regx = /^[0-9]*$/;
            while(Regx.test(device.id[device.id.length - 1])){
                device.id = device.id.substring(0, device.id.length - 1);
            }
            this.devs[i].id = gates.nodes[i];
            this.devs[i].chosen = false;
            this.devs[i].input = [];
            this.devs[i].input_num = 0;
            this.devs[i].output = [];
            this.devs[i].output_num = 0;
            this.devs[i].stage_h = 70;
            this.devs[i].stage_w = 150;
            if(device.id === "INPUT"){
                this.devs[i].output[0] = {};
                this.devs[i].output[0].x = 150;
                this.devs[i].output[0].y = 35;
            }
            else if(device.id === "OUT"){
                this.devs[i].chosen = true;
                out_index = i;
                this.devs[i].input[0] = {};
                this.devs[i].input[0].x = 0;
                this.devs[i].input[0].y = 35;
            }
            else{
                if(device.id === "NOT"){
                    this.devs[i].input[0] = {};
                    this.devs[i].input[0].x = 0;
                    this.devs[i].input[0].y = 35;
                }
                else{
                    this.devs[i].input[0] = {};
                    this.devs[i].input[0].x = 0;
                    this.devs[i].input[0].y = 18;
                    this.devs[i].input[1] = {};
                    this.devs[i].input[1].x = 0;
                    this.devs[i].input[1].y = 52;
                }
                this.devs[i].output[0] = {};
                this.devs[i].output[0].x = 150;
                this.devs[i].output[0].y = 35;
            }
            if(this.devs[i].output[0] !== undefined){
                this.devs[i].output[0].to_dev_index = [];
                this.devs[i].output[0].to_dev_input_index = [];
            }
        }
        for(i = 0; i < gates.arcs.length; i++){
            var from = gates.arcs[i].from;
            var to = gates.arcs[i].to;
            this.devs[from].output[0].to_dev_index[this.devs[from].output[0].to_dev_index.length] = to;
            this.devs[from].output[0].to_dev_input_index[this.devs[from].output[0].to_dev_input_index.length] = this.devs[to].input_num;
            this.devs[to].input[this.devs[to].input_num].to_dev_index = from;
            this.devs[to].input[this.devs[to].input_num].to_dev_output_index = 0;
            this.devs[to].input_num++;
        }
        for(i = 0; i < gates.nodes.length; i++){
            if(this.devs[i].output[0] !== undefined && this.devs[i].output[0].to_dev_index.length === 0){
                j = gates.nodes.length;
                this.devs[j] = BioBLESS.gene_network.create_textbutton("OUT", 100, 80, 0x0000ff);
                this.devs[i].output[0].to_dev_index[0] = j;
                this.devs[i].output[0].to_dev_input_index[0] = 0;
                this.devs[j].output = [];
                this.devs[j].input = [];
                this.devs[j].input[0] = {};
                this.devs[j].input[0].to_dev_index = i;
                this.devs[j].input[0].to_dev_output_index = 0;
                this.devs[j].input[0].x = 0;
                this.devs[j].input[0].y = 35;
                this.devs[j].chosen = true;
                out_index = j;
                this.devs[j].id = "OUT";
                this.devs[j].stage_h = 70;
                this.devs[j].stage_w = 150;
                this.devs[j].input_num = 1;
            }
        }
        this.poi = [];
        this.poi[0] = [];
        for(i = 0; i < this.devs.length; i++){
            if(this.devs[i].input.length === 0){
                this.poi[0][this.poi[0].length] = this.devs[i];
                this.devs[i].chosen = true;
            }
        }
        i = 0;
        while(this.poi[i].length > 0){
            if(this.poi[i + 1] === undefined){
                this.poi[i + 1] = [];
            }
            for(j = 0; j < this.poi[i].length; j++){
                for(k = 0; k < this.poi[i][j].output.length; k++){
                    for(l = 0; l < this.poi[i][j].output[k].to_dev_index.length; l++){
                        if(this.devs[this.poi[i][j].output[k].to_dev_index[l]].chosen === false){
                            this.poi[i + 1][this.poi[i + 1].length] = this.devs[this.poi[i][j].output[k].to_dev_index[l]];
                            this.devs[this.poi[i][j].output[k].to_dev_index[l]].chosen = true;
                        }
                    }
                }
            }
            i++;
        }
        this.poi[this.poi.length - 1][0] = this.devs[out_index];
        this.poi[this.poi.length] = [];
        this.row = [];
        this.devs_height = 0;
        this.devs_width = 0;
        for(i = 0; i < this.poi.length - 1; i++){
            this.row[i] = {};
            this.row[i].width = 300;
            if(this.devs_height < 140 * this.poi[i].length)
                this.devs_height = 140 * this.poi[i].length;
        }
        var x = 0;
        for(i = 0; i < this.row.length; i++){
            for(j = 0; j < this.poi[i].length; j++){
                this.poi[i][j].position.x = x + (this.row[i].width -this.poi[i][j].stage_w) / 2 ;
                this.poi[i][j].position.y = (j + 1) / (this.poi[i].length + 1) * this.devs_height - this.poi[i][j].stage_h / 2;
                this.stage.addChild(this.poi[i][j]);
            }
            x += this.row[i].width;
        }
        this.devs_width = x;
        this.draw_lines_between_gates();    
        
        var bg = new PIXI.Graphics();
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, this.devs_width, this.devs_height);
        bg.endFill();
        this.stage.addChild(bg);
    };
};


/**
 * create the output stage of truth table
 * @function
 */
BioBLESS.logic.create_output_stage_of_truth_table = function(back_stage, h) {

    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, 300, h);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    var title = new PIXI.Text("Gates supsifications");
    title.anchor.x = 0.5;
    title.x = 150;
    title.y = 20;
    stage.addChild(title);
    var BACK = BioBLESS.logic.create_textbutton("BACK", 100, 40, 0x000000);
    BACK.x = 100;
    BACK.y = h - 60;
    
    BACK.interactive = true;
    BACK.buttonMode = true;
    var BACK_function = function(){   
        this.parent.parent.addChild(back_stage);
        this.parent.parent.removeChild(this.parent);
    };
    BACK.on("click", BACK_function);
    
    var contain = new PIXI.Container();
    var gene_circuits = [];
    var gene_circuits_move = [];
    var y = 0;
    var mouse_over = function(){
        this.button_bg.beginFill(0x555555, 1);
        this.button_bg.drawRect(0, 0, 260, this.h);
        this.button_bg.endFill();
        BioBLESS.scroll_function = this.parent.parent.scroll_function;
    };
    var mouse_out = function(){
        this.button_bg.clear();
    };
    var on_mouse_start = function(e){
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        gene_circuits_move[this.i].stage.x = new_position.x - 115;
        gene_circuits_move[this.i].stage.y = new_position.y - this.h / 2;
        BioBLESS.base_stage.addChild(gene_circuits_move[this.i].stage);
    };
    var on_mouse_move = function(e){
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        this.x = new_position.x - 115;
        this.y = new_position.y - this.h / 2;
    };
    var on_mouse_end = function(e){
        BioBLESS.base_stage.removeChild(this);
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        if(new_position.x < BioBLESS.width - 300)
            BioBLESS.logic.circuit_draw_of_data(gene_circuits[this.i], BioBLESS.logic.gates_sup[this.i]);
    };
    for(var i = 0; i < BioBLESS.logic.gates_sup.length; i++){
        gene_circuits[i] = new BioBLESS.logic.circuits();
        gene_circuits[i].draw(BioBLESS.logic.gates_sup[i]);
        gene_circuits[i].stage.y = y;
        gene_circuits[i].stage.scale.x = gene_circuits[i].stage.scale.y = 250 / gene_circuits[i].devs_width;
        gene_circuits[i].stage.button_bg = new PIXI.Graphics();
        gene_circuits[i].stage.button_bg.y = gene_circuits[i].stage.y;
        gene_circuits[i].stage.h = 250 / gene_circuits[i].devs_width * gene_circuits[i].devs_height;
        contain.addChild(gene_circuits[i].stage.button_bg);
        contain.addChild(gene_circuits[i].stage);
        gene_circuits[i].stage.i = i;
        gene_circuits[i].stage.interactive = true;
        gene_circuits[i].stage.on('mouseover', mouse_over)
                         .on('mouseout', mouse_out)
                         .on('mousedown', on_mouse_start);                                                               
        
        
        gene_circuits_move[i] = new BioBLESS.logic.circuits();
        gene_circuits_move[i].draw(BioBLESS.logic.gates_sup[i]);
        gene_circuits_move[i].stage.y = y;
        gene_circuits_move[i].stage.scale.x = gene_circuits_move[i].stage.scale.y = 250 / gene_circuits_move[i].devs_width;
        gene_circuits_move[i].stage.h = 250 / gene_circuits[i].devs_width * gene_circuits[i].devs_height;
        gene_circuits_move[i].stage.i = i;
        gene_circuits_move[i].stage.interactive = true;
        gene_circuits_move[i].stage.on('mousemove',  on_mouse_move)
                              .on('mouseup',  on_mouse_end)
                              .on('mouseupoutside',  on_mouse_end); 
        y += 250 / gene_circuits[i].devs_width * gene_circuits[i].devs_height;
        
    }
    var scroll_area = BioBLESS.logic.create_scrollarea(contain, y, 260, h - 150);
    var mask = new PIXI.Graphics();
    mask.interactive = true;
    mask.beginFill(0, 0);
    mask.drawRect(0, -1000, 260, 1000);
    mask.drawRect(0, h - 150, 260, 1000);
    mask.endFill();
    scroll_area.addChild(mask);
    scroll_area.x = 20;
    scroll_area.y = 70;
    stage.addChild(scroll_area);
    stage.addChild(BACK);
    return stage;
};

BioBLESS.logic.create_gates_list = function(h){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, 300, h);
    //bg.drawRect(0, 0, 148, -10);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    var contain = new PIXI.Container();
    var _logicGates = [];
    var logicGates = [];
    var mouse_over = function(){
        this.button_bg.beginFill(0x555555, 1);
        this.button_bg.drawRect(0, 0, 260, this.h);
        this.button_bg.endFill();
    };
    var mouse_out = function(){
        this.button_bg.clear();
    };
    var on_mouse_start = function(e){
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        logicGates[this.i].x = new_position.x - 75;
        logicGates[this.i].y = new_position.y - 35;
        BioBLESS.base_stage.addChild(logicGates[this.i]);
    };
    var on_mouse_move = function(e){
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        this.x = new_position.x - 75;
        this.y = new_position.y - 35;
    };
    var on_mouse_end = function(e){
        BioBLESS.base_stage.removeChild(this);
        var new_position = e.data.getLocalPosition(BioBLESS.base_stage);
        if(new_position.x < BioBLESS.width - 300 && new_position.x > 120){
            new_position = e.data.getLocalPosition(BioBLESS.logic.stage.movable_stage);
            BioBLESS.logic.elements[BioBLESS.logic.elements.length] = BioBLESS.logic.draw_gate(BioBLESS.gates[this.Index]);
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.x = new_position.x - 75;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.y = new_position.y - 35;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].Index = this.Index;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.on('mousedown', BioBLESS.logic.on_drag_start_e)
                                                                                .on('touchstart', BioBLESS.logic.on_drag_start_e)
                                                                                .on('mouseup', BioBLESS.logic.on_drag_end_e)
                                                                                .on('mouseupoutside', BioBLESS.logic.on_drag_end_e)
                                                                                .on('touchend', BioBLESS.logic.on_drag_end_e)
                                                                                .on('touchendoutside', BioBLESS.logic.on_drag_end_e)
                                                                                .on('mousemove', BioBLESS.logic.on_drag_move_e)
                                                                                .on('touchmove', BioBLESS.logic.on_drag_move_e)
                                                                                .on('mouseover', BioBLESS.logic.gate_delete_buttonCreate)
                                                                                .on('mouseout', BioBLESS.logic.gate_delete_buttonDelete)
                                                                                .on('click', BioBLESS.logic.gate_wait_for_key);

            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.on('mousedown', BioBLESS.logic.on_draw_line_up)
                                                                              .on('touchstart', BioBLESS.logic.on_draw_line_up)
                                                                              .on('mousemove', BioBLESS.logic.on_draw_line_move)
                                                                              .on('touchmove', BioBLESS.logic.on_draw_line_move);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.on('mousedown', BioBLESS.logic.on_draw_line_up)
                                                                               .on('touchstart', BioBLESS.logic.on_draw_line_up)
                                                                               .on('mousemove', BioBLESS.logic.on_draw_line_move)
                                                                               .on('touchmove', BioBLESS.logic.on_draw_line_move);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.on('mousedown', BioBLESS.logic.on_draw_line_up)
                                                                               .on('touchstart', BioBLESS.logic.on_draw_line_up)
                                                                               .on('mousemove', BioBLESS.logic.on_draw_line_move)
                                                                               .on('touchmove', BioBLESS.logic.on_draw_line_move);

            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.buttonMode = true;
            BioBLESS.logic.circuit_add_gate(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].type, BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].title);
            BioBLESS.logic.stage.movable_stage.addChild(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1]);
        }
    };
    for(var i = 0; i < BioBLESS.gates.length; i++){
        _logicGates[i] = BioBLESS.logic.draw_gate(BioBLESS.gates[i]);
        logicGates[i] = BioBLESS.logic.draw_gate(BioBLESS.gates[i]);
        _logicGates[i].position.x = 55;
        _logicGates[i].position.y = 15 + i * 120;
        _logicGates[i].button_bg = new PIXI.Graphics();
        _logicGates[i].button_bg.y = _logicGates[i].position.y - 15;
        _logicGates[i].i = i;
        _logicGates[i].h = 120;
        contain.addChild(_logicGates[i].button_bg);
        contain.addChild(_logicGates[i]);
        _logicGates[i].interactive = true;
        _logicGates[i].buttonMode = true;
        logicGates[i].interactive = true;
        logicGates[i].buttonMode = true;
        logicGates[i].Index = i;
        logicGates[i].alpha = 0.5;
        _logicGates[i].on('mouseover', mouse_over)
                      .on('mouseout', mouse_out)
                      .on('mousedown', on_mouse_start);
        logicGates[i].on('mousemove',  on_mouse_move)
                     .on('mouseup',  on_mouse_end)
                     .on('mouseupoutside',  on_mouse_end);                       
    }
    var scroll_area = BioBLESS.logic.create_scrollarea(contain, BioBLESS.gates.length * 120 + 15, 260, h - 40);
    var mask = new PIXI.Graphics();
    mask.interactive = true;
    mask.beginFill(0, 0);
    mask.drawRect(0, -1000, 260, 1000);
    mask.drawRect(0, h - 40, 260, 1000);
    mask.endFill();
    scroll_area.addChild(mask);
    scroll_area.x = 20;
    scroll_area.y = 20;
    stage.addChild(scroll_area);
    return stage;
};


BioBLESS.logic.create_right_stage = function(){
    var stage = new PIXI.Container();
    var truth_table = BioBLESS.logic.create_base_stage_of_truth_table(BioBLESS.height - 235);
    var gates_list = BioBLESS.logic.create_gates_list(BioBLESS.height - 235);
    gates_list.y = 34;
    truth_table.y = 34;
    var button1 = new PIXI.Graphics();
    button1.lineStyle(0, 0, 0);
    button1.beginFill(0xffffff, 1);
    button1.drawRect(0, 0, 148, 30);
    button1.endFill();
    button1.interactive = true;
    button1.on("click", function(){
        button1.clear();
        button1.beginFill(0xffffff, 1);
        button1.drawRect(0, 0, 148, 30);
        button1.endFill();
        button2.clear();
        button2.beginFill(0x888888, 1);
        button2.drawRect(152, 0, 148, 30);
        button2.endFill();
        stage.removeChild(gates_list);
        stage.addChild(truth_table);
        stage.addChild(button1);
        stage.addChild(button2);
        stage.addChild(text1);
        stage.addChild(text2);
    });
    var text1 = new PIXI.Text("Logic module");
    text1.anchor.x = text1.anchor.y = 0.5;
    text1.scale.x = text1.scale.y = 120 / text1.width;
    text1.x = 226;
    text1.y = 15;
    
    var button2 = new PIXI.Graphics();
    button2.lineStyle(0, 0, 0);
    button2.beginFill(0x888888, 1);
    button2.drawRect(152, 0, 148, 30);
    button2.endFill();
    button2.interactive = true;
    button2.on("click", function(){
        button1.clear();
        button1.beginFill(0x888888, 1);
        button1.drawRect(0, 0, 148, 30);
        button1.endFill();
        button2.clear();
        button2.beginFill(0xffffff, 1);
        button2.drawRect(152, 0, 148, 30);
        button2.endFill();
        stage.removeChild(truth_table);
        stage.addChild(gates_list);
        stage.addChild(button1);
        stage.addChild(button2);
        stage.addChild(text1);
        stage.addChild(text2);
    });
    var text2 = new PIXI.Text("Truth table");
    text2.anchor.x = text2.anchor.y = 0.5;
    text2.scale.x = text2.scale.y = 100 / text2.width;
    text2.x = 74;
    text2.y = 15;
    
    stage.addChild(truth_table);
    stage.addChild(button1);
    stage.addChild(button2);
    stage.addChild(text1);
    stage.addChild(text2);
    return stage;
};

/**
 * circuit_draw_of_data is the function to draw according to true table
 * @function
 * @param  {thing} BioBLESS.logic.circuits
 * @param  {circuit_data} BioBLESS.logic.circuit
 */
BioBLESS.logic.circuit_draw_of_data = function(thing, circuit_data) {
    var i,j,k;
    var temp_circuit = BioBLESS.logic.circuit;
    var temp_mark = [];
    var temp_elements_length = BioBLESS.logic.elements.length;
    var display = circuit_data.nodes.length;
    BioBLESS.logic.circuit = circuit_data;
    for(i = 0; i < temp_circuit.nodes.length; i++){
        BioBLESS.logic.circuit.nodes[BioBLESS.logic.circuit.nodes.length] = temp_circuit.nodes[i];
    }
    for(i = 0; i < temp_circuit.arcs.length; i++){
        BioBLESS.logic.circuit.arcs[BioBLESS.logic.circuit.arcs.length] = {"from":(temp_circuit.arcs[i].from + display), "to":(temp_circuit.arcs[i].to + display)};
    }
    for(i = 0; i < BioBLESS.logic.mark.length; i++){
        temp_mark[i] = BioBLESS.logic.mark[i] + display;
    }//backup BioBLESS.logic.mark
    for(i = 0; i < BioBLESS.logic.elements.length; i++){
        BioBLESS.logic.mark[i] = null;
    }

    // var start_data = this.data.getLocalPosition(BioBLESS.stage.movable_stage);

    /**
     * add_gate is the function to draw gate according to the BioBLESS.logic.circuits.poi
     * @function
     * @param {thing_e} BioBLESS.logic.circuits
     */
    BioBLESS.logic.add_gate = function(thing_e){
        var i,j,k,m;
        var that = BioBLESS.logic;
        for(i = 1; i < thing_e.poi.length - 2; i++){
            for(j = 0;j < thing_e.poi[i].length; j++){
                BioBLESS.logic.elements[BioBLESS.logic.elements.length] = BioBLESS.logic.draw_gate(thing_e.poi[i][j]);
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.x = thing_e.poi[i][j].position.x;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.y = thing_e.poi[i][j].position.y;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.interactive = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.buttonMode = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].Index = this.Index;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.on('mousedown', that.on_drag_start_e)
                                                                                    .on('touchstart', that.on_drag_start_e)
                                                                                    .on('mouseup', that.on_drag_end_e)
                                                                                    .on('mouseupoutside', that.on_drag_end_e)
                                                                                    .on('touchend', that.on_drag_end_e)
                                                                                    .on('touchendoutside', that.on_drag_end_e)
                                                                                    .on('mousemove', that.on_drag_move_e)
                                                                                    .on('touchmove', that.on_drag_move_e)
                                                                                    .on('mouseover', that.gate_delete_buttonCreate)
                                                                                    .on('mouseout', that.gate_delete_buttonDelete)
                                                                                    .on('click', that.gate_wait_for_key);

                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.interactive = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.buttonMode = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.on('mousedown', that.on_draw_line_up)
                                                                                  .on('touchstart', that.on_draw_line_up)
                                                                                  .on('mousemove', that.on_draw_line_move)
                                                                                  .on('touchmove', that.on_draw_line_move);
                
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.interactive = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.buttonMode = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.on('mousedown', that.on_draw_line_up)
                                                                                   .on('touchstart', that.on_draw_line_up)
                                                                                   .on('mousemove', that.on_draw_line_move)
                                                                                   .on('touchmove', that.on_draw_line_move);
                    
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.interactive = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.buttonMode = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.on('mousedown', that.on_draw_line_up)
                                                                                   .on('touchstart', that.on_draw_line_up)
                                                                                   .on('mousemove', that.on_draw_line_move)
                                                                                   .on('touchmove', that.on_draw_line_move);
                
                for(k = 0; k < thing_e.devs.length; k++){
                    if(thing_e.devs[k] === thing_e.poi[i][j]){
                        break;
                    }
                }
                BioBLESS.logic.mark[BioBLESS.logic.elements.length - 1] = k;

                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.interactive = true;
                BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.buttonMode = true;
                that.stage.movable_stage.addChild(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1]);
            }
        }
    };

    
    /**
     * add_line is the function to draw line according to its two connections
     * @function
     * @param {papa} BioBLESS.logic.elemennts.input_1/input_2/output
     * @param {mama} BioBLESS.logic.elemennts.input_1/input_2/output
     */
    BioBLESS.logic.add_line = function(papa, mama) {
        papa.lines[papa.counts] = [];
        drawPart = papa.lines[papa.counts];
        papa.counts ++;
        papa.connection = true;
        drawPart[0] = new PIXI.Graphics();
        drawPart[0].father = papa;
        mama.lines[mama.counts] = [];
        mama.lines[mama.counts] = drawPart;
        mama.counts ++;
        mama.connection = true;
        drawPart[0].mother = mama;
        drawPart[0].line_color = line_color_style[line_color_select++ % line_color_style.length];

        var xRect = drawPart[0].father.position.x + drawPart[0].father.parent.position.x;
        var yRect = drawPart[0].father.position.y + drawPart[0].father.parent.position.y;
        var wRect = drawPart[0].mother.position.x + drawPart[0].mother.parent.position.x - xRect;
        var hRect = drawPart[0].mother.position.y + drawPart[0].mother.parent.position.y - yRect;
        drawPart[0].line_delete_button = new PIXI.Graphics();
        drawPart[0].line_delete_button.father = drawPart[0];
        drawPart[0].clear();
        drawPart[0].beginFill(drawPart[0].line_color, 1);
        drawPart[0].lineStyle(0, drawPart[0].line_color, 1);
        drawPart[0].drawCircle(xRect, yRect + 1.5, 1.5);
        drawPart[0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
        drawPart[0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
        drawPart[0].endFill();
        drawPart[0].lineStyle(3, drawPart[0].line_color, 1);
        drawPart[0].moveTo(xRect, yRect + 1.5);
        drawPart[0].lineTo(xRect, yRect + hRect/2 + 1.5);
        drawPart[0].moveTo(xRect, yRect + hRect/2 + 1.5);
        drawPart[0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
        drawPart[0].moveTo(xRect + wRect, yRect + hRect/2);
        drawPart[0].lineTo(xRect + wRect, yRect + hRect + 1.5);
        drawPart[0].beginFill(0, 0);
        drawPart[0].lineStyle(0, 0, 0);
        // if(hRect > 0){
        //     drawPart[0].drawRect(xRect - 1, yRect, 5, hRect/2);
        //     drawPart[0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
        // }
        // else{
        //     drawPart[0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
        //     drawPart[0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
        // }
        if(wRect > 0){
            drawPart[0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
        }
        else{
            drawPart[0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
        }
        drawPart[0].endFill();
        drawPart[0].line_delete_button.interactive = true;
        drawPart[0].line_delete_button.buttonMode = true;
        drawPart[0].interactive = true;
        drawPart[0].buttonMode = true;
        drawPart[0].father.parent.parent.addChild(drawPart[0]);
        drawPart[0].on('mouseover', BioBLESS.logic.line_delete_button_create)
                   .on('mouseout', BioBLESS.logic.line_delete_button_remove)
                   .on('click', BioBLESS.logic.line_wait_for_key);
    };

    BioBLESS.logic.add_gate(thing);
    var dad = temp_elements_length;
    var mom;
    for(i = 1; i < thing.poi.length -2; i++){
        for(j = 0; j < thing.poi[i].length; j++){
            for(k = 0; k < thing.poi[i][j].output[0].to_dev_index.length; k++){
                for(mom = 0; mom < BioBLESS.logic.elements.length; mom++){
                    if(BioBLESS.logic.mark[mom] === thing.poi[i][j].output[0].to_dev_index[k]){
                        break;
                    }
                    if(thing.poi[i][j].output[0].to_dev_index[k] === (thing.devs.length - 1)){
                        mom = null;
                        break;
                    }
                }
                if(mom !== null && mom !== BioBLESS.logic.elements.length){
                    if(thing.poi[i][j].output[0].to_dev_input_index[k] === 0){
                        BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].output, BioBLESS.logic.elements[mom].input_1);
                    }
                    else{
                        BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].output, BioBLESS.logic.elements[mom].input_2);
                    }
                }
            }
            dad++;    
        }
    }
    for(i = 0; i < thing.poi[0].length; i++){
        if(thing.poi[0][i].output[0].to_dev_index.length > 1){
            for(j = 0; j < thing.poi[0][i].output[0].to_dev_index.length -1; j++){
                for(k = 0; k < BioBLESS.logic.elements.length; k++){
                    if(BioBLESS.logic.mark[k] === thing.poi[0][i].output[0].to_dev_index[j]){
                        dad = k;
                    }
                    if(BioBLESS.logic.mark[k] === thing.poi[0][i].output[0].to_dev_index[j + 1]){
                        mom = k;
                    }
                }
                if(thing.poi[0][i].output[0].to_dev_input_index[j] === 0 && thing.poi[0][i].output[0].to_dev_input_index[j + 1] === 0){
                    BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].input_1, BioBLESS.logic.elements[mom].input_1);
                }
                else if(thing.poi[0][i].output[0].to_dev_input_index[j] === 1 && thing.poi[0][i].output[0].to_dev_input_index[j + 1] === 0){
                    BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].input_2, BioBLESS.logic.elements[mom].input_1);
                }
                else if(thing.poi[0][i].output[0].to_dev_input_index[j] === 0 && thing.poi[0][i].output[0].to_dev_input_index[j + 1] === 1){
                    BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].input_1, BioBLESS.logic.elements[mom].input_2);
                }
                else{
                    BioBLESS.logic.add_line(BioBLESS.logic.elements[dad].input_2, BioBLESS.logic.elements[mom].input_2);
                }
            }
        }
    }
    for(i = 0; i < temp_mark.length; i++){
        BioBLESS.logic.mark[i] = temp_mark[i];
    }
};

/**
 * output_check is the function to check the number of circuits' output.
 * @function
 * @return {statement} boolean
 */
BioBLESS.logic.output_check = function() {
    var output_count = 0;
    var i;
    for(i = 0; i < BioBLESS.logic.elements.length; i++){
        if(BioBLESS.logic.elements[i].output.connection === false){
            output_count++;
        }
    }
    if(output_count === 1){
        /*Circuits operating normally.*/
        return true;
    }
    else if(output_count === 0){
        /*Error, no output in this circuits!*/
        return false;
    }
    else{
        /*Error, more than one output in this circuits!*/
        return false;
    }
};


BioBLESS.logic.redraw = function(){
    this.plusobj.position.x = BioBLESS.width - 150;
    this.plusobj.position.y = 50;
    this.stage.removeChild(this.right_stage);
    var h = BioBLESS.height - 200;
    if(h < 410)
        h = 410;
    this.right_stage = BioBLESS.logic.create_right_stage();
    this.right_stage.x = BioBLESS.width - 300;
    this.right_stage.y = 100;
    if(this.plusobj.added){
        this.stage.addChild(this.right_stage);
        this.stage.addChild(this.plusobj);
    }
};
/**
 * draw function works for renderng the whole homepage.<br>
 * @function
 * @param devices caused by users
 */
BioBLESS.logic.draw = function(devices){
    BioBLESS.logic.stage.movable_stage._scale = 1;
    var that = BioBLESS.logic;
    BioBLESS.logic.elements = [];
    /**
     * on_drag_end makes element to end draging
     * @function
     */
    BioBLESS.logic.on_drag_end = function() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        if(!(this.position.x + 75 >= BioBLESS.width - 220 && this.position.x + 75 <= BioBLESS.width - 20 && this.position.y >= 110 && this.position.y <= BioBLESS.height - 20)){
            BioBLESS.logic.elements[BioBLESS.logic.elements.length] = BioBLESS.logic.draw_gate(devices[this.Index]);
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.x = this.childPosition.x - 75;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.y = this.childPosition.y - 35;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].Index = this.Index;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.on('mousedown', that.on_drag_start_e)
                                                                                .on('touchstart', that.on_drag_start_e)
                                                                                .on('mouseup', that.on_drag_end_e)
                                                                                .on('mouseupoutside', that.on_drag_end_e)
                                                                                .on('touchend', that.on_drag_end_e)
                                                                                .on('touchendoutside', that.on_drag_end_e)
                                                                                .on('mousemove', that.on_drag_move_e)
                                                                                .on('touchmove', that.on_drag_move_e)
                                                                                .on('mouseover', that.gate_delete_buttonCreate)
                                                                                .on('mouseout', that.gate_delete_buttonDelete)
                                                                                .on('click', that.gate_wait_for_key);

            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.on('mousedown', that.on_draw_line_up)
                                                                              .on('touchstart', that.on_draw_line_up)
                                                                              .on('mousemove', that.on_draw_line_move)
                                                                              .on('touchmove', that.on_draw_line_move);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.on('mousedown', that.on_draw_line_up)
                                                                               .on('touchstart', that.on_draw_line_up)
                                                                               .on('mousemove', that.on_draw_line_move)
                                                                               .on('touchmove', that.on_draw_line_move);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.on('mousedown', that.on_draw_line_up)
                                                                               .on('touchstart', that.on_draw_line_up)
                                                                               .on('mousemove', that.on_draw_line_move)
                                                                               .on('touchmove', that.on_draw_line_move);

            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].gate_delete_button.buttonMode = true;
            BioBLESS.logic.circuit_add_gate(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].type, BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].title);
            that.stage.movable_stage.addChild(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1]);
        }
        this.position.x = this.startX;
        this.position.y = this.startY; 
    };

    that._logicGates = [];
    that.logicGates = [];
    for(var i = 0; i < devices.length; i++){
        that._logicGates[i] = BioBLESS.logic.draw_gate(devices[i]);
        that.logicGates[i] = BioBLESS.logic.draw_gate(devices[i]);
        that._logicGates[i].position.x = 120 * BioBLESS.navigation.scale.x + 140 + i * 180;
        that._logicGates[i].position.y = 30;
        that.logicGates[i].position.x = 120 * BioBLESS.navigation.scale.x + 140 + i * 180;
        that.logicGates[i].position.y = 30;
        that.logicGates[i].interactive = true;
        that.logicGates[i].buttonMode = true;
        that.logicGates[i].Index = i;
        that.logicGates[i].on('mousedown', that.on_drag_start)
            .on('touchstart', that.on_drag_start)
            .on('mouseup', that.on_drag_end)
            .on('mouseupoutside', that.on_drag_end)
            .on('touchend', that.on_drag_end)
            .on('touchendoutside', that.on_drag_end)
            .on('mousemove', that.on_drag_move)
            .on('touchmove', that.on_drag_move);
    }
    
    /**
     * plusobj is a button to show list
     * @type {PIXI.Graphics}
     */
    that.plusobj = new PIXI.Graphics();
    that.plusobj.beginFill(0x888888, 1);
    that.plusobj.drawCircle(0, 0, 30);
    that.plusobj.endFill();
    that.plusobj.lineStyle(3, 0x000000, 1);
    that.plusobj.moveTo(-15, 0);
    that.plusobj.lineTo(15, 0);
    that.plusobj.moveTo(0, -15);
    that.plusobj.lineTo(0, 15);
    that.plusobj.interactive = true;
    that.plusobj.buttonMode = true;
    that.plusobj.condition = 0;
    that.plusobj.position.x = BioBLESS.width - 150;
    that.plusobj.position.y = 50;
    var right_stage = BioBLESS.logic.create_right_stage();
    this.right_stage = right_stage;
    right_stage.x = BioBLESS.width - 300;
    right_stage.y = 100;
    that.plusobj.added = false;
    that.plusobj.on('mousedown', function() {
        if(this.added){
            BioBLESS.logic.stage.removeChild(BioBLESS.logic.right_stage);
            that.plusobj.condition = 0;
        }
        else{
            BioBLESS.logic.stage.addChild(BioBLESS.logic.right_stage);
            BioBLESS.logic.stage.addChild(that.plusobj);
            that.plusobj.condition = 1;
        }
        this.added = !this.added;
    });
    BioBLESS.logic.plusobj_animation = function(){
        if(Math.abs(BioBLESS.logic.plusobj.rotation - 0.7854 * BioBLESS.logic.plusobj.condition) > 0.01){
            BioBLESS.logic.plusobj.rotation -= (BioBLESS.logic.plusobj.rotation - 0.7854 * BioBLESS.logic.plusobj.condition) * 0.15;
        }
        else{
            BioBLESS.logic.plusobj.rotation = 0.7854 * BioBLESS.logic.plusobj.condition;
        }
    };        
    BioBLESS.add_animate_hook(BioBLESS.logic.plusobj_animation);
    
    //var abcd = this.create_base_stage_of_truth_table();
    //abcd.x = BioBLESS.width - 300;
    
    /*var contain = new PIXI.Container();
    var g = new PIXI.Graphics();
    g.lineStyle(2, 0x000000, 1);
    g.moveTo(10,10);
    g.lineTo(100, 990);
    contain.addChild(g);
    var scroll_area = BioBLESS.logic.create_scrollarea(contain, 1000, 200, 200);*/
    
    //scroll_area.change_position(400, 400);

    BioBLESS.logic.stage.addChild(BioBLESS.logic.stage.movable_stage);
    BioBLESS.logic.stage.addChild(that.plusobj);
    //BioBLESS.logic.stage.addChild(abcd);
    
    //BioBLESS.logic.stage.addChild(scroll_area);
    
           
    return BioBLESS.stage;
};
