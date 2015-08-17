/**
 * This js works as BioBLESS.logic's drawing function
 * @author USTC-software frontend
 * @author needsay
 * @author Ubrok
 * @since 2015-8-12
 */
/** 
 * @description {PIXI.Container} the stage of the home page
 */ 
BioBLESS.logic.stage = new PIXI.Container();
/** 
 * @description {PIXI.Container} the movable stage
 */ 
BioBLESS.logic.stage.movable_stage = new PIXI.Container();
/** 
 * @description {Num} used for controling stage scale in scale animation
 */ 
BioBLESS.logic.stage.movable_stage._scale = 1;
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
                element.input_1.beginFill(0x000000, 1); ;
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
        var a=$.getJSON("misc/devices.json");
        BioBLESS.device.get_gates_supsification();
        var that = this;
        var next = function() {
            if(a.responseJSON && BioBLESS.device.gates.responseJSON){
                BioBLESS.device.draw(a.responseJSON, that.parent.Index);
                BioBLESS.change_stage(BioBLESS.device);
            }else
                setTimeout(next, 50);
        };
        setTimeout(next, 50);
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
        if(!(this.position.x + 75 >= BioBLESS.width - 220 && this.position.x + 75 <= BioBLESS.width - 20 && this.position.y >= 110 && this.position.y <= h - 20)){
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
        that._logicGates[i].position.x = BioBLESS.width - 195;
        that._logicGates[i].position.y = 140 + i * 100;
        that.logicGates[i].position.x = BioBLESS.width - 195;
        that.logicGates[i].position.y = 140 + i * 100;
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
    that.plusobj.moveTo(BioBLESS.width - 75, 50);
    that.plusobj.lineTo(BioBLESS.width - 45, 50);
    that.plusobj.moveTo(BioBLESS.width - 60, 35);
    that.plusobj.lineTo(BioBLESS.width - 60, 65);
    that.plusobj.moveTo(-15, 0);
    that.plusobj.lineTo(15, 0);
    that.plusobj.moveTo(0, -15);
    that.plusobj.lineTo(0, 15);
    that.plusobj.interactive = true;
    that.plusobj.buttonMode = true;
    that.plusobj.condition = 0;
    that.plusobj.position.x = BioBLESS.width - 60;
    that.plusobj.position.y = 50;
    /**
     * list is a exhibition to show logicgates  
     * @type {PIXI.Graphics}
     */
    that.list = new PIXI.Graphics();
    that.list.beginFill(0x897897, 0.5);
    that.list.drawRoundedRect(BioBLESS.width - 220, 110, 200, BioBLESS.height - 130, 20);
    that.list.endFill();
    var added = false;
    that.plusobj.on('mousedown', function() {
        if(added){
            that.stage.removeChild(that.list);
            for(var i = 0; i < devices.length; i++) {
                that.stage.removeChild(that._logicGates[i]);
                that.stage.removeChild(that.logicGates[i]);
            };
            that.plusobj.condition = 0;
        } else {
            that.stage.addChild(that.list);
            for(var i = 0; i < devices.length; i++) {
                that.stage.addChild(that._logicGates[i]);
                that.stage.addChild(that.logicGates[i]);
            }
            that.plusobj.condition = 1;
        }
        added = !added;
    });
    BioBLESS.add_animate_hook(function(){
        if(Math.abs(BioBLESS.logic.plusobj.rotation - 0.7854 * BioBLESS.logic.plusobj.condition) > 0.01){
            BioBLESS.logic.plusobj.rotation -= (BioBLESS.logic.plusobj.rotation - 0.7854 * BioBLESS.logic.plusobj.condition) * 0.15;
        }
        else{
            BioBLESS.logic.plusobj.rotation = 0.7854 * BioBLESS.logic.plusobj.condition;
        }
    });
    BioBLESS.logic.stage.addChild(BioBLESS.logic.stage.movable_stage);
    BioBLESS.logic.stage.addChild(that.plusobj);
};
$.getJSON("misc/devices.json", function(data) {BioBLESS.logic.draw(data);});
