BioBLESS.onload = function() {
    $.getJSON("misc/gates.json", function(json) {BioBLESS.gates = json;});
    if(!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function(callback) {setTimeout(callback.bind(null, new Date().getTime()), 1000 / 60);};
};
