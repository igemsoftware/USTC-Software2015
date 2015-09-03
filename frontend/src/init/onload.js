BioBLESS.onload = function() {
    $.getJSON("https://ustc.software/gates/", function(json) {BioBLESS.gates = json;});
    if(!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function(callback) {setTimeout(callback.bind(null, new Date().getTime()), 1000 / 60);};
};
