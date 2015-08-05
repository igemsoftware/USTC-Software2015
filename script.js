window.PLUMB = {'plugins' : ['home', 'device', 'simulator']};
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
};
PLUMB.get_current_plugin_stage = function() {
    if(PLUMB.stage.children.length == 1)
        return PLUMB.stage.children[0];
    return null;
}
PLUMB.change_stage = function(plugin) {
    var child_stage = PLUMB.get_current_plugin_stage();
    if(!child_stage)
        return;
    PLUMB.stage.removeChild(child_stage);
    PLUMB.stage.addChild(plugin.stage);
};
