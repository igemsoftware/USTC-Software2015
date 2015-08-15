/** 
* @author USTC-software
* @description the frame
* @version 0.2.1
*/ 

/** 
* @description get current plugin stage
* @return {PIXI.Container} current plugin stage
*/ 
BioBLESS.get_current_plugin_stage = function() {
    return BioBLESS.plugin_stage;
};
BioBLESS.zoom_function = function(d){
	if(BioBLESS.get_current_plugin_stage() === null)
        return;
    if(d > 0){
        if(BioBLESS.get_current_plugin_stage().movable_stage._scale > 3)
            return;
        BioBLESS.get_current_plugin_stage().movable_stage._scale *= 1.1;
    
    }else{
        if(BioBLESS.get_current_plugin_stage().movable_stage._scale < 0.1)
            return;
        BioBLESS.get_current_plugin_stage().movable_stage._scale /= 1.1;
    }
};

BioBLESS.scroll_function = BioBLESS.zoom_function;
BioBLESS.animation = [];
/** 
* @description add animation
* @param {function} animation function
*/ 
BioBLESS.add_animation = function(ani){
	if(ani !== undefined)
	    BioBLESS.animation[BioBLESS.animation.length] = ani;
};
/** 
* @description delete animation
* @param {function} animation function
* @return {Bool} if succes to delete, return true, or return false
*/ 
BioBLESS.delete_animation = function(ani){
	for(i = 0; i < BioBLESS.animation.length; i++){
		if(BioBLESS.animation[i] == ani){
			BioBLESS.animation.splice(i, 1);
			return true;
		}
	};
	return false;
};
BioBLESS.scroll_animation = function(){
    if(BioBLESS.get_current_plugin_stage() !== undefined){
        if(Math.abs(BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) > 0.001){
            if(BioBLESS.get_current_plugin_stage().movable_stage.inPosition === null){
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition = function(){};
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition.x = BioBLESS.width / 2;
                BioBLESS.get_current_plugin_stage().movable_stage.inPosition.y = BioBLESS.height / 2;
            }
            BioBLESS.get_current_plugin_stage().movable_stage.position.x += (BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25 * BioBLESS.get_current_plugin_stage().movable_stage.inPosition.x;
            BioBLESS.get_current_plugin_stage().movable_stage.position.y += (BioBLESS.get_current_plugin_stage().movable_stage.scale.y - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25 * BioBLESS.get_current_plugin_stage().movable_stage.inPosition.y;
            BioBLESS.get_current_plugin_stage().movable_stage.scale.x -= (BioBLESS.get_current_plugin_stage().movable_stage.scale.x - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25;
            BioBLESS.get_current_plugin_stage().movable_stage.scale.y -= (BioBLESS.get_current_plugin_stage().movable_stage.scale.y - BioBLESS.get_current_plugin_stage().movable_stage._scale) * 0.25;
        }else
            BioBLESS.get_current_plugin_stage().movable_stage.scale.x = BioBLESS.get_current_plugin_stage().movable_stage.scale.y = BioBLESS.get_current_plugin_stage().movable_stage._scale;
    }
};
BioBLESS.add_animation(BioBLESS.scroll_animation);


BioBLESS.prepare_navigation_title = function(){
	
	this.navigation_title = new PIXI.Container();
    var background2 = new PIXI.Graphics();
    background2.beginFill(0x000000, 1);
    background2.lineStyle(0);
    background2.drawRect(0, 0, 120, 120);
    background2.endFill();
    background2.lineStyle(3, 0xffffff, 1);
    background2.drawCircle(60, 60, 50);
	background2.lineStyle(1, 0xffffff, 0.8);
	background2.moveTo(12, 120);
	background2.lineTo(108, 120);
    var title = new PIXI.Text('BioBLESS', {fill: "#ffffff"});
    title.position.y = 60;
    title.position.x = 60;
	title.anchor.x = 0.5;
	title.anchor.y = 0.5;
	title.scale.x = title.scale.y = 0.7;
    this.navigation_title.addChild(background2);
    this.navigation_title.addChild(title);
};
BioBLESS.prepare_navigation = function(){
	BioBLESS.prepare_navigation_title();
	var navigation_button = ["home","device","simulator","","",""];
	BioBLESS.navigation = new PIXI.Container();
	var button_width = 120;
	var button_dis = (BioBLESS.height) / (navigation_button.length + 1);
	if(button_dis < 120){
	    button_dis = 120;
		BioBLESS.navigation.h = button_dis * (navigation_button.length + 1);
		this.navigation_title.scale.x = this.navigation_title.scale.y =  BioBLESS.height / BioBLESS.navigation.h;
		this.navigation.scale.x = this.navigation.scale.y = BioBLESS.height / BioBLESS.navigation.h;
	}else
	    BioBLESS.navigation.h = BioBLESS.height;
    BioBLESS.navigation.condition = 0;
    BioBLESS.navigation.w = 120;
    var background = new PIXI.Graphics();
    background.beginFill(0x000000, 1);
    background.lineStyle(0);
    background.drawRect(0, 0, this.navigation.w, this.navigation.h);
    background.endFill();
	BioBLESS.navigation.button = [];
    var onmousedown_obj = function() {
		if(BioBLESS[this.t] !== undefined)
             BioBLESS.change_stage(BioBLESS[this.t]);
    };
    for(var i = 1; i < navigation_button.length + 1; i++){
        var j = i - 1;
        BioBLESS.navigation.button[j] = new PIXI.Graphics();
        BioBLESS.navigation.button[j].lineStyle(3, 0xffffff, 1);
        BioBLESS.navigation.button[j].beginFill(0, 0);
        BioBLESS.navigation.button[j].drawCircle(60, i * button_dis + 60, 50);
        BioBLESS.navigation.button[j].endFill();
        BioBLESS.navigation.button[j].title = new PIXI.Text(navigation_button[j], {fill: "#ffffff"});
        BioBLESS.navigation.button[j].title.anchor.x = 0.5;
        BioBLESS.navigation.button[j].title.anchor.y = 0.5;
        if(navigation_button[j].length > 7){
            BioBLESS.navigation.button[j].title.scale.x *= 7 / navigation_button[j].length;
            BioBLESS.navigation.button[j].title.scale.y *= 7 / navigation_button[j].length;
        }
        BioBLESS.navigation.button[j].title.position.x = 60;
        BioBLESS.navigation.button[j].title.position.y = i * button_dis + 60;
        BioBLESS.navigation.button[j].t = navigation_button[j];
        BioBLESS.navigation.button[j].on('mousedown', onmousedown_obj);
    }
    this.navigation.addChild(background);
    for(var v = 0; v < BioBLESS.navigation.button.length; v++){
        this.navigation.addChild(BioBLESS.navigation.button[v]);
        this.navigation.addChild(BioBLESS.navigation.button[v].title);
    }
    for(var j = 0; j < BioBLESS.navigation.button.length; j++){
        BioBLESS.navigation.button[j].interactive = true;
        BioBLESS.navigation.button[j].buttonMode = true;
    }
};
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


/** 
* @description change plugin
* @param {plugin} the plugin you want to change to
*/ 
BioBLESS.change_stage = function(plugin) {
    var child_stage = BioBLESS.get_current_plugin_stage();
    if(!child_stage)
        return;
    BioBLESS.stage.removeChild(child_stage);
    BioBLESS.stage.addChild(plugin.stage);
    BioBLESS.stage.addChild(BioBLESS.navigation);
    BioBLESS.stage.addChild(BioBLESS.navigation_title);
    BioBLESS.plugin_stage = plugin.stage;
};