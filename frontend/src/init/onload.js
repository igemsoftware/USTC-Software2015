BioBLESS.onload = function() {
    BioBLESS.width = $('body').width();
    BioBLESS.height = $('body').height();
    var renderer = PIXI.autoDetectRenderer(BioBLESS.width, BioBLESS.height, {antialias : true});
    BioBLESS.renderer = renderer;
    if(!renderer)
        return;
    document.body.appendChild(renderer.view);
    BioBLESS.base_stage = new PIXI.Container();
    var prev_time = 0;
    var animate = function(now) {
        var hook_finish;
        for(var i in BioBLESS.animate_hook) {
            hook_finish = BioBLESS.animate_hook[i]();
            if(hook_finish)
                BioBLESS.delete_animate_hook(BioBLESS.animate_hook[i]);
        }
        renderer.render(BioBLESS.base_stage);
        BioBLESS.fps = Math.floor(1000 / (now - prev_time));
        prev_time = now;
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    // Now we load webfont.
    var test = [];
    var i;
    for(i = 0; i < 3; i++) {
        var text = document.createTextNode('0.Naïve');
        test[i] = document.createElement('p');
        test[i].appendChild(text);
    }
    test[0].style.fontFamily = 'Lora';
    test[1].style.fontFamily = 'Open Sans';
    test[2].style.fontFamily = 'Inconsolata';
    for(i = 0; i < 3; i++)
        document.body.appendChild(test[i]);
    setTimeout(function() {
        for(i = 0; i < 3; i++)
            document.body.removeChild(test[i]);
        BioBLESS.main();
    }, 1000);
};
