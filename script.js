window.PLUMB = {'plugins' : ['home', 'device', 'simulator']};
PLUMB.get_current_plugin_stage = function() {
    return PLUMB.plugin_stage;
}
PLUMB.animation = new Array();
PLUMB.animation[PLUMB.animation.length] = function(){
	if(PLUMB.get_current_plugin_stage() != null){
	    if(Math.abs(PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) > 0.001){
			if(PLUMB.get_current_plugin_stage().movable_stage.inPosition == null){
				PLUMB.get_current_plugin_stage().movable_stage.inPosition = function(){};
				PLUMB.get_current_plugin_stage().movable_stage.inPosition.x = PLUMB.width / 2;
				PLUMB.get_current_plugin_stage().movable_stage.inPosition.y = PLUMB.height / 2;
			};
			PLUMB.get_current_plugin_stage().movable_stage.position.x += (PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25 * PLUMB.get_current_plugin_stage().movable_stage.inPosition.x;
			PLUMB.get_current_plugin_stage().movable_stage.position.y += (PLUMB.get_current_plugin_stage().movable_stage.scale.y - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25 * PLUMB.get_current_plugin_stage().movable_stage.inPosition.y;
			PLUMB.get_current_plugin_stage().movable_stage.scale.x -= (PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25;
            PLUMB.get_current_plugin_stage().movable_stage.scale.y -= (PLUMB.get_current_plugin_stage().movable_stage.scale.y - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25;
	    }else
		    PLUMB.get_current_plugin_stage().movable_stage.scale.x = PLUMB.get_current_plugin_stage().movable_stage.scale.y = PLUMB.get_current_plugin_stage().movable_stage._scale;
	};
};
PLUMB.prepare_navigation = function(){
	PLUMB.navigation = new PIXI.Container();
	PLUMB.navigation.condition = 0;
	PLUMB.navigation.h = 120 * PLUMB.plugins.length + 160;
	PLUMB.navigation.w = 120;
	var background = new PIXI.Graphics();
	background.beginFill(0x000000, 1);
	background.lineStyle(0);
	background.drawRect(0, 0, this.navigation.w, this.navigation.h);
	background.endFill();
	background.lineStyle(3, 0xffffff, 1);
	PLUMB.navigation.button = new Array();
	for(var i = 1; i < PLUMB.plugins.length + 1; i++){
		var j = i - 1;
		PLUMB.navigation.button[j] = new PIXI.Graphics();
		
		PLUMB.navigation.button[j].lineStyle(3, 0xffffff, 1);
		PLUMB.navigation.button[j].beginFill(0, 0);
		PLUMB.navigation.button[j].drawCircle(60, 60 + i * 120, 50);
		PLUMB.navigation.button[j].endFill();
		PLUMB.navigation.button[j].title = new PIXI.Text(PLUMB.plugins[j], {fill: "#ffffff"});
		PLUMB.navigation.button[j].title.anchor.x = 0.5;
		PLUMB.navigation.button[j].title.anchor.y = 0.5;
		if(PLUMB.plugins[j].length > 7){
			PLUMB.navigation.button[j].title.scale.x *= 7 / PLUMB.plugins[j].length;
			PLUMB.navigation.button[j].title.scale.y *= 7 / PLUMB.plugins[j].length;
		};
		PLUMB.navigation.button[j].title.position.x = 60;
		PLUMB.navigation.button[j].title.position.y = 60 + i * 120;
		PLUMB.navigation.button[j].t = PLUMB.plugins[j];
		PLUMB.navigation.button[j].on('mousedown', function(){
			    PLUMB.change_stage(PLUMB[this.t]);
		    });
	};
	
	PLUMB.navigation.down = new PIXI.Graphics();
	PLUMB.navigation.down.interactive = true;
	PLUMB.navigation.down.buttonMode = true;
	PLUMB.navigation.up = new PIXI.Graphics();
	PLUMB.navigation.up.interactive = false;
	PLUMB.navigation.up.buttonMode = false;
	PLUMB.navigation.up.alpha = 0;
	PLUMB.navigation.down.lineStyle(0);
	PLUMB.navigation.up.lineStyle(0);
	PLUMB.navigation.down.beginFill(0xffffff);
	PLUMB.navigation.down.moveTo(40, this.navigation.h - 30);
	PLUMB.navigation.down.lineTo(80, this.navigation.h - 30);
	PLUMB.navigation.down.lineTo(60, this.navigation.h - 10);
	PLUMB.navigation.down.endFill();
	PLUMB.navigation.up.beginFill(0xffffff);
	PLUMB.navigation.up.moveTo(40, this.navigation.h - 10);
	PLUMB.navigation.up.lineTo(80, this.navigation.h - 10);
	PLUMB.navigation.up.lineTo(60, this.navigation.h - 30);
	PLUMB.navigation.up.endFill();
	var that = PLUMB;
	PLUMB.navigation.down.on('mousedown',function(){
		    if(PLUMB.navigation.condition == 0){
				PLUMB.navigation.down.interactive = false;
	            PLUMB.navigation.down.buttonMode = false;
				PLUMB.navigation.up.interactive = true;
	            PLUMB.navigation.up.buttonMode = true;
				PLUMB.navigation.condition = -1;
				for(var j = 0; j < PLUMB.navigation.button.length; j++){
					PLUMB.navigation.button[j].interactive = true;
		            PLUMB.navigation.button[j].buttonMode = true;
				};
			};
	    });
	PLUMB.navigation.up.on('mousedown',function(){
		    if(PLUMB.navigation.condition == 0){
				PLUMB.navigation.down.interactive = true;
	            PLUMB.navigation.down.buttonMode = true;
				PLUMB.navigation.up.interactive = false;
	            PLUMB.navigation.up.buttonMode = false;
				PLUMB.navigation.condition = 1;
				for(var j = 0; j < PLUMB.navigation.button.length; j++){
					PLUMB.navigation.button[j].interactive = false;
		            PLUMB.navigation.button[j].buttonMode = false;
				};
			};
	    });
	PLUMB.animation[PLUMB.animation.length] = function(){
		if(PLUMB.navigation.condition == 1){
			if(Math.abs(PLUMB.navigation.position.y - PLUMB.navigation.start_y) > 1){
				PLUMB.navigation.position.y -= (PLUMB.navigation.position.y - PLUMB.navigation.start_y) * 0.15;
				PLUMB.navigation.up.alpha *= 0.85;
				PLUMB.navigation.down.alpha = 1 - PLUMB.navigation.up.alpha;
			}else{
				PLUMB.navigation.position.y = PLUMB.navigation.start_y;
				PLUMB.navigation.condition = 0;
				PLUMB.navigation.down.alpha = 1;
				PLUMB.navigation.up.alpha = 0;
				
			};
		}else if(PLUMB.navigation.condition == -1){
			if(Math.abs(PLUMB.navigation.position.y) > 1){
				PLUMB.navigation.position.y *= 0.85;
				PLUMB.navigation.down.alpha *= 0.85;
				PLUMB.navigation.up.alpha = 1 - PLUMB.navigation.down.alpha;
			}else{
				PLUMB.navigation.position.y = 0;
				PLUMB.navigation.condition = 0;
				PLUMB.navigation.down.alpha = 0;
				PLUMB.navigation.up.alpha = 1;
				
			};
		};
	};
	
	
	
	
	this.navigation.addChild(background);
	this.navigation.addChild(this.navigation.up);
	this.navigation.addChild(this.navigation.down);
	for(var i = 0; i < PLUMB.navigation.button.length; i++){
		this.navigation.addChild(PLUMB.navigation.button[i]);
		this.navigation.addChild(PLUMB.navigation.button[i].title);
	};
	this.navigation.position.y -= this.navigation.h - 160;
	this.navigation.start_y = this.navigation.position.y;
	
	this.navigation_title = new PIXI.Container();
	var background2 = new PIXI.Graphics();
	background2.beginFill(0x000000, 1);
	background2.lineStyle(0);
	background2.drawRect(0, 0, 120, 120);
	background2.endFill();
	background2.lineStyle(3, 0xffffff, 1);
	background2.drawCircle(60, 60, 50);
	var title = new PIXI.Text('PLUMB', {fill: "#ffffff"});
	title.position.y = 45;
	title.position.x = 13;
	this.navigation_title.addChild(background2);
	this.navigation_title.addChild(title);
};
PLUMB.init = function() {
    PLUMB.width = $('body').width();
    PLUMB.height = $('body').height() - $('nav').height();
    PLUMB.home = null;
    PLUMB.stage = new PIXI.Container();
	
    var canvas = document.getElementById('canvas');
    var renderer = PIXI.autoDetectRenderer(PLUMB.width, PLUMB.height, {view : canvas, antialias : true, backgroundColor : 0xabcdef});
    if(!renderer)
        return;
    var get_display_name = function(s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    };
    for(var i = 0; i < PLUMB.plugins.length; i++) {
        var plugin_name = PLUMB.plugins[i];
        var display_name = get_display_name(plugin_name);
        $('#plugins').append('<li id="' + plugin_name + '">' + display_name + '</li>');
        eval('var callback = function(data) {PLUMB.' + plugin_name + ' = eval("new function() {" + data + "}");$("#' + plugin_name + '").on("click", function() {PLUMB.change_stage(PLUMB.' + plugin_name + ')});}');
        $.get('plugins/' + plugin_name + '.js', callback);
    };
    var prev_time = 0;
    var fps = 0;
    var render = requestAnimationFrame;
    var animate = function(now) {
        renderer.render(PLUMB.stage);
        fps = Math.floor(1000 / (now - prev_time));
        prev_time = now;
		for(var i = 0; i < PLUMB.animation.length; i++)
		    PLUMB.animation[i]();
        render(animate);
    };
    render(animate);
    var next = function() {
        if(PLUMB.home){
            PLUMB.stage.addChild(PLUMB.home.stage);
			PLUMB.plugin_stage = PLUMB.home.stage;
		}else
            setTimeout(next, 50);
    };
    setInterval(function() {$('#fps').html('FPS: ' + fps);}, 1000);
    setTimeout(next, 1);
	
	
	onDragStart_d = function(event) {
		if(!PLUMB.get_current_plugin_stage())
		    return;
        this.data = event.data;
        this.dragging = true;
		var startPosition = this.data.getLocalPosition(this.parent);
		this.startX = startPosition.x;
		this.startY = startPosition.y;
		PLUMB.get_current_plugin_stage().movable_stage.startX = PLUMB.get_current_plugin_stage().movable_stage.position.x;
		PLUMB.get_current_plugin_stage().movable_stage.startY = PLUMB.get_current_plugin_stage().movable_stage.position.y;
    };
    onDragEnd_d = function() {
        this.dragging = false;
        this.data = null;
    };
    onDragMove_d = function(event) {
		if(!PLUMB.get_current_plugin_stage())
		    return;
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            PLUMB.get_current_plugin_stage().movable_stage.position.x = newPosition.x - this.startX + PLUMB.get_current_plugin_stage().movable_stage.startX;
            PLUMB.get_current_plugin_stage().movable_stage.position.y = newPosition.y - this.startY + PLUMB.get_current_plugin_stage().movable_stage.startY;
        };
    	PLUMB.get_current_plugin_stage().movable_stage.inPosition = event.data.getLocalPosition(PLUMB.get_current_plugin_stage().movable_stage);
    };
	var dragArea = new PIXI.Graphics();
		dragArea.beginFill(0, 0);
		dragArea.drawRect(0, 0, 65536, 65536);
		dragArea.interactive = true;
		dragArea.on('mousedown', onDragStart_d)
                .on('touchstart', onDragStart_d)
                .on('mouseup', onDragEnd_d)
                .on('mouseupoutside', onDragEnd_d)
                .on('touchend', onDragEnd_d)
                .on('touchendoutside', onDragEnd_d)
                .on('mousemove', onDragMove_d)
                .on('touchmove', onDragMove_d);
	PLUMB.stage.addChild(dragArea);
	
    var scrollFunc=function(e){
        var d = 0;
		//var x = 1;
        e = e || window.event;
        
        if(e.wheelDelta){//IE/Opera/Chrome
            d = e.wheelDelta;
        }else if(e.detail){//Firefox
            d = e.detail;
        };

		if(PLUMB.get_current_plugin_stage() == null)
		    return;
		if(d > 0){
	        if(PLUMB.get_current_plugin_stage().movable_stage._scale > 3)
	            return;
		    PLUMB.get_current_plugin_stage().movable_stage._scale *= 1.1;
		
		}else{
			if(PLUMB.get_current_plugin_stage().movable_stage._scale < 0.1)
                return;
			PLUMB.get_current_plugin_stage().movable_stage._scale /= 1.1;
		}
    }
    /*注册事件*/
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//W3C
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
	
	PLUMB.prepare_navigation();
	PLUMB.stage.addChild(PLUMB.navigation);
	PLUMB.stage.addChild(PLUMB.navigation_title);
};

PLUMB.change_stage = function(plugin) {
    var child_stage = PLUMB.get_current_plugin_stage();
    if(!child_stage)
        return;
    PLUMB.stage.removeChild(child_stage);
    PLUMB.stage.addChild(plugin.stage);
	PLUMB.stage.addChild(PLUMB.navigation);
	PLUMB.stage.addChild(PLUMB.navigation_title);
	PLUMB.plugin_stage = plugin.stage;
};
