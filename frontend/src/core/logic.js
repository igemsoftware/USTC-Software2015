﻿/**
 * This js works as BioBLESS.logic's drawing function
 * @author USTC-software frontend
 * @author needsay
 * @author Ubrok
 * @since 2015-8-12
 */
BioBLESS.logic.Circuit = {
    "nodes": [],
    "arcs": [],
    "mark": []
};

BioBLESS.logic.CircuitAddGate = function(type) {
    if(type === "not"){
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.nodes.length] = type;
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.nodes.length] = "INPUT";
        BioBLESS.logic.Circuit.arcs[BioBLESS.logic.Circuit.arcs.length] = {"from":BioBLESS.logic.Circuit.nodes.length - 1,"to":BioBLESS.logic.Circuit.nodes.length - 0};
        BioBLESS.logic.Circuit.mark[BioBLESS.logic.Circuit.mark.length] = BioBLESS.logic.Circuit.nodes.length - 1;
    }
    else{
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.nodes.length] = type;
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.nodes.length] = "INPUT";
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.nodes.length] = "INPUT";
        BioBLESS.logic.Circuit.arcs[BioBLESS.logic.Circuit.arcs.length] = {"from":BioBLESS.logic.Circuit.nodes.length - 2, "to":BioBLESS.logic.Circuit.nodes.length - 1};
        BioBLESS.logic.Circuit.arcs[BioBLESS.logic.Circuit.arcs.length] = {"from":BioBLESS.logic.Circuit.nodes.length - 2, "to":BioBLESS.logic.Circuit.nodes.length - 0};
        BioBLESS.logic.Circuit.mark[BioBLESS.logic.Circuit.mark.length] = BioBLESS.logic.Circuit.nodes.length - 2;
    }
};

BioBLESS.logic.CircuitAddLine = function(mama, papa) {
    var i,j;
    var m,d;
    for(var k = 0;k < BioBLESS.logic.elements.length;k++){
        if(mama.parent === BioBLESS.logic.elements[k]){
            i = k;
        }
        if(papa.parent === BioBLESS.logic.elements[k]){
        	j = k;
        }
    }
    if(mama === mama.parent.input_1){
        m = 1;
    }
    else if(mama === mama.parent.output){
        m = 0;
    }
    else{
        m = 2;
    }
    if(papa === papa.parent.input_1){
        d = 1;
    }
    else if(papa === papa.parent.output){
        d = 0;
    }
    else{
        d = 2;
    }
    if(m !== 0){
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[i] + m] = "0";
    }
    if(d !== 0){
        BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[j] + d] = "0";
    }
    if(m ===0){
        BioBLESS.logic.Circuit.arcs[BioBLESS.logic.Circuit.arcs.length] = {"from":BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[j]], "to":BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[i]]};
    }
    if(d === 0){
        BioBLESS.logic.Circuit.arcs[BioBLESS.logic.Circuit.arcs.length] = {"from":BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[i]], "to":BioBLESS.logic.Circuit.nodes[BioBLESS.logic.Circuit.mark[j]]};
    }

};
/**
 * DrawGate function works for preparing the svg of logicgate
 * @function
 * @param {device} caused by users
 * @return {element} PIXI.Graphics
 */

BioBLESS.logic.DrawGate = function(device){
    /**
     * element is a stage to draw the gate
     * @type {PIXI.Graphics}
     */
        var element = new PIXI.Container();
        element.graphics = new PIXI.Graphics();
        element.title = new PIXI.Text(device.id);
        element.input_1 = new PIXI.Graphics();
        element.input_1.Lines = [];
        element.input_1.counts = 0;
        element.input_1.Connection = false;
        element.input_2 = new PIXI.Graphics();
        element.input_2.Lines = [];
        element.input_2.counts = 0;
        element.input_2.Connection = false;
        element.output = new PIXI.Graphics();
        element.output.Lines = [];
        element.output.counts = 0;
        element.output.Connection = false;
        element.title.anchor.x = element.title.anchor.y = 0.5;
        element.title.position.x = 75;
        element.title.position.y = 35;
        element.type = device.icon;
        element.graphics.lineStyle(3, 0x000000, 1);
        element.graphics.beginFill(0, 0);
        element.graphics.drawRect(30, 0, 90, 70);
        element.graphics.endFill();

        element.output.beginFill(0x000000, 1);
        element.output.drawRect(0, 0, -30, 3);
        element.output.position.x = 150;
        element.output.position.y = 34;
        element.output.endFill();
        element.output.beginFill(0, 0);
        element.output.drawRect(-30, -1, 30, 5);
        element.output.endFill();
        switch(device.id){
            default: // For development use.
            case "XOR":
            case "AND":
            case "xor":
            case "and":
            case "or":
                element.input_1.beginFill(0x000000, 1);
                element.input_1.drawRect(0, 0, 30, 3);
                element.input_1.position.x = 0;
                element.input_1.position.y = 17;
                element.input_1.endFill();
                element.input_2.beginFill(0x000000, 1);
                element.input_2.drawRect(0, 0, 30, 3);
                element.input_2.position.x = 0;
                element.input_2.position.y = 51;
                element.input_2.endFill();
                break;
            case "NOT":
            case "not":
                element.input_1.beginFill(0x000000, 1);
                element.input_1.drawRect(0, 0, 30, 3);
                element.input_1.position.x = 0;
                element.input_1.position.y = 34;
                element.input_1.endFill();
                element.graphics.moveTo(135, 35);
                element.graphics.lineTo(120, 20);
                break;
            case "NAND":
            case "NOR":
            case "nor":
            case "XNOR":
            case "xnor":
                element.input_1.beginFill(0x000000, 1);
                element.input_1.drawRect(0, 0, 30, 3);
                element.input_1.position.x = 0;
                element.input_1.position.y = 17;
                element.input_1.endFill();
                element.input_2.beginFill(0x000000, 1);
                element.input_2.drawRect(0, 0, 30, 3);
                element.input_2.position.x = 0;
                element.input_2.position.y = 51;
                element.input_2.endFill();
                break;
        }
        element.addChild(element.graphics);
        element.addChild(element.input_1);
        element.addChild(element.input_2);
        element.addChild(element.output);
        element.addChild(element.title);
        return element;
    };

var waitForDoubleClick = false;
/**
 * onDragStart_e makes element to be move-available
 * @function
 * @param {event} cause by users
 */
BioBLESS.logic.onDragStart_e = function(event) {
    if(waitForDoubleClick){
        BioBLESS.gene_network.get_gates_supsification();
        var that = this;
        $.getJSON("misc/devices.json", function(data) {
            if(data && BioBLESS.gene_network.gates){
                BioBLESS.gene_network.draw(data, that.parent.Index);
                BioBLESS.change_stage(BioBLESS.gene_network);
            }
        });
        return;
    }else{
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
 * onDragMove_e makes element to keep draging and handles the lines
 * @function
 */
BioBLESS.logic.onDragMove_e = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        this.parent.position.x = newPosition.x - 75;
        this.parent.position.y = newPosition.y - 35;
        var xRect;
        var yRect;
        var wRect;
        var hRect;
        if(this.parent.input_1.Connection){
            for(var i = 0; i < this.parent.input_1.counts; i++){
                if(this.parent.input_1.Lines[i][0].father === this.parent.input_1){
                    xRect = this.parent.input_1.Lines[i][0].mother.position.x + this.parent.input_1.Lines[i][0].mother.parent.position.x;
                    yRect = this.parent.input_1.Lines[i][0].mother.position.y + this.parent.input_1.Lines[i][0].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.input_1.Lines[i][0].father.position.x + this.parent.input_1.Lines[i][0].father.parent.position.x;
                    yRect = this.parent.input_1.Lines[i][0].father.position.y + this.parent.input_1.Lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_1.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_1.position.y - yRect;
                this.parent.input_1.Lines[i][0].clear();
                this.parent.input_1.Lines[i][0].beginFill(0x000000, 1);
                this.parent.input_1.Lines[i][0].lineStyle(0, 0x000000, 1);
                this.parent.input_1.Lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.input_1.Lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_1.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_1.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.input_1.Lines[i][0].endFill();
                this.parent.input_1.Lines[i][0].lineStyle(3, 0x000000, 1);
                this.parent.input_1.Lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.input_1.Lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.Lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.Lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.input_1.Lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.input_1.Lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.input_1.Lines[i][0].beginFill(0, 0);
                this.parent.input_1.Lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.input_1.Lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.input_1.Lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.input_1.Lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.input_1.Lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.input_1.Lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.input_1.Lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.input_1.Lines[i][0].endFill();
            }
        }
        if(this.parent.input_2.Connection){
            for(var i = 0; i < this.parent.input_2.counts; i++){
                if(this.parent.input_2.Lines[i][0].father === this.parent.input_2){
                    xRect = this.parent.input_2.Lines[i][0].mother.position.x + this.parent.input_2.Lines[i][0].mother.parent.position.x;
                    yRect = this.parent.input_2.Lines[i][0].mother.position.y + this.parent.input_2.Lines[i][0].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.input_2.Lines[i][0].father.position.x + this.parent.input_2.Lines[i][0].father.parent.position.x;
                    yRect = this.parent.input_2.Lines[i][0].father.position.y + this.parent.input_2.Lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_2.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_2.position.y - yRect;
                this.parent.input_2.Lines[i][0].clear();
                this.parent.input_2.Lines[i][0].beginFill(0x000000, 1);
                this.parent.input_2.Lines[i][0].lineStyle(0, 0x000000, 1);
                this.parent.input_2.Lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.input_2.Lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_2.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.input_2.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.input_2.Lines[i][0].endFill();
                this.parent.input_2.Lines[i][0].lineStyle(3, 0x000000, 1);
                this.parent.input_2.Lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.input_2.Lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.Lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.Lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.input_2.Lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.input_2.Lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.input_2.Lines[i][0].beginFill(0, 0);
                this.parent.input_2.Lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.input_2.Lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.input_2.Lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.input_2.Lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.input_2.Lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.input_2.Lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.input_2.Lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.input_2.Lines[i][0].endFill();
            }
        }
        if(this.parent.output.Connection){
            for(var i = 0; i < this.parent.output.counts; i++){
                if(this.parent.output.Lines[i][0].father === this.parent.output){
                    xRect = this.parent.output.Lines[i][0].mother.position.x + this.parent.output.Lines[i][0].mother.parent.position.x;
                    yRect = this.parent.output.Lines[i][0].mother.position.y + this.parent.output.Lines[i][0].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.output.Lines[i][0].father.position.x + this.parent.output.Lines[i][0].father.parent.position.x;
                    yRect = this.parent.output.Lines[i][0].father.position.y + this.parent.output.Lines[i][0].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.output.position.x - xRect;
                hRect = this.parent.position.y + this.parent.output.position.y - yRect;
                this.parent.output.Lines[i][0].clear();
                this.parent.output.Lines[i][0].beginFill(0x000000, 1);
                this.parent.output.Lines[i][0].lineStyle(0, 0x000000, 1);
                this.parent.output.Lines[i][0].drawCircle(xRect, yRect + 1.5, 1.5);
                this.parent.output.Lines[i][0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.output.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
                this.parent.output.Lines[i][0].drawCircle(xRect + wRect, yRect + hRect, 1.5);
                this.parent.output.Lines[i][0].endFill();
                this.parent.output.Lines[i][0].lineStyle(3, 0x000000, 1);
                this.parent.output.Lines[i][0].moveTo(xRect, yRect + 1.5);
                this.parent.output.Lines[i][0].lineTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.output.Lines[i][0].moveTo(xRect, yRect + hRect/2 + 1.5);
                this.parent.output.Lines[i][0].lineTo(xRect + wRect, yRect + hRect/2 + 1.5);
                this.parent.output.Lines[i][0].moveTo(xRect + wRect, yRect + hRect/2);
                this.parent.output.Lines[i][0].lineTo(xRect + wRect, yRect + hRect + 1.5);
                this.parent.output.Lines[i][0].beginFill(0, 0);
                this.parent.output.Lines[i][0].lineStyle(0, 0, 0);
                // if(hRect > 0){
                //     this.parent.output.Lines[i][0].drawRect(xRect - 1, yRect, 5, hRect/2);
                //     this.parent.output.Lines[i][0].drawRect(xRect - 1 + wRect, yRect -1 + hRect/2, 5, hRect/2);
                // }
                // else{
                //     this.parent.output.Lines[i][0].drawRect(xRect - 1, yRect + hRect/2, 5, 0 - hRect/2);
                //     this.parent.output.Lines[i][0].drawRect(xRect - 1 + wRect, yRect + hRect, 5, 0 - hRect/2);
                // }
                if(wRect > 0){
                    this.parent.output.Lines[i][0].drawRect(xRect, yRect - 1 + hRect/2, wRect, 5);
                }
                else{
                    this.parent.output.Lines[i][0].drawRect(xRect + wRect, yRect - 1 + hRect/2, 0 - wRect, 5);
                }
                this.parent.output.Lines[i][0].endFill();
            }
        }
    }
};

/**
 * onDragEnd_e makes element to end draging
 * @function
 */
BioBLESS.logic.onDragEnd_e = function() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
};

var waitFordrawBegin = false;
var moving = false;
var drawPart;
/**
 * onDrawLineUp works for star andend of drawlines
 * @function
 * @param  event caused by users
 */
BioBLESS.logic.onDrawLineUp = function(event){
    waitFordrawBegin = !waitFordrawBegin;
    if(waitFordrawBegin){
        this.Lines[this.counts] = [];
        drawPart = this.Lines[this.counts];
        this.counts ++;
        this.Connection = true;
        moving = true;
        drawPart[0] = new PIXI.Graphics();
        drawPart[0].father = this;
    }
    else{
        moving = false;
        this.Connection = true;
        this.Lines[this.counts] = [];
        this.Lines[this.counts] = drawPart;
        this.counts ++;
        drawPart[0].mother = this;
        drawPart[0].on('mouseover', BioBLESS.logic.IsHerWorkCreate)
                   .on('mouseout', BioBLESS.logic.IsHerWorkDelete)
                   .on('click', BioBLESS.logic.IsHerWorkRight);
    }
};
/**
 * onDrawLineMove works for keeping drawing lines
 * @function
 * @param  event caused by users
 */
BioBLESS.logic.onDrawLineMove = function(event){
    if(moving){
            var xRect = drawPart[0].father.position.x + drawPart[0].father.parent.position.x;
            var yRect = drawPart[0].father.position.y + drawPart[0].father.parent.position.y;
            var newPosition =  event.data.getLocalPosition(this.parent.parent);
            var wRect = newPosition.x - xRect;
            var hRect = newPosition.y - yRect;
            drawPart[0].IsHerWork = new PIXI.Graphics();
            drawPart[0].IsHerWork.father = drawPart[0];
            drawPart[0].clear();
            drawPart[0].beginFill(0x000000, 1);
            drawPart[0].lineStyle(0, 0x000000, 1);
            drawPart[0].drawCircle(xRect, yRect + 1.5, 1.5);
            drawPart[0].drawCircle(xRect, yRect + hRect/2 + 1.5, 1.5);
            drawPart[0].drawCircle(xRect + wRect, yRect + hRect/2 + 1.5, 1.5);
            drawPart[0].endFill();
            drawPart[0].lineStyle(3, 0x000000, 1);
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
            drawPart[0].interactive = true;
            drawPart[0].IsHerWork.interactive = true;
            drawPart[0].IsHerWork.buttonMode = true;
            drawPart[0].father.parent.parent.addChild(drawPart[0]);
    }
};

/**
 * IsHerWorkCreate means to create a button on its line
 * @function
 * @param {event} mouseover the line
 */
BioBLESS.logic.IsHerWorkCreate = function(event) {
    var xRect = this.father.parent.position.x + this.father.position.x;
    var yRect = this.father.parent.position.y + this.father.position.y;
    var wRect = this.mother.parent.position.x + this.mother.position.y - xRect;
    var hRect = this.mother.parent.position.y + this.mother.position.y - yRect;
    this.IsHerWork.clear();
    this.IsHerWork.position.x = xRect + wRect/2;
    this.IsHerWork.position.y = yRect + hRect/2;
    this.IsHerWork.beginFill(0x345678, 0.3);
    this.IsHerWork.drawCircle(0, 0, 20);
    this.IsHerWork.lineStyle(4, 0xffff00, 0.3);
    this.IsHerWork.moveTo(-8, 0);
    this.IsHerWork.lineTo(8, 0);
    this.IsHerWork.endFill();
    this.IsHerWork.on('mouseover', BioBLESS.logic.IsHerWorkUP);
                  // .on('click', BioBLESS.logic.IsHerWorkRight)
                  // .on('mouseout', BioBLESS.logic.IsHerWorKDOWN);
    this.father.parent.parent.addChild(this.IsHerWork);
};

/**
 * IsHerWorkRight is the function to delete itself as well as the button
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.IsHerWorkRight = function(event) {
    this.father.parent.parent.removeChild(this);
    this.father.parent.parent.removeChild(this.IsHerWork);
};

/**
 * Just Kidding
 * @function
 * @param {event} caused by users
 */
BioBLESS.logic.IsHerWorkUP = function(event) {
    this.father.father.parent.parent.addChild(this.father);
    this.father.buttonMode = true;
};

// BioBLESS.logic.IsHerWorkDown = function() {
//     SHEisWorking = false;
//     this.father.father.parent.parent.removeChild(this);
// };

BioBLESS.logic.IsHerWorkDelete = function() {
        this.father.parent.parent.removeChild(this.IsHerWork);
};

/**
 * onDragStart makes element could be dragged from list
 * @function
 */
BioBLESS.logic.onDragStart = function(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.startX = this.position.x;
    this.startY = this.position.y;
};
/**
 * onDragMove makes element to move
 * @function
 */
BioBLESS.logic.onDragMove = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - 75;
        this.position.y = newPosition.y - 35;
        this.childPosition = this.data.getLocalPosition(BioBLESS.logic.stage.movable_stage);
    }
};
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
		var t = (y - this.start_y) / (this.end_y - this.start_y)
		this.contain.y = 0 - t * (this.contain_h - this.area_h);
    }
};
BioBLESS.logic.on_drag_e = function(){
	this.alpha = 1;
    this.dragging = false;
    this.data = null;
};
BioBLESS.logic.create_scrollarea = function(contain, contain_h, w, h){
	var stage = new PIXI.Container();
	var bg = new PIXI.Graphics();
	bg.lineStyle(2, 0x000000, 1);
	bg.beginFill(0x888888, 1);
	bg.drawRect(0, 0, w, h);
	bg.endFill();
	stage.addChild(bg);
	var mask = new PIXI.Graphics();
	mask.beginFill(0, 0);
	mask.drawRect(0, 0, w, h);
	mask.endFill();
	mask.is_out = true;
	contain.mask = mask;
	
	
	stage.addChild(contain);
	stage.addChild(mask);
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
	var on_mouse_over = function(){
		if(this.is_out){
			this.is_out = false;
			this.back_up = BioBLESS.scroll_function;
			if(this.contain === undefined){
			    BioBLESS.scroll_function = function(){};
			}else{
				var that = this;
				BioBLESS.scroll_function = function(d){
					if(d < 0){
						that.contain.y -= 50;
						if(that.contain.y < that.button.area_h - that.button.contain_h){
							that.contain.y = that.button.area_h - that.button.contain_h;
						}
					}else{
						that.contain.y += 50;
						if(that.contain.y > 0){
							that.contain.y = 0;
						}
					}
					var t = (0 - that.contain.y) / (that.button.contain_h - that.button.area_h);
					that.button.y = that.button.start_y + t * (that.button.end_y - that.button.start_y);
				};
			}
		}
	};
	var on_mouse_out = function(){
		if(this.is_out === false){
			this.is_out = true;
			BioBLESS.scroll_function = this.back_up;
		}
	};
	mask.on("mouseover", on_mouse_over);
	mask.on("mouseout", on_mouse_out);
	return stage;
};

BioBLESS.logic.create_abcd = function(){
	var stage = new PIXI.Container();
	var bg = new PIXI.Graphics();
	bg.beginFill(0x333333, 1);
	bg.drawRect(0, 0, 300, BioBLESS.height);
	bg.endFill();
	stage.addChild(bg);
	var title = new PIXI.Text("Input Num:");
	title.style.fill = "white";
	title.y = 43;
	title.x = 25;
	stage.addChild(title);
	var buttons = [];
	var button_function = function(){
		var contain = new PIXI.Container();
		var num = [];
		var row = 1;
		var i, j = 2, k;
		var dis = 170 / (this.n + 1);
		this.button = []
		for(i = 0; i < this.n; i++)
		    row *= 2;
		for(k = 0; k < row; k++){
			var t = k;
			for(i = 0; i < this.n; i++){
				num[this.n - 1 - i] = t % j;
				t -= num[this.n - 1 - i];
				t /= 2;
			}
			for(i = 0; i < this.n; i++){
				var button = BioBLESS.logic.create_textbutton(num[i].toString(), 40, 40, 0x000000);
				button.scale.x = 27 / 40;
				button.scale.y = 27 / 40;
				button.x = dis + i * dis - 5;
				button.y = 20 + 40 * k;
				contain.addChild(button);
			};
			this.button[k] = []
			this.button[k][0] = BioBLESS.logic.create_textbutton("0", 40, 40, 0x000000);
			this.button[k][1] = BioBLESS.logic.create_textbutton("1", 40, 40, 0x000000);
			this.button[k][0].scale.x = 27 / 40;
			this.button[k][0].scale.y = 27 / 40;
			this.button[k][0].x = 14 + 6 * 28;
			this.button[k][0].y = 20 + 40 * k;
			this.button[k][1].scale.x = 27 / 40;
			this.button[k][1].scale.y = 27 / 40;
			this.button[k][1].x = 14 + 7 * 28;
			this.button[k][1].y = 20 + 40 * k;
			contain.addChild(this.button[k][0]);
			contain.addChild(this.button[k][1]);
		}
		var scroll_area = BioBLESS.logic.create_scrollarea(contain, (row + 1) * 40, 260, BioBLESS.height - 280);
		scroll_area.x = 20;
		scroll_area.y = 200;
		if(this.parent.scroll_area){
			this.parent.removeChild(this.parent.scroll_area);
			this.parent.scroll_area.destroy(true);
		}
		this.parent.addChild(scroll_area);
		this.parent.scroll_area = scroll_area;
		var OK = BioBLESS.logic.create_textbutton("OK", 100, 40, 0x000000);
		OK.x = 100;
		OK.y = BioBLESS.height - 60;
		this.parent.addChild(OK);
	}
	for(var i = 0; i < 5; i++){
	    buttons[i] = this.create_textbutton((i + 1).toString(), 48, 48, 0x000000);
		buttons[i].n = i + 1;
		buttons[i].y = 100;
		buttons[i].x = 26 + i * 50;
		stage.addChild(buttons[i]);
		buttons[i].interactive = true;
		buttons[i].buttonMode = true;
		var n = i;
		buttons[i].on("click", button_function);
	};
	return stage;
	
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
     * onDragEnd makes element to end draging
     * @function
     */
    BioBLESS.logic.onDragEnd = function() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        if(!(this.position.x + 75 >= BioBLESS.width - 220 && this.position.x + 75 <= BioBLESS.width - 20 && this.position.y >= 110 && this.position.y <= BioBLESS.height - 20)){
            BioBLESS.logic.elements[BioBLESS.logic.elements.length] = BioBLESS.logic.DrawGate(devices[this.Index]);
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.x = this.childPosition.x - 75;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].position.y = this.childPosition.y - 35;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].Index = this.Index;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].graphics.on('mousedown', that.onDragStart_e)
                                                                                .on('touchstart', that.onDragStart_e)
                                                                                .on('mouseup', that.onDragEnd_e)
                                                                                .on('mouseupoutside', that.onDragEnd_e)
                                                                                .on('touchend', that.onDragEnd_e)
                                                                                .on('touchendoutside', that.onDragEnd_e)
                                                                                .on('mousemove', that.onDragMove_e)
                                                                                .on('touchmove', that.onDragMove_e);

            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].output.on('mousedown', that.onDrawLineUp)
                                                                              .on('touchstart', that.onDrawLineUp)
                                                                              .on('mousemove', that.onDrawLineMove)
                                                                              .on('touchmove', that.onDrawLineMove);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_2.on('mousedown', that.onDrawLineUp)
                                                                               .on('touchstart', that.onDrawLineUp)
                                                                               .on('mousemove', that.onDrawLineMove)
                                                                               .on('touchmove', that.onDrawLineMove);
                
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.interactive = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.buttonMode = true;
            BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1].input_1.on('mousedown', that.onDrawLineUp)
                                                                               .on('touchstart', that.onDrawLineUp)
                                                                               .on('mousemove', that.onDrawLineMove)
                                                                               .on('touchmove', that.onDrawLineMove);
            that.stage.movable_stage.addChild(BioBLESS.logic.elements[BioBLESS.logic.elements.length - 1]);
        }
        this.position.x = this.startX;
        this.position.y = this.startY; 
    };

    that._logicGates = [];
    that.logicGates = [];
    for(var i = 0; i < devices.length; i++){
        that._logicGates[i] = BioBLESS.logic.DrawGate(devices[i]);
        that.logicGates[i] = BioBLESS.logic.DrawGate(devices[i]);
        that._logicGates[i].position.x = 120 * BioBLESS.navigation.scale.x + 140 + i * 180;
        that._logicGates[i].position.y = 30;
        that.logicGates[i].position.x = 120 * BioBLESS.navigation.scale.x + 140 + i * 180;
        that.logicGates[i].position.y = 30;
        that.logicGates[i].interactive = true;
        that.logicGates[i].buttonMode = true;
        that.logicGates[i].Index = i;
        that.logicGates[i].on('mousedown', that.onDragStart)
            .on('touchstart', that.onDragStart)
            .on('mouseup', that.onDragEnd)
            .on('mouseupoutside', that.onDragEnd)
            .on('touchend', that.onDragEnd)
            .on('touchendoutside', that.onDragEnd)
            .on('mousemove', that.onDragMove)
            .on('touchmove', that.onDragMove);
    }
    /**
     * plusobj is a button to show list
     * @type {PIXI.Graphics}
     */
    that.plusobj = new PIXI.Graphics();
	that.plusobj.beginFill(0x345678, 1);
    that.plusobj.drawCircle(0, 0, 30);
    that.plusobj.endFill();
    that.plusobj.lineStyle(3, 0xffff00, 1);
    that.plusobj.moveTo(-15, 0);
    that.plusobj.lineTo(15, 0);
    that.plusobj.moveTo(0, -15);
    that.plusobj.lineTo(0, 15);
    that.plusobj.interactive = true;
    that.plusobj.buttonMode = true;
    that.plusobj.condition = 0;
    that.plusobj.position.x = 120 * BioBLESS.navigation.scale.x + 60;
    that.plusobj.position.y = 50;
    /**
     * list is a exhibition to show logicgates  
     * @type {PIXI.Graphics}
     */
    that.list = new PIXI.Graphics();
    that.list.beginFill(0x897897, 0.5);
    that.list.drawRoundedRect(120 * BioBLESS.navigation.scale.x + 120, 10, BioBLESS.width - 120 * BioBLESS.navigation.scale.x - 460, 115, 20);
    that.list.endFill();
    var added = false;
    that.plusobj.on('mousedown', function() {
        if(added){
            that.stage.removeChild(that.list);
			for(var i = 0; i < devices.length; i++){
                that.stage.removeChild(that._logicGates[i]);
                that.stage.removeChild(that.logicGates[i]);
            };
            that.plusobj.condition = 0;
        }
        else{
            that.stage.addChild(that.list);
            for(var i = 0; i < devices.length; i++){
            	that.stage.addChild(that._logicGates[i]);
            	that.stage.addChild(that.logicGates[i]);
            }
            that.plusobj.condition = 1;
		}
        added = !added;
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
	
	var abcd = this.create_abcd();
	abcd.x = BioBLESS.width - 300;
	
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
	BioBLESS.logic.stage.addChild(abcd);
	
	//BioBLESS.logic.stage.addChild(scroll_area);
	
        
    return BioBLESS.stage;
};