BioBLESS.init = function() {
    BioBLESS.width = $('body').width();
    BioBLESS.height = $('body').height();
    var renderer = PIXI.autoDetectRenderer(BioBLESS.width, BioBLESS.height, {antialias : true});
    if(!renderer)
        return;
    document.body.appendChild(renderer.view);
    BioBLESS.base_stage = new PIXI.Container();
    var prev_time = 0;
    var fps = 0;
    var animate = function(now) {
        var hook_finish;
        for(var i in BioBLESS.animate_hook) {
            hook_finish = BioBLESS.animate_hook[i]();
            if(hook_finish)
                BioBLESS.delete_animate_hook(BioBLESS.animate_hook[i]);
        }
        renderer.render(BioBLESS.base_stage);
        fps = Math.floor(1000 / (now - prev_time));
        prev_time = now;
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    BioBLESS.logic.init();
    BioBLESS.gene_network.init();
    BioBLESS.simulation.init();
    BioBLESS.analysis.init();
    BioBLESS.dna.init();
    BioBLESS.stage = BioBLESS.logic.stage;
    BioBLESS.base_stage.static_stage = new PIXI.Container();
    BioBLESS.base_stage.addChild(BioBLESS.base_stage.static_stage);
    BioBLESS.base_stage.addChild(BioBLESS.stage);
    BioBLESS.base_stage.static_stage.fps = new PIXI.Text("FPS: " + fps);
    BioBLESS.base_stage.static_stage.fps.x = BioBLESS.width - 400;
    BioBLESS.base_stage.static_stage.fps.y = BioBLESS.height - 30;
    setInterval(function() {BioBLESS.base_stage.static_stage.fps.text = "FPS: " + fps;}, 1000);

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
    BioBLESS.base_stage.static_stage.addChild(BioBLESS.navigation);
    BioBLESS.base_stage.static_stage.addChild(BioBLESS.navigation_title);
    BioBLESS.add_animate_hook(function() {
        if(BioBLESS.gates) {
            BioBLESS.logic.draw(BioBLESS.gates);
            return true;
        }
        return false;
    });
    $.getJSON("misc/simulator.json", function(data) {BioBLESS.simulation.draw(data);});
	BioBLESS.scroll_function = BioBLESS.zoom_function;
    BioBLESS.add_animate_hook(BioBLESS.scroll_animation);
};
