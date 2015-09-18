BioBLESS.main = function() {
    BioBLESS.logic.init();
    BioBLESS.gene_network.init();
    BioBLESS.simulation.init();
    BioBLESS.analysis.init();
    BioBLESS.dna.init();
    BioBLESS.stage = BioBLESS.logic.stage;
    BioBLESS.base_stage.static_stage = new PIXI.Container();
    BioBLESS.base_stage.addChild(BioBLESS.base_stage.static_stage);
    BioBLESS.base_stage.addChild(BioBLESS.stage);
    BioBLESS.base_stage.static_stage.fps = new PIXI.Text("FPS: " + BioBLESS.fps);
    BioBLESS.base_stage.static_stage.fps.style.fill = "white";
    BioBLESS.base_stage.static_stage.fps.x = BioBLESS.width - 110;
    BioBLESS.base_stage.static_stage.fps.y = BioBLESS.height - 30;
    setInterval(function() {BioBLESS.base_stage.static_stage.fps.text = "FPS: " + BioBLESS.fps;}, 1000);

    BioBLESS.base_stage.static_stage.addChild(BioBLESS.utils.new_drag_area());
    BioBLESS.base_stage.static_stage.addChild(BioBLESS.base_stage.static_stage.fps);
    
    var scroll_func = function(e){
        var d = 0;
        e = e || window.event;
        if(e.wheelDelta) //IE/Opera/Chrome
            d = e.wheelDelta;
        else if(e.detail) //Firefox
            d = e.detail;
        if(BioBLESS.scroll_function !== undefined)
            BioBLESS.scroll_function(d);
    };
    if(document.addEventListener) //W3C
        document.addEventListener('DOMMouseScroll', scroll_func, false);
    window.onmousewheel = document.onmousewheel = scroll_func; //IE/Opera/Chrome/Safari
    BioBLESS.prepare_navigation();
    BioBLESS.base_stage.addChild(BioBLESS.navigation);
    BioBLESS.add_animate_hook(function() {
        if(BioBLESS.gates) {
            BioBLESS.logic.draw(BioBLESS.gates);
            return true;
        }
        return false;
    });
    BioBLESS.scroll_function = BioBLESS.zoom_function;
    BioBLESS.add_animate_hook(BioBLESS.scroll_animation);
    BioBLESS.now_plugin = BioBLESS.logic;
    var window_size_change = function(){
        BioBLESS.width = $('body').width();
        BioBLESS.height = $('body').height();
        BioBLESS.renderer.resize(BioBLESS.width, BioBLESS.height);
        BioBLESS.base_stage.removeChild(BioBLESS.navigation);
        BioBLESS.prepare_navigation();
        BioBLESS.base_stage.addChild(BioBLESS.navigation);
        BioBLESS.base_stage.static_stage.fps.x = BioBLESS.width - 110;
        BioBLESS.base_stage.static_stage.fps.y = BioBLESS.height - 30;
        BioBLESS.logic.redraw();
        if(BioBLESS.now_plugin.redraw)
            BioBLESS.now_plugin.redraw();
    };
    window.onresize = window_size_change;
};
