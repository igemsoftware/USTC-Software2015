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
            element.graphics.beginFill(0xffffff, 0);
            element.graphics.moveTo(49.4, 38.2);
            element.graphics.bezierCurveTo(49.4 + 20.8, 38.2 + 0.4, 49.4 + 20.8, 38.2 - 36.8, 49.4, 38.2 - 36.8);//(49.4, 1.4)
            element.graphics.lineTo(49.4 - 23, 1.4);//(26.4, 1.4)
            element.graphics.lineTo(26.4, 1.4 + 36.8);//(26.4, 38.2)
            element.graphics.lineTo(49.4, 38.1);
            element.graphics.endFill();

            element.input_1.position.x = 0;
            element.input_1.position.y = 9.6;
            element.input_1.lineStyle(3, 0xffffff, 1);
            element.input_1.moveTo(0, 0);
            element.input_1.lineTo(26.4, 0);
            element.input_1.lineStyle(0, 0, 0);
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 26.4, 3);
            element.input_1.endFill();

            element.input_2.position.x = 0;
            element.input_2.position.y = 29.7;
            element.input_2.lineStyle(3, 0xffffff, 1);
            element.input_2.moveTo(0, 0);
            element.input_2.lineTo(26.4, 0);
            element.input_2.lineStyle(0, 0, 0);
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 26.4, 3);
            element.input_2.endFill();

            element.output.position.x = 99.9;
            element.output.position.y = 19.9;
            element.output.lineStyle(3, 0xffffff, 1);
            element.output.moveTo(0, 0);
            element.output.lineTo( -35, 0);
            element.output.lineStyle(0, 0, 0);
            element.output.beginFill(0, 0);
            element.output.drawRect(-35, -1, 35, 3);
            element.output.endFill();
            break;
        case "XOR":
        case "xor":
            break;
        case "OR":
        case "or":
            element.graphics.lineStyle(3, 0xffffff, 1);
            element.graphics.beginFill(0xffffff, 0);
            element.graphics.moveTo(22.2, 38.7);
            element.graphics.bezierCurveTo(22.2, 38.7, 22.2 + 6.8, 38.7 - 9.7, 22.2 + 6.3, 38.7 - 18.6);//(28.5, 20.1)
   			element.graphics.bezierCurveTo(28.5 + 0.6, 20.1 - 8.9, 28.5 - 6.3, 20.1 - 18.6, 28.5 - 6.3, 20.1 - 18.6);//(22.2, 1.5)
   			element.graphics.lineTo(22.2 + 20.3, 1.5);//(42.5, 1.5)
   			element.graphics.bezierCurveTo(42.5 + 14, 1.5, 42.5 + 23.5, 1.5 + 18.5, 42.5 + 23.5, 1.5 + 18.5);//()
            element.graphics.endFill();

            element.input_1.position.x = 0;
            element.input_1.position.y = 9.6;
            element.input_1.lineStyle(3, 0xffffff, 1);
            element.input_1.moveTo(0, 0);
            element.input_1.lineTo(26.4, 0);
            element.input_1.lineStyle(0, 0, 0);
            element.input_1.beginFill(0, 0);
            element.input_1.drawRect(0, -1, 26.4, 3);
            element.input_1.endFill();

            element.input_2.position.x = 0;
            element.input_2.position.y = 29.7;
            element.input_2.lineStyle(3, 0xffffff, 1);
            element.input_2.moveTo(0, 0);
            element.input_2.lineTo(26.4, 0);
            element.input_2.lineStyle(0, 0, 0);
            element.input_2.beginFill(0, 0);
            element.input_2.drawRect(0, -1, 26.4, 3);
            element.input_2.endFill();
            
            element.output.position.x = 99.9;
            element.output.position.y = 19.9;
            element.output.lineStyle(3, 0xffffff, 1);
            element.output.moveTo(0, 0);
            element.output.lineTo( -35, 0);
            element.output.lineStyle(0, 0, 0);
            element.output.beginFill(0, 0);
            element.output.drawRect(-35, -1, 35, 3);
            element.output.endFill();
            break;
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
            break;
        case "NOR":
        case "nor":
            break;
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