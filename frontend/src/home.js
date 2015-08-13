/**
 * This js works as BioBLESS.home's drawing function
 * @auther USTC-software frontend
 * @auther needsay
 * @aythor ubrok.h
 * @since 2015-8-12
 */
BioBLESS.home = {};
/** 
 * @description {PIXI.Container} the stage of the home page
 */ 
BioBLESS.home.stage = new PIXI.Container();
/** 
 * @description {PIXI.Container} the movable stage
 */ 
BioBLESS.home.stage.movable_stage = new PIXI.Container();
/** 
 * @description {Num} used for controling stage scale in scale animation
 */ 
BioBLESS.home.stage.movable_stage._scale = 1;
/**
 * DrawGate function works for preparing the svg of logicgate
 * @function
 * @param {device} caused by users
 * @return {element} PIXI.Graphics
 */

BioBLESS.home.DrawGate = function(device){
    /**
     * element is a stage to draw the gate
     * @type {PIXI.Graphics}
     */
        var element = new PIXI.Container();
        element.graphics = new PIXI.Graphics();
        element.title = new PIXI.Text(device.name);
        element.input_1 = new PIXI.Graphics();
        element.input_1.Lines = [];
        element.input_1.Connection = false;
        element.input_2 = new PIXI.Graphics();
        element.input_2.Lines = [];
        element.input_2.Connection = false;
        element.output = new PIXI.Graphics();
        element.output.Lines = [];
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
        switch(device.icon){
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
            default:
                alert("Error - 1001!");
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
BioBLESS.home.onDragStart_e = function(event) {
    if(waitForDoubleClick){
        var a=$.getJSON("/misc/devices.json");
        var that = this;
        var next = function() {
            if(a.responseJSON){
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
BioBLESS.home.onDragMove_e = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        this.parent.position.x = newPosition.x - 75;
        this.parent.position.y = newPosition.y - 35;
    	var xRect;
    	var yRect;
    	var wRect;
    	var hRect;
        if(this.parent.input_1.Connection){
            for(var i = 0; i < this.parent.input_1.Lines.length; i++){
                if(this.parent.input_1.Lines[i].father === this.parent.input_1){
                    xRect = this.parent.input_1.Lines[i].mother.position.x + this.parent.input_1.Lines[i].mother.parent.position.x;
                    yRect = this.parent.input_1.Lines[i].mother.position.y + this.parent.input_1.Lines[i].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.input_1.Lines[i].father.position.x + this.parent.input_1.Lines[i].father.parent.position.x;
                    yRect = this.parent.input_1.Lines[i].father.position.y + this.parent.input_1.Lines[i].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_1.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_1.position.y - yRect;
                this.parent.input_1.Lines[i].clear();
                this.parent.input_1.Lines[i].beginFill(0x000000, 1);
                this.parent.input_1.Lines[i].drawRect(xRect, yRect, 3, hRect/2);
                this.parent.input_1.Lines[i].drawRect(xRect, yRect + hRect/2, wRect, 3);
                this.parent.input_1.Lines[i].drawRect(xRect + wRect, yRect + hRect/2, 3, hRect/2);
                this.parent.input_1.Lines[i].endFill();
            }
        }
        if(this.parent.input_2.Connection){
            for(var i = 0; i < this.parent.input_2.Lines.length; i++){
                if(this.parent.input_2.Lines[i].father === this.parent.input_2){
                    xRect = this.parent.input_2.Lines[i].mother.position.x + this.parent.input_2.Lines[i].mother.parent.position.x;
                    yRect = this.parent.input_2.Lines[i].mother.position.y + this.parent.input_2.Lines[i].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.input_2.Lines[i].father.position.x + this.parent.input_2.Lines[i].father.parent.position.x;
                    yRect = this.parent.input_2.Lines[i].father.position.y + this.parent.input_2.Lines[i].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.input_2.position.x - xRect;
                hRect = this.parent.position.y + this.parent.input_2.position.y - yRect;
                this.parent.input_2.Lines[i].clear();
                this.parent.input_2.Lines[i].beginFill(0x000000, 1);
                this.parent.input_2.Lines[i].drawRect(xRect, yRect, 3, hRect/2);
                this.parent.input_2.Lines[i].drawRect(xRect, yRect + hRect/2, wRect, 3);
                this.parent.input_2.Lines[i].drawRect(xRect + wRect, yRect + hRect/2, 3, hRect/2);
                this.parent.input_2.Lines[i].endFill();
            }
        }
        if(this.parent.output.Connection){
            for(var i = 0; i < this.parent.output.Lines.length; i++){
                if(this.parent.output.Lines[i].father === this.parent.output){
                    xRect = this.parent.output.Lines[i].mother.position.x + this.parent.output.Lines[i].mother.parent.position.x;
                    yRect = this.parent.output.Lines[i].mother.position.y + this.parent.output.Lines[i].mother.parent.position.y;
                }
                else{
                    xRect = this.parent.output.Lines[i].father.position.x + this.parent.output.Lines[i].father.parent.position.x;
                    yRect = this.parent.output.Lines[i].father.position.y + this.parent.output.Lines[i].father.parent.position.y; 
                }
                wRect = this.parent.position.x + this.parent.output.position.x - xRect;
                hRect = this.parent.position.y + this.parent.output.position.y - yRect;
                this.parent.output.Lines[i].clear();
                this.parent.output.Lines[i].beginFill(0x000000, 1);
                this.parent.output.Lines[i].drawRect(xRect, yRect, 3, hRect/2);
                this.parent.output.Lines[i].drawRect(xRect, yRect + hRect/2, wRect, 3);
                this.parent.output.Lines[i].drawRect(xRect + wRect, yRect + hRect/2, 3, hRect/2);
                this.parent.output.Lines[i].endFill();
            }
        }
    }
};

/**
 * onDragEnd_e makes element to end draging
 * @function
 */
BioBLESS.home.onDragEnd_e = function() {
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
BioBLESS.home.onDrawLineUp = function(event){
    waitFordrawBegin = !waitFordrawBegin;
    if(waitFordrawBegin){
        drawPart = this.Lines;
        this.Connection = true;
        moving = true;
        drawPart[drawPart.length] = new PIXI.Graphics();
        drawPart[drawPart.length - 1].father = this;
    }
    else{
        moving = false;
        this.Connection = true;
        this.Lines = drawPart;
        drawPart[drawPart.length - 1].mother = this;
    }
};
/**
 * onDrawLineMove works for keeping drawing lines
 * @function
 * @param  event caused by users
 */
BioBLESS.home.onDrawLineMove = function(event){
    if(moving){
            var xRect = drawPart[drawPart.length - 1].father.position.x + drawPart[drawPart.length - 1].father.parent.position.x;
            var yRect = drawPart[drawPart.length - 1].father.position.y + drawPart[drawPart.length - 1].father.parent.position.y;
            var newPosition =  event.data.getLocalPosition(this.parent.parent);
            var wRect = newPosition.x - xRect;
            var hRect = newPosition.y - yRect;
            drawPart[drawPart.length - 1].clear();
            drawPart[drawPart.length - 1].beginFill(0x000000, 1);
            drawPart[drawPart.length - 1].drawRect(xRect, yRect, 3, hRect/2);
            drawPart[drawPart.length - 1].drawRect(xRect, yRect + hRect/2, wRect, 3);
            drawPart[drawPart.length - 1].drawRect(xRect + wRect, yRect + hRect/2, 3, hRect/2);
            drawPart[drawPart.length - 1].endFill();
            drawPart[drawPart.length - 1].father.parent.parent.addChild(drawPart[drawPart.length - 1]);
    }
};

/**
 * onDragStart makes element could be dragged from list
 * @function
 */
BioBLESS.home.onDragStart = function(event) {
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
BioBLESS.home.onDragMove = function() {
    if(this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - 75;
        this.position.y = newPosition.y - 35;
        this.childPosition = this.data.getLocalPosition(BioBLESS.home.stage.movable_stage);
    }
};

/**
 * draw function works for renderng the whole homepage.<br>
 * @function
 * @param devices caused by users
 * @return BioBLESS.stage PIXI.Container
 */
BioBLESS.home.draw = function(devices){
    BioBLESS.home.stage.movable_stage._scale = 1;
    var w = BioBLESS.width;
    var h = BioBLESS.height;
    var that = BioBLESS.home;
    BioBLESS.home.elements = [];
    /**
     * onDragEnd makes element to end draging
     * @function
     */
	BioBLESS.home.onDragEnd = function() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        if(!(this.position.x + 75 >= BioBLESS.width - 220 && this.position.x + 75 <= BioBLESS.width - 20 && this.position.y >= 110 && this.position.y <= h - 20)){
            BioBLESS.home.elements[BioBLESS.home.elements.length] = BioBLESS.home.DrawGate(devices[this.Index]);
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].position.x = this.childPosition.x - 75;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].position.y = this.childPosition.y - 35;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].graphics.interactive = true;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].graphics.buttonMode = true;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].Index = this.Index;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].graphics.on('mousedown', that.onDragStart_e)
                    .on('touchstart', that.onDragStart_e)
                    .on('mouseup', that.onDragEnd_e)
                    .on('mouseupoutside', that.onDragEnd_e)
                    .on('touchend', that.onDragEnd_e)
                    .on('touchendoutside', that.onDragEnd_e)
                    .on('mousemove', that.onDragMove_e)
                    .on('touchmove', that.onDragMove_e);

            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].output.interactive = true;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].output.buttonMode = true;
            BioBLESS.home.elements[BioBLESS.home.elements.length - 1].output.on('mousedown', that.onDrawLineUp)
    	        .on('touchstart', that.onDrawLineUp)
    	        .on('mousemove', that.onDrawLineMove)
    	        .on('touchmove', that.onDrawLineMove);
                
			BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_2.interactive = true;
			BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_2.buttonMode = true;
			BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_2.on('mousedown', that.onDrawLineUp)
			    .on('touchstart', that.onDrawLineUp)
			    .on('mousemove', that.onDrawLineMove)
			    .on('touchmove', that.onDrawLineMove);
                
        	BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_1.interactive = true;
        	BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_1.buttonMode = true;
        	BioBLESS.home.elements[BioBLESS.home.elements.length - 1].input_1.on('mousedown', that.onDrawLineUp)
        	    .on('touchstart', that.onDrawLineUp)
        	    .on('mousemove', that.onDrawLineMove)
        	    .on('touchmove', that.onDrawLineMove);
            that.stage.movable_stage.addChild(BioBLESS.home.elements[BioBLESS.home.elements.length - 1]);
    	}
    	this.position.x = this.startX;
    	this.position.y = this.startY; 
	};
    that._logicGates = [];
    that.logicGates = [];
    for(var i = 0; i < devices.length; i++){
        that._logicGates[i] = BioBLESS.home.DrawGate(devices[i]);
        that.logicGates[i] = BioBLESS.home.DrawGate(devices[i]);
        that._logicGates[i].position.x = w - 195;
        that._logicGates[i].position.y = 140 + i * 100;
        that.logicGates[i].position.x = w - 195;
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
    that.plusobj.beginFill(0x123456, 0.5);
    that.plusobj.drawCircle(w - 60, 50, 30);
    that.plusobj.beginFill(0x345678, 1);
    that.plusobj.drawCircle(0, 0, 30);
    that.plusobj.endFill();
    that.plusobj.lineStyle(3, 0xffff00, 1);
    that.plusobj.moveTo(w - 75, 50);
    that.plusobj.lineTo(w - 45, 50);
    that.plusobj.moveTo(w - 60, 35);
    that.plusobj.lineTo(w - 60, 65);
    that.plusobj.moveTo(-15, 0);
    that.plusobj.lineTo(15, 0);
    that.plusobj.moveTo(0, -15);
    that.plusobj.lineTo(0, 15);
    that.plusobj.interactive = true;
    that.plusobj.buttonMode = true;
    that.plusobj.condition = 0;
    that.plusobj.position.x = w - 60;
    that.plusobj.position.y = 50;
    /**
     * list is a exhibition to show logicgates  
     * @type {PIXI.Graphics}
     */
    that.list = new PIXI.Graphics();
    that.list.beginFill(0x897897, 0.5);
    that.list.drawRoundedRect(w - 220, 110, 200, h - 130, 20);
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
    BioBLESS.animation[BioBLESS.animation.length] = function(){
        if(Math.abs(BioBLESS.home.plusobj.rotation - 0.7854 * BioBLESS.home.plusobj.condition) > 0.01){
            BioBLESS.home.plusobj.rotation -= (BioBLESS.home.plusobj.rotation - 0.7854 * BioBLESS.home.plusobj.condition) * 0.15;
        }
        else{
            BioBLESS.home.plusobj.rotation = 0.7854 * BioBLESS.home.plusobj.condition;
        }
    };              
    BioBLESS.home.stage.addChild(BioBLESS.home.stage.movable_stage);
    BioBLESS.home.stage.addChild(that.plusobj);
        
    return BioBLESS.stage;
};
var a=$.getJSON("../misc/devices.json");
setTimeout(function(){BioBLESS.home.draw(a.responseJSON);},1000);
            
        
        