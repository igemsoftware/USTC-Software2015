BioBLESS.plugins = ["home", "device", "simulator"];
BioBLESS.init = function() {
    BioBLESS.width = $('body').width();
    BioBLESS.height = $('body').height();
    BioBLESS.stage = new PIXI.Container();
    
    var renderer = PIXI.autoDetectRenderer(BioBLESS.width, BioBLESS.height, {antialias : true, backgroundColor : 0xabcdef});
    if(!renderer)
        return;
    document.body.appendChild(renderer.view);
    var prev_time = 0;
    var fps = 0;
    var render = requestAnimationFrame;
    var animate = function(now) {
        renderer.render(BioBLESS.stage);
        fps = Math.floor(1000 / (now - prev_time));
        prev_time = now;
        for(var i = 0; i < BioBLESS.animation.length; i++)
            BioBLESS.animation[i]();
        render(animate);
    };
    render(animate);
    var next = function() {
        if(BioBLESS.home){
            BioBLESS.stage.addChild(BioBLESS.home.stage);
            BioBLESS.plugin_stage = BioBLESS.home.stage;
        }else
            setTimeout(next, 50);
    };
    setInterval(function() {
        var fps_obj = new PIXI.Text("FPS: " + fps);
        fps_obj.x = 150;
        fps_obj.y = 30;
        BioBLESS.stage.removeChild(BioBLESS.stage.fps);
        BioBLESS.stage.fps = fps_obj;
        BioBLESS.stage.addChild(fps_obj);
    }, 1000);
    setTimeout(next, 1);
    
    onDragStart_d = function(event) {
        if(!BioBLESS.get_current_plugin_stage())
            return;
        this.data = event.data;
        this.dragging = true;
        var startPosition = this.data.getLocalPosition(this.parent);
        this.startX = startPosition.x;
        this.startY = startPosition.y;
        BioBLESS.get_current_plugin_stage().movable_stage.startX = BioBLESS.get_current_plugin_stage().movable_stage.position.x;
        BioBLESS.get_current_plugin_stage().movable_stage.startY = BioBLESS.get_current_plugin_stage().movable_stage.position.y;
    };
    onDragEnd_d = function() {
        this.dragging = false;
        this.data = null;
    };
    onDragMove_d = function(event) {
        if(!BioBLESS.get_current_plugin_stage())
            return;
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            BioBLESS.get_current_plugin_stage().movable_stage.position.x = newPosition.x - this.startX + BioBLESS.get_current_plugin_stage().movable_stage.startX;
            BioBLESS.get_current_plugin_stage().movable_stage.position.y = newPosition.y - this.startY + BioBLESS.get_current_plugin_stage().movable_stage.startY;
        };
        BioBLESS.get_current_plugin_stage().movable_stage.inPosition = event.data.getLocalPosition(BioBLESS.get_current_plugin_stage().movable_stage);
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
    BioBLESS.stage.addChild(dragArea);
    
    var scrollFunc=function(e){
        var d = 0;
        //var x = 1;
        e = e || window.event;
        
        if(e.wheelDelta){//IE/Opera/Chrome
            d = e.wheelDelta;
        }else if(e.detail){//Firefox
            d = e.detail;
        };

        if(BioBLESS.get_current_plugin_stage() == null)
            return;
        if(d > 0){
            if(BioBLESS.get_current_plugin_stage().movable_stage._scale > 3)
                return;
            BioBLESS.get_current_plugin_stage().movable_stage._scale *= 1.1;
        
        }else{
            if(BioBLESS.get_current_plugin_stage().movable_stage._scale < 0.1)
                return;
            BioBLESS.get_current_plugin_stage().movable_stage._scale /= 1.1;
        }
    }
    /*注册事件*/
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//W3C
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
    
    BioBLESS.prepare_navigation();
    BioBLESS.stage.addChild(BioBLESS.navigation);
    BioBLESS.stage.addChild(BioBLESS.navigation_title);
};
