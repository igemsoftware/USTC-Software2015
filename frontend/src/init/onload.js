BioBLESS.onload = function() {
    $.getJSON("misc/gates.json", function(json) {BioBLESS.gates = json;});
};
