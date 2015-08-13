this.stage = new PIXI.Container();
this.stage.movable_stage = new PIXI.Container();
this.stage.movable_stage._scale = 1;
this.DrawGate = function(device){
		var element = new PIXI.Container();
		element.graphics = new PIXI.Graphics();
		element.title = new PIXI.Text(device.name);
		element.input_1 = new PIXI.Graphics();
		element.input_1.Lines = {};
		element.input_1.Connection = false;
		element.input_2 = new PIXI.Graphics();
		element.input_2.Lines = {};
		element.input_2.Connection = false;
		element.output = new PIXI.Graphics();
		element.output.Lines = {};
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
		switch(device.icon){
			case "XOR":
			case "AND":
		    case "OR":
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
			case "XNOR":
			case "nand":
			case "nor":
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

this.draw = function(devices){
	    this.stage.movable_stage._scale = 1;
        var w = PLUMB.width;
        var h = PLUMB.height;
		var that = this;
		var elements = new Array();
		var waitForDoubleClick = false;

		
		that.onDragStart_e = function(event) {
			if(waitForDoubleClick){
				var a=$.getJSON("/misc/devices.json");
				var that = this;
				var next = function() {
                    if(a.responseJSON){
                        PLUMB.device.draw(a.responseJSON, that.parent.Index);
						PLUMB.change_stage(PLUMB.device);
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
			};
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        };
        that.onDragEnd_e = function() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
        };
        that.onDragMove_e = function() {
            if(this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent.parent);
                this.parent.position.x = newPosition.x - 75;
                this.parent.position.y = newPosition.y - 35;
            
            	if(this.parent.input_1.Connection){
            		if(this.parent.input_1.Lines[0].father === this.parent.input_1){
	    			    var xRect = this.parent.input_1.Lines[0].mother.position.x + this.parent.input_1.Lines[0].mother.parent.position.x;
	                    var yRect = this.parent.input_1.Lines[0].mother.position.y + this.parent.input_1.Lines[0].mother.parent.position.y;
	    			}
	    			else{
	    			    var xRect = this.parent.input_1.Lines[0].father.position.x + this.parent.input_1.Lines[0].father.parent.position.x;
	                    var yRect = this.parent.input_1.Lines[0].father.position.y + this.parent.input_1.Lines[0].father.parent.position.y;	
	    			}
	    			var wRect = this.parent.position.x + this.parent.input_1.position.x - xRect;
	    	        var hRect = this.parent.position.y + this.parent.input_1.position.y - yRect;
	    			this.parent.input_1.Lines[0].clear();
            		this.parent.input_1.Lines[0].beginFill(0x000000, 1);
	    			this.parent.input_1.Lines[0].drawRect(xRect, yRect, wRect/2, 3);
	    			this.parent.input_1.Lines[0].drawRect(xRect + wRect/2, yRect, 3, hRect);
	    			this.parent.input_1.Lines[0].drawRect(xRect + wRect/2, yRect + hRect, wRect/2, 3);
	    			this.parent.input_1.Lines[0].endFill();
                }
                if(this.parent.input_2.Connection){
            		if(this.parent.input_2.Lines[0].father === this.parent.input_2){
	    			    var xRect = this.parent.input_2.Lines[0].mother.position.x + this.parent.input_2.Lines[0].mother.parent.position.x;
	                    var yRect = this.parent.input_2.Lines[0].mother.position.y + this.parent.input_2.Lines[0].mother.parent.position.y;
	    			}
	    			else{
	    			    var xRect = this.parent.input_2.Lines[0].father.position.x + this.parent.input_2.Lines[0].father.parent.position.x;
	                    var yRect = this.parent.input_2.Lines[0].father.position.y + this.parent.input_2.Lines[0].father.parent.position.y;	
	    			}
	    			var wRect = this.parent.position.x + this.parent.input_2.position.x - xRect;
	    	        var hRect = this.parent.position.y + this.parent.input_2.position.y - yRect;
	    			this.parent.input_2.Lines[0].clear();
            		this.parent.input_2.Lines[0].beginFill(0x000000, 1);
	    			this.parent.input_2.Lines[0].drawRect(xRect, yRect, wRect/2, 3);
	    			this.parent.input_2.Lines[0].drawRect(xRect + wRect/2, yRect, 3, hRect);
	    			this.parent.input_2.Lines[0].drawRect(xRect + wRect/2, yRect + hRect, wRect/2, 3);
	    			this.parent.input_2.Lines[0].endFill();
            	}
            	if(this.parent.output.Connection){
            		if(this.parent.ouput.Lines[0].father === this.parent.ouput){
	    			    var xRect = this.parent.ouput.Lines[0].mother.position.x + this.parent.ouput.Lines[0].mother.parent.position.x;
	                    var yRect = this.parent.ouput.Lines[0].mother.position.y + this.parent.ouput.Lines[0].mother.parent.position.y;
	    			}
	    			else{
	    			    var xRect = this.parent.ouput.Lines[0].father.position.x + this.parent.ouput.Lines[0].father.parent.position.x;
	                    var yRect = this.parent.ouput.Lines[0].father.position.y + this.parent.ouput.Lines[0].father.parent.position.y;	
	    			}
	    			var wRect = this.parent.position.x + this.parent.ouput.position.x - xRect;
	    	        var hRect = this.parent.position.y + this.parent.ouput.position.y - yRect;
	    			this.parent.output.Lines[0].clear();
            		this.parent.output.Lines[0].beginFill(0x000000, 1);
	    			this.parent.output.Lines[0].drawRect(xRect, yRect, wRect/2, 3);
	    			this.parent.output.Lines[0].drawRect(xRect + wRect/2, yRect, 3, hRect);
	    			this.parent.output.Lines[0].drawRect(xRect + wRect/2, yRect + hRect, wRect/2, 3);
	    			this.parent.output.Lines[0].endFill();
            	}
			}
        };
			
		var waitFordrawBegin = false;
		var moving = false;
		var drawPart;
	    that.onDrawLineUp = function(event){
	    	waitFordrawBegin = !waitFordrawBegin;
	    	if(waitFordrawBegin){
	    		drawPart = this.Lines;
	    		this.Connection = true;
	    		moving = true;
	    		drawPart[0] = new PIXI.Graphics();
				drawPart[0].father = this;
	    	}
	    	else{
	    		moving = false;
	    		this.Connection = true;
	    		this.Lines = drawPart;
				drawPart[0].mother = this;
				drawPart[0].mother.wRect = 0 - drawPart[0].father.wRect;
				drawPart[0].mother.hRect = 0 - drawPart[0].father.hRect;
	    	}
	    };

	    that.onDrawLineMove = function(event){
	    	if(moving){
	    			var xRect = drawPart[0].father.position.x + drawPart[0].father.parent.position.x;
	    			var yRect = drawPart[0].father.position.y + drawPart[0].father.parent.position.y;
	    			var newPosition =  event.data.getLocalPosition(this.parent.parent);
	    			var wRect = newPosition.x - xRect;
	    			var hRect = newPosition.y - yRect;
					drawPart[0].father.wRect = wRect;
					drawPart[0].father.hRect = hRect;
	    			drawPart[0].clear();
					drawPart[0].beginFill(0x000000, 1);
	    			drawPart[0].drawRect(xRect, yRect, wRect/2, 3);
	    			drawPart[0].drawRect(xRect + wRect/2, yRect, 3, hRect);
	    			drawPart[0].drawRect(xRect + wRect/2, yRect + hRect, wRect/2, -3);
	    			drawPart[0].endFill;
					drawPart[0].father.parent.parent.addChild(drawPart[0]);
	    	}
	    };
			
	    that.onDragStart = function(event) {
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
			this.startX = this.position.x;
			this.startY = this.position.y;
        };
        that.onDragEnd = function() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
			if(!(this.position.x + 75 >= w - 220 && this.position.x + 75 <= w - 20 && this.position.y >= 110 && this.position.y <= h - 20)){
                elements[elements.length] = that.DrawGate(devices[this.Index]);
        		elements[elements.length - 1].position.x = this.childPosition.x - 75;
	    		elements[elements.length - 1].position.y = this.childPosition.y - 35;
	    		elements[elements.length - 1].graphics.interactive = true;
                elements[elements.length - 1].graphics.buttonMode = true;
				elements[elements.length - 1].Index = this.Index;
				elements[elements.length - 1].graphics.on('mousedown', that.onDragStart_e)
                    .on('touchstart', that.onDragStart_e)
                    .on('mouseup', that.onDragEnd_e)
                    .on('mouseupoutside', that.onDragEnd_e)
                    .on('touchend', that.onDragEnd_e)
                    .on('touchendoutside', that.onDragEnd_e)
                    .on('mousemove', that.onDragMove_e)
                    .on('touchmove', that.onDragMove_e);
                elements[elements.length - 1].output.interactive = true;
                elements[elements.length - 1].output.buttonMode = true;
               	elements[elements.length - 1].output.on('mousedown', that.onDrawLineUp)
               		.on('touchstart', that.onDrawLineUp)
           	        .on('mousemove', that.onDrawLineMove)
                    .on('touchmove', that.onDrawLineMove);
                
                elements[elements.length - 1].input_2.interactive = true;
                elements[elements.length - 1].input_2.buttonMode = true;
               	elements[elements.length - 1].input_2.on('mousedown', that.onDrawLineUp)
               		.on('touchstart', that.onDrawLineUp)
           	        .on('mousemove', that.onDrawLineMove)
                    .on('touchmove', that.onDrawLineMove);
                
                elements[elements.length - 1].input_1.interactive = true;
                elements[elements.length - 1].input_1.buttonMode = true;
               	elements[elements.length - 1].input_1.on('mousedown', that.onDrawLineUp)
               		.on('touchstart', that.onDrawLineUp)
           	        .on('mousemove', that.onDrawLineMove)
                    .on('touchmove', that.onDrawLineMove);
				that.stage.movable_stage.addChild(elements[elements.length - 1]);
			};
			this.position.x = this.startX;
			this.position.y = this.startY;			
        };
        that.onDragMove = function() {
            if(this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x - 75;
                this.position.y = newPosition.y - 35;
				this.childPosition = this.data.getLocalPosition(that.stage.movable_stage);
            }
        };
		
		
		that._logicGates = new Array();
		that.logicGates = new Array();
		for(var i = 0; i < devices.length; i++){
		    that._logicGates[i] = this.DrawGate(devices[i]);
			that.logicGates[i] = this.DrawGate(devices[i]);
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
		};
		
	
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
		that.plusobj.position.x = w - 60;
		that.plusobj.position.y = 50;
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
					};
					that.plusobj.condition = 1;
				}
                added = !added;
            });
		PLUMB.animation[PLUMB.animation.length] = function(){
			if(Math.abs(PLUMB.home.plusobj.rotation - 0.7854 * PLUMB.home.plusobj.condition) > 0.01){
				PLUMB.home.plusobj.rotation -= (PLUMB.home.plusobj.rotation - 0.7854 * PLUMB.home.plusobj.condition) * 0.15;
			}else{
				PLUMB.home.plusobj.rotation = 0.7854 * PLUMB.home.plusobj.condition;
			};
		};		
		
		this.stage.addChild(this.stage.movable_stage);
        this.stage.addChild(that.plusobj);
		
	    return this.stage};
var a=$.getJSON("/misc/devices.json");
setTimeout(function(){PLUMB.home.draw(a.responseJSON)},500);
