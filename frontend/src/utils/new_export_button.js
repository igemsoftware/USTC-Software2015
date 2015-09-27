BioBLESS.utils.new_export_button = function(filename, data) {
    var saveobj = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x888888, 1);
    bg.drawRoundedRect(0, 0, 115, 50, 5);
    bg.endFill();
    var savetext = new PIXI.Text("Export");
    savetext.position.x = 15;
    savetext.position.y = 10;
    saveobj.addChild(bg);
    saveobj.addChild(savetext);
    saveobj.interactive = true;
    saveobj.buttonMode = true;
    saveobj.position.x = 40 + 120 * BioBLESS.navigation.scale.x;
    saveobj.position.y = 40;

    saveobj.on('mousedown', function() {
        var blob = new Blob([data]);
        var a = document.createElement("a");
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        a.dispatchEvent(evt);
        document.body.appendChild(a);
    });
    return saveobj;
};
