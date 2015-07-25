var HomePage = function(){};
HomePage.GetDevices = function(){};
HomePage.DrawGate = function(icon){
	    var graphics = new PIXI.Graphics();
		switch(icon){
		    case "or":
			    graphics.lineStyle(3, 0x000000, 1);
	    		graphics.moveTo(0, 25);
			    graphics.lineTo(30, 25);
	    		graphics.moveTo(0, 45);
			    graphics.lineTo(30, 45);
	    		graphics.moveTo(120, 35);
			    graphics.lineTo(150, 35);
	    		graphics.beginFill(0, 0);
			    graphics.drawRect(30, 0, 90, 70);
			    graphics.endFill();
				break;
		}
		return graphics;
	};
HomePage.Draw = function(devices, w, h){
	    this.childStage = new PIXI.Container();
		var that = this;
		var elements = new Array();
		var waitForDoubleClick = false;
		


		onDragStart_e = function(event) {
			if(waitForDoubleClick){
				that.stage.removeChild(that.childStage);
				that.stage.removeChild(that.list);
				that.stage.removeChild(that.plusobj);
				for(var i = 0; i < that.logicGates.length; i++){
				    that.stage.removeChild(that._logicGates[i]);
					that.stage.removeChild(that.logicGates[i]);
				};
				that.backupStage = that.childStage;
				that.childStage = DevicesModule.Draw(devices, this.Index, w);
				that.stage.addChild(that.childStage);
				that.stage.addChild(that.backButton);
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
        onDragEnd_e = function() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
        };
        onDragMove_e = function() {
            if(this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x - 75;
                this.position.y = newPosition.y - 35;
            }
        };
			
			
	    onDragStart = function(event) {
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
			this.startX = this.position.x;
			this.startY = this.position.y;
        };
        onDragEnd = function() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
			if(!(this.position.x + 75 >= w - 220 && this.position.x + 75 <= w - 20 && this.position.y >= 110 && this.position.y <= h - 20)){
				elements[elements.length] = that.DrawGate(devices[this.Index].icon);
				elements[elements.length - 1].position.x = this.childPosition.x - 75;
				elements[elements.length - 1].position.y = this.childPosition.y - 35;
				elements[elements.length - 1].interactive = true;
                elements[elements.length - 1].buttonMode = true;
				elements[elements.length - 1].Index = this.Index;
				elements[elements.length - 1].on('mousedown', onDragStart_e)
                    .on('touchstart', onDragStart_e)
                    .on('mouseup', onDragEnd_e)
                    .on('mouseupoutside', onDragEnd_e)
                    .on('touchend', onDragEnd_e)
                    .on('touchendoutside', onDragEnd_e)
                    .on('mousemove', onDragMove_e)
                    .on('touchmove', onDragMove_e);
				that.childStage.addChild(elements[elements.length - 1]);
			};
			this.position.x = this.startX;
			this.position.y = this.startY;
			
			
        };
        onDragMove = function() {
            if(this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x - 75;
                this.position.y = newPosition.y - 35;
				this.childPosition = this.data.getLocalPosition(that.childStage);
            }
        };
		
		onDragStart_d = function(event) {
            this.data = event.data;
            this.dragging = true;
			var startPosition = this.data.getLocalPosition(this.parent);
			this.startX = startPosition.x;
			this.startY = startPosition.y;
			that.childStage.startX = that.childStage.position.x;
			that.childStage.startY = that.childStage.position.y;
        };
        onDragEnd_d = function() {
            this.dragging = false;
            this.data = null;
        };
        onDragMove_d = function(event) {
            if(this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                that.childStage.position.x = newPosition.x - this.startX + that.childStage.startX;
                that.childStage.position.y = newPosition.y - this.startY + that.childStage.startY;
            };
			that.childStage.inPosition = event.data.getLocalPosition(that.childStage);
        };
		
	    this.stage = new PIXI.Container();
		
		
		that._logicGates = new Array();
		that.logicGates = new Array();
		for(var i = 0; i < devices.length; i++){
		    that._logicGates[i] = this.DrawGate(devices[i].icon);
			that.logicGates[i] = this.DrawGate(devices[i].icon);
			that._logicGates[i].position.x = w - 195;
			that._logicGates[i].position.y = 140 + i * 100;
			that.logicGates[i].position.x = w - 195;
			that.logicGates[i].position.y = 140 + i * 100;
			that.logicGates[i].interactive = true;
            that.logicGates[i].buttonMode = true;
			that.logicGates[i].Index = i;
			that.logicGates[i].on('mousedown', onDragStart)
                .on('touchstart', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('mousemove', onDragMove)
                .on('touchmove', onDragMove);
		};
		
		
		
		var dragArea = new PIXI.Graphics();
		dragArea.beginFill(0, 0);
		dragArea.drawRect(0, 0, w, h);
		dragArea.interactive = true;
		dragArea.on('mousedown', onDragStart_d)
                .on('touchstart', onDragStart_d)
                .on('mouseup', onDragEnd_d)
                .on('mouseupoutside', onDragEnd_d)
                .on('touchend', onDragEnd_d)
                .on('touchendoutside', onDragEnd_d)
                .on('mousemove', onDragMove_d)
                .on('touchmove', onDragMove_d);
		
	
	
	
	
	
	    that.plusobj = new PIXI.Graphics();
        that.plusobj.beginFill(0x123456, 0.5);
        that.plusobj.drawCircle(w - 60, 50, 30);
        that.plusobj.endFill();
        that.plusobj.lineStyle(3, 0xffff00, 1);
        that.plusobj.moveTo(w - 75, 50);
        that.plusobj.lineTo(w - 45, 50);
        that.plusobj.moveTo(w - 60, 35);
        that.plusobj.lineTo(w - 60, 65);
        that.plusobj.interactive = true;
        that.plusobj.buttonMode = true;
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
				}else{
                    that.stage.addChild(that.list);
					for(var i = 0; i < devices.length; i++){
						that.stage.addChild(that._logicGates[i]);
						that.stage.addChild(that.logicGates[i]);
					};
				};
                added = !added;
            });
			
		that.backButton = new PIXI.Graphics();
        that.backButton.beginFill(0x123456, 0.5);
        that.backButton.drawCircle(w - 60, 50, 30);
        that.backButton.endFill();
        that.backButton.lineStyle(5, 0x00ff00, 1);
        that.backButton.moveTo(w - 73, 50);
        that.backButton.lineTo(w - 45, 50);
        that.backButton.moveTo(w - 75, 52);
        that.backButton.lineTo(w - 65, 42);
		that.backButton.moveTo(w - 75, 48);
        that.backButton.lineTo(w - 65, 58);
        that.backButton.interactive = true;
        that.backButton.buttonMode = true;
		that.backButton.on('mousedown', function(){
			that.stage.removeChild(that.backButton);
			that.stage.removeChild(that.childStage);
			that.childStage = that.backupStage;
			that.stage.addChild(that.childStage);
			that.stage.addChild(that.plusobj);
			if(added){
				that.stage.addChild(that.list);
				for(var i = 0; i < devices.length; i++){
					that.stage.addChild(that._logicGates[i]);
					that.stage.addChild(that.logicGates[i]);
				};
			};
		});
		
		
		this.stage.addChild(dragArea);
        this.stage.addChild(that.plusobj);
		this.stage.addChild(this.childStage);
	    return this.stage;
	};