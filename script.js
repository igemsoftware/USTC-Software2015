window.PLUMB = {'plugins' : ['home', 'device', 'simulator']};
PLUMB.get_current_plugin_stage = function() {
    if(PLUMB.stage.children.length == 2)
        return PLUMB.stage.children[1];
    return null;
}
PLUMB.animation = new Array();
PLUMB.animation[0] = function(){
	if(PLUMB.get_current_plugin_stage() != null){
	    if(Math.abs(PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) > 0.001){
			PLUMB.get_current_plugin_stage().movable_stage.position.x += (PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25 * PLUMB.get_current_plugin_stage().movable_stage.inPosition.x;
			PLUMB.get_current_plugin_stage().movable_stage.position.y += (PLUMB.get_current_plugin_stage().movable_stage.scale.y - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25 * PLUMB.get_current_plugin_stage().movable_stage.inPosition.y;
			PLUMB.get_current_plugin_stage().movable_stage.scale.x -= (PLUMB.get_current_plugin_stage().movable_stage.scale.x - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25;
            PLUMB.get_current_plugin_stage().movable_stage.scale.y -= (PLUMB.get_current_plugin_stage().movable_stage.scale.y - PLUMB.get_current_plugin_stage().movable_stage._scale) * 0.25;
	    }else
		    PLUMB.get_current_plugin_stage().movable_stage.scale.x = PLUMB.get_current_plugin_stage().movable_stage.scale.y = PLUMB.get_current_plugin_stage().movable_stage._scale;
	};
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
        if(PLUMB.home)
            PLUMB.stage.addChild(PLUMB.home.stage);
        else
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
};

PLUMB.change_stage = function(plugin) {
    var child_stage = PLUMB.get_current_plugin_stage();
    if(!child_stage)
        return;
    PLUMB.stage.removeChild(child_stage);
    PLUMB.stage.addChild(plugin.stage);
};
