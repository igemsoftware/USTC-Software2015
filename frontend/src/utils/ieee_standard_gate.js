/**
 * BioBLESS.logic.ieee_standard_gate is the function to draw gate in ieee standard.
 * @author Ubrok
 * @function
 * @param {device} caused by users
 * @return {element} PIXI.Graphics
 */
BioBLESS.logic.ieee_standard_gate = function(device){
    /**
     * element is a stage to draw the gate
     * @type {PIXI.Graphics}
     */
    var icon = device.id;
    var Regx = /^[0-9]*$/;
    while(Regx.test(icon[icon.length - 1])){
        icon = icon.substring(0, icon.length - 1);
    }
    var element = new PIXI.Container();
    element.graphics = new PIXI.Graphics();
    element.title = new PIXI.Text(device.id);
    element.input_1 = new PIXI.Graphics();
    element.input_1.lines = [];
    element.input_1.counts = 0;
    element.input_1.connection = false;
    element.input_2 = new PIXI.Graphics();
    element.input_2.lines = [];
    element.input_2.counts = 0;
    element.input_2.connection = false;
    element.output = new PIXI.Graphics();
    element.output.lines = [];
    element.output.counts = 0;
    element.output.connection = false;
    element.title.anchor.x = element.title.anchor.y = 0.5;
    element.title.position.x = 75;
    element.title.position.y = 35;
    element.title.style.fill = "white";
    element.type = icon;
    element.gate_delete_button = new PIXI.Graphics();

    // element.graphics.lineStyle(3, 0xffffff, 1);
    // element.graphics.beginFill(0, 0);
    // element.graphics.drawRect(30, 0, 90, 70);
    // element.graphics.endFill();
    // element.output.beginFill(0xffffff, 1);
    // element.output.drawRect(0, 0, -30, 3);
    // element.output.position.x = 150;
    // element.output.position.y = 34;
    // element.output.endFill();
    // element.output.beginFill(0, 0);
    // element.output.drawRect(-30, -1, 30, 5);
    // element.output.endFill();
    switch(icon){
        default: 
            alert("Error - 1001!");
            break;
        case "AND":
        case "and":
            element.graphics.lineStyle(3, 0xffffff, 1);
            element.graphics.moveTo(60, 10);
            element.graphics.bezierCurveTo(60 + 20.751, 10, 60 + 20.751, 10 + 36.833, 60, 10 + 36.833);//(60, 46.833)
            element.graphics.lineTo(30, 46.833);
            element.graphics.lineTo(30, 10);
            element.graphics.lineTo(60, 10);
            element.input_1.position.x = 0;
            element.input_1.position.y = 17;
            element.input_2.position.x = 0;
            element.input_2.position.y = 37.834;
            element.output.position.x = 15.563 + 30 + 60;
            element.output.position.y = 27.416;
            element.input_1.beginFill(0xffffff, 1);
            element.input_1.drawRect(0, 0, 30, 3);
            element.input_1.endFill();
            element.input_2.beginFill(0xffffff, 1);
            element.input_2.drawRect(0, 0, 30, 3);
            element.input_2.endFill();
            element.output.beginFill(0xffffff, 1);
            element.output.drawRect(-30, 0, 30, 3);
            element.output.endFill();
            break;
        case "XOR":
        case "xor":

        case "OR":
        case "or":
            // element.input_1.beginFill(0xffffff, 1);
            // element.input_1.drawRect(0, 0, 30, 3);
            // element.input_1.position.x = 0;
            // element.input_1.position.y = 17;
            // element.input_1.endFill();
            // element.input_1.beginFill(0, 0);
            // element.input_1.drawRect(0, -1, 30, 5);
            // element.input_1.endFill();
            // element.input_2.beginFill(0xffffff, 1);
            // element.input_2.drawRect(0, 0, 30, 3);
            // element.input_2.position.x = 0;
            // element.input_2.position.y = 51;
            // element.input_2.endFill();
            // element.input_2.beginFill(0, 0);
            // element.input_2.drawRect(0, -1, 30, 5);
            // element.input_2.endFill();
            break;
        case "NOT":
        case "not":
            // element.input_1.beginFill(0xffffff, 1);
            // element.input_1.drawRect(0, 0, 30, 3);
            // element.input_1.position.x = 0;
            // element.input_1.position.y = 34;
            // element.input_1.endFill();
            // element.input_1.beginFill(0, 0);
            // element.input_1.drawRect(0, -1, 30, 5);
            // element.input_1.endFill();
            // element.graphics.moveTo(135, 35);
            // element.graphics.lineTo(120, 20);
            break;
        case "NAND":
        case "nand":

        case "NOR":
        case "nor":
            
        case "XNOR":
        case "xnor":
            // element.input_1.beginFill(0xffffff, 1);
            // element.input_1.drawRect(0, 0, 30, 3);
            // element.input_1.position.x = 0;
            // element.input_1.position.y = 17;
            // element.input_1.endFill();
            // element.input_1.beginFill(0, 0);
            // element.input_1.drawRect(0, -1, 30, 5);
            // element.input_1.endFill();
            // element.input_2.beginFill(0xffffff, 1);
            // element.input_2.drawRect(0, 0, 30, 3);
            // element.input_2.position.x = 0;
            // element.input_2.position.y = 51;
            // element.input_2.endFill();
            // element.input_2.beginFill(0, 0);
            // element.input_2.drawRect(0, -1, 30, 5);
            // element.input_2.endFill();
            break;
    }
    element.addChild(element.graphics);
    element.addChild(element.input_1);
    element.addChild(element.input_2);
    element.addChild(element.output);
    return element;
};