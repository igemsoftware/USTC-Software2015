/** 
 * @description create a textarea
 * @param {Num} weight
 * @param {Num} height
 * @return {PIXI.Graphics} textarea
 */ 
BioBLESS.create_textarea = function(w, h){
    var id = "I_";
    id += Math.random().toString(36).substr(2);
    var graphics = new PIXI.Graphics();
    graphics.w = w;
    graphics.h = h;
    graphics.beginFill(0x0000ff, 1);
    graphics.drawRoundedRect(0, 0, w, h, h / 5);
    graphics.endFill();
    graphics.input = document.createElement(id);
    graphics.input.id = id;
    graphics.input.type = "textarea";
    graphics.input.style.width = (w - 2 * h / 5 - 4).toString() + "px";
    graphics.input.style.height = (h - 2 * h / 5 - 6).toString() + "px";
    graphics.input.style.position = "absolute";
    return graphics;
};
/** 
 * @description change the position of textarea
 * @param {PIXI.Graphics} textarea
 * @param {Num} animation x
 * @param {Num} animation y
 */ 
BioBLESS.change_textarea_position = function(textarea, x, y){
    textarea.position.x = x;
    textarea.position.y = y;
    textarea.input.style.left = (x + textarea.h / 5).toString() + "px";
    textarea.input.style.top = (y + textarea.h / 5).toString() + "px";
};
/** 
 * @description show textarea
 * @param {PIXI.Container} the stage contains textarea
 * @param {PIXI.Graphics} textarea
 */ 
BioBLESS.show_textarea = function(stage, textarea){
    stage.addChild(textarea);
    $("body").append(textarea.input);
};
/** 
 * @description delete textarea
 * @param {PIXI.Container} the stage contains textarea
 * @param {PIXI.Graphics} textarea
 */ 
BioBLESS.delete_textarea = function(stage, textarea){
    stage.removeChild(textarea);
    $(textarea.input.id).remove();
};
