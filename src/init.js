/**
 * @namespace BioBLESS
 */
window.BioBLESS = {"plugins" : ["home", "device", "simulator"]};
BioBLESS.get_current_plugin_stage = function() {
    return BioBLESS.plugin_stage;
}
BioBLESS.animation = new Array();
BioBLESS.animation[BioBLESS.animation.length] = function(){
    if(BioBLESS.get_current_plugin_stage() != null){
        if(Math.abs(BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) > 0.001){
            if(BioBLESS.get_current_plugin_stage().movable_stage.inPosition == null){
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition = function(){};
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition.x = BioBLESS.width / 2;
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition.y = BioBLESS.height / 2;
            };
            BioBLESS.get_current_plugin_stage().movable_stage.position.x += (BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25 * BioBLESS.get_current_plugin_stage().movable_stage.inPosition.x;
            BioBLESS.get_current_plugin_stage().movable_stage.position.y += (BioBLESS.get_current_plugin_stage().movable_stage.scale.y - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25 * BioBLESS.get_current_plugin_stage().movable_stage.inPosition.y;
            BioBLESS.get_current_plugin_stage().movable_stage.scale.x -= (BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25;
            BioBLESS.get_current_plugin_stage().movable_stage.scale.y -= (BioBLESS.get_current_plugin_stage().movable_stage.scale.y - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25;
        }else
            BioBLESS.get_current_plugin_stage().movable_stage.scale.x = BioBLESS.get_current_plugin_stage().movable_stage.scale.y = BioBLESS.get_current_plugin_stage().movable_stage._scale;
    };
};
BioBLESS.prepare_navigation = function(){
    BioBLESS.navigation = new PIXI.Container();
    BioBLESS.navigation.condition = 0;
    BioBLESS.navigation.h = 120 * BioBLESS.plugins.length + 160;
    BioBLESS.navigation.w = 120;
    var background = new PIXI.Graphics();
    background.beginFill(0x000000, 1);
    background.lineStyle(0);
    background.drawRect(0, 0, this.navigation.w, this.navigation.h);
    background.endFill();
    background.lineStyle(3, 0xffffff, 1);
    BioBLESS.navigation.button = new Array();
    for(var i = 1; i < BioBLESS.plugins.length + 1; i++){
        var j = i - 1;
        BioBLESS.navigation.button[j] = new PIXI.Graphics();
        
        BioBLESS.navigation.button[j].lineStyle(3, 0xffffff, 1);
        BioBLESS.navigation.button[j].beginFill(0, 0);
        BioBLESS.navigation.button[j].drawCircle(60, 60 + i * 120, 50);
        BioBLESS.navigation.button[j].endFill();
        BioBLESS.navigation.button[j].title = new PIXI.Text(BioBLESS.plugins[j], {fill: "#ffffff"});
        BioBLESS.navigation.button[j].title.anchor.x = 0.5;
        BioBLESS.navigation.button[j].title.anchor.y = 0.5;
        if(BioBLESS.plugins[j].length > 7){
            BioBLESS.navigation.button[j].title.scale.x *= 7 / BioBLESS.plugins[j].length;
            BioBLESS.navigation.button[j].title.scale.y *= 7 / BioBLESS.plugins[j].length;
        };
        BioBLESS.navigation.button[j].title.position.x = 60;
        BioBLESS.navigation.button[j].title.position.y = 60 + i * 120;
        BioBLESS.navigation.button[j].t = BioBLESS.plugins[j];
        BioBLESS.navigation.button[j].on('mousedown', function(){
                BioBLESS.change_stage(BioBLESS[this.t]);
            });
    };
    
    BioBLESS.navigation.down = new PIXI.Graphics();
    BioBLESS.navigation.down.interactive = true;
    BioBLESS.navigation.down.buttonMode = true;
    BioBLESS.navigation.up = new PIXI.Graphics();
    BioBLESS.navigation.up.interactive = false;
    BioBLESS.navigation.up.buttonMode = false;
    BioBLESS.navigation.up.alpha = 0;
    BioBLESS.navigation.down.lineStyle(0);
    BioBLESS.navigation.up.lineStyle(0);
    BioBLESS.navigation.down.beginFill(0xffffff);
    BioBLESS.navigation.down.moveTo(40, this.navigation.h - 30);
    BioBLESS.navigation.down.lineTo(80, this.navigation.h - 30);
    BioBLESS.navigation.down.lineTo(60, this.navigation.h - 10);
    BioBLESS.navigation.down.endFill();
    BioBLESS.navigation.up.beginFill(0xffffff);
    BioBLESS.navigation.up.moveTo(40, this.navigation.h - 10);
    BioBLESS.navigation.up.lineTo(80, this.navigation.h - 10);
    BioBLESS.navigation.up.lineTo(60, this.navigation.h - 30);
    BioBLESS.navigation.up.endFill();
    var that = BioBLESS;
    BioBLESS.navigation.down.on('mousedown',function(){
            if(BioBLESS.navigation.condition == 0){
                BioBLESS.navigation.down.interactive = false;
                BioBLESS.navigation.down.buttonMode = false;
                BioBLESS.navigation.up.interactive = true;
                BioBLESS.navigation.up.buttonMode = true;
                BioBLESS.navigation.condition = -1;
                for(var j = 0; j < BioBLESS.navigation.button.length; j++){
                    BioBLESS.navigation.button[j].interactive = true;
                    BioBLESS.navigation.button[j].buttonMode = true;
                };
            };
        });
    BioBLESS.navigation.up.on('mousedown',function(){
            if(BioBLESS.navigation.condition == 0){
                BioBLESS.navigation.down.interactive = true;
                BioBLESS.navigation.down.buttonMode = true;
                BioBLESS.navigation.up.interactive = false;
                BioBLESS.navigation.up.buttonMode = false;
                BioBLESS.navigation.condition = 1;
                for(var j = 0; j < BioBLESS.navigation.button.length; j++){
                    BioBLESS.navigation.button[j].interactive = false;
                    BioBLESS.navigation.button[j].buttonMode = false;
                };
            };
        });
    BioBLESS.animation[BioBLESS.animation.length] = function(){
        if(BioBLESS.navigation.condition == 1){
            if(Math.abs(BioBLESS.navigation.position.y - BioBLESS.navigation.start_y) > 1){
                BioBLESS.navigation.position.y -= (BioBLESS.navigation.position.y - BioBLESS.navigation.start_y) * 0.15;
                BioBLESS.navigation.up.alpha *= 0.85;
                BioBLESS.navigation.down.alpha = 1 - BioBLESS.navigation.up.alpha;
            }else{
                BioBLESS.navigation.position.y = BioBLESS.navigation.start_y;
                BioBLESS.navigation.condition = 0;
                BioBLESS.navigation.down.alpha = 1;
                BioBLESS.navigation.up.alpha = 0;
                
            };
        }else if(BioBLESS.navigation.condition == -1){
            if(Math.abs(BioBLESS.navigation.position.y) > 1){
                BioBLESS.navigation.position.y *= 0.85;
                BioBLESS.navigation.down.alpha *= 0.85;
                BioBLESS.navigation.up.alpha = 1 - BioBLESS.navigation.down.alpha;
            }else{
                BioBLESS.navigation.position.y = 0;
                BioBLESS.navigation.condition = 0;
                BioBLESS.navigation.down.alpha = 0;
                BioBLESS.navigation.up.alpha = 1;
                
            };
        };
    };
    
    
    
    
    this.navigation.addChild(background);
    this.navigation.addChild(this.navigation.up);
    this.navigation.addChild(this.navigation.down);
    for(var i = 0; i < BioBLESS.navigation.button.length; i++){
        this.navigation.addChild(BioBLESS.navigation.button[i]);
        this.navigation.addChild(BioBLESS.navigation.button[i].title);
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
    var title = new PIXI.Text('BioBLESS', {fill: "#ffffff"});
    title.position.y = 45;
    title.position.x = 13;
    this.navigation_title.addChild(background2);
    this.navigation_title.addChild(title);
};
BioBLESS.init = function() {
    BioBLESS.width = $('body').width();
    BioBLESS.height = $('body').height();
    BioBLESS.stage = new PIXI.Container();
    
    var canvas = document.getElementById('canvas');
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

BioBLESS.change_stage = function(plugin) {
    var child_stage = BioBLESS.get_current_plugin_stage();
    if(!child_stage)
        return;
    BioBLESS.stage.removeChild(child_stage);
    BioBLESS.stage.addChild(plugin.stage);
    BioBLESS.stage.addChild(BioBLESS.navigation);
    BioBLESS.stage.addChild(BioBLESS.navigation_title);
    BioBLESS.plugin_stage = plugin.stage;
};
