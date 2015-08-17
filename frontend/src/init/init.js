BioBLESS.init = function() {
    BioBLESS.width = $('body').width();
    BioBLESS.height = $('body').height();
    var renderer = PIXI.autoDetectRenderer(BioBLESS.width, BioBLESS.height, {antialias : true, backgroundColor : 0xabcdef});
    if(!renderer)
        return;
    document.body.appendChild(renderer.view);
    BioBLESS.base_stage = new PIXI.Container();
    var prev_time = 0;
    var fps = 0;
    var render = requestAnimationFrame;
    var animate = function(now) {
        for(var i in BioBLESS.animate_hook)
            BioBLESS.animate_hook[i]();
        renderer.render(BioBLESS.base_stage);
        fps = Math.floor(1000 / (now - prev_time));
        prev_time = now;
        render(animate);
    };
    render(animate);
    setTimeout(function(){BioBLESS.base_stage.addChild(BioBLESS.logic.stage);}, 1);
    BioBLESS.stage = BioBLESS.logic.stage;
    BioBLESS.base_stage.fps = new PIXI.Text("FPS: " + fps);
    BioBLESS.base_stage.fps.x = BioBLESS.width - 120;
    BioBLESS.base_stage.fps.y = BioBLESS.height - 30;
    setInterval(function() {
        BioBLESS.base_stage.fps.text = "FPS: " + fps;
        BioBLESS.base_stage.addChild(BioBLESS.base_stage.fps);
    }, 1000);
    
    onDragStart_d = function(event) {
        if(!BioBLESS.stage)
            return;
        this.data = event.data;
        this.dragging = true;
        var startPosition = this.data.getLocalPosition(this.parent);
        this.startX = startPosition.x;
        this.startY = startPosition.y;
        BioBLESS.stage.movable_stage.startX = BioBLESS.stage.movable_stage.position.x;
        BioBLESS.stage.movable_stage.startY = BioBLESS.stage.movable_stage.position.y;
    };
    onDragEnd_d = function() {
        this.dragging = false;
        this.data = null;
    };
    onDragMove_d = function(event) {
        if(!BioBLESS.stage)
            return;
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            BioBLESS.stage.movable_stage.position.x = newPosition.x - this.startX + BioBLESS.stage.movable_stage.startX;
            BioBLESS.stage.movable_stage.position.y = newPosition.y - this.startY + BioBLESS.stage.movable_stage.startY;
        }
        BioBLESS.stage.movable_stage.inPosition = event.data.getLocalPosition(BioBLESS.stage.movable_stage);
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
    BioBLESS.base_stage.addChild(dragArea);
    
    var scrollFunc=function(e){
        var d = 0;
        //var x = 1;
        e = e || window.event;
        if(e.wheelDelta){//IE/Opera/Chrome
            d = e.wheelDelta;
        }else if(e.detail){//Firefox
            d = e.detail;
        }
        BioBLESS.scroll_function(d);
    };
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//W3C
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
    
    BioBLESS.prepare_navigation();
    BioBLESS.base_stage.addChild(BioBLESS.navigation);
    BioBLESS.base_stage.addChild(BioBLESS.navigation_title);
};
