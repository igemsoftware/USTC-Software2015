BioBLESS.get_current_plugin_stage = function() {
    return BioBLESS.plugin_stage;
};
BioBLESS.animation = [];
BioBLESS.animation[BioBLESS.animation.length] = function(){
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
BioBLESS.prepare_navigation = function(){
    BioBLESS.navigation = new PIXI.Container();
    BioBLESS.navigation.condition = 0;
    BioBLESS.navigation.h = 120 * BioBLESS.plugins.length + 160;
    BioBLESS.navigation.w = 120;
    var background = new PIXI.Graphics();
    background.beginFill(0x000000, 1);
    background.lineStyle(0);
    background.drawRect(0, 0, this.navigation.w, this.navigation.h);
    background.endFill();
    background.lineStyle(3, 0xffffff, 1);
    BioBLESS.navigation.button = [];
    var onmousedown_obj = function() {
        BioBLESS.change_stage(BioBLESS[this.t]);
    };
    for(var i = 1; i < BioBLESS.plugins.length + 1; i++){
        var j = i - 1;
        BioBLESS.navigation.button[j] = new PIXI.Graphics();
        
        BioBLESS.navigation.button[j].lineStyle(3, 0xffffff, 1);
        BioBLESS.navigation.button[j].beginFill(0, 0);
        BioBLESS.navigation.button[j].drawCircle(60, 60 + i * 120, 50);
        BioBLESS.navigation.button[j].endFill();
        BioBLESS.navigation.button[j].title = new PIXI.Text(BioBLESS.plugins[j], {fill: "#ffffff"});
        BioBLESS.navigation.button[j].title.anchor.x = 0.5;
        BioBLESS.navigation.button[j].title.anchor.y = 0.5;
        if(BioBLESS.plugins[j].length > 7){
            BioBLESS.navigation.button[j].title.scale.x *= 7 / BioBLESS.plugins[j].length;
            BioBLESS.navigation.button[j].title.scale.y *= 7 / BioBLESS.plugins[j].length;
        }
        BioBLESS.navigation.button[j].title.position.x = 60;
        BioBLESS.navigation.button[j].title.position.y = 60 + i * 120;
        BioBLESS.navigation.button[j].t = BioBLESS.plugins[j];
        BioBLESS.navigation.button[j].on('mousedown', onmousedown_obj);
    }
    
    BioBLESS.navigation.down = new PIXI.Graphics();
    BioBLESS.navigation.down.interactive = true;
    BioBLESS.navigation.down.buttonMode = true;
    BioBLESS.navigation.up = new PIXI.Graphics();
    BioBLESS.navigation.up.interactive = false;
    BioBLESS.navigation.up.buttonMode = false;
    BioBLESS.navigation.up.alpha = 0;
    BioBLESS.navigation.down.lineStyle(0);
    BioBLESS.navigation.up.lineStyle(0);
    BioBLESS.navigation.down.beginFill(0xffffff);
    BioBLESS.navigation.down.moveTo(40, this.navigation.h - 30);
    BioBLESS.navigation.down.lineTo(80, this.navigation.h - 30);
    BioBLESS.navigation.down.lineTo(60, this.navigation.h - 10);
    BioBLESS.navigation.down.endFill();
    BioBLESS.navigation.up.beginFill(0xffffff);
    BioBLESS.navigation.up.moveTo(40, this.navigation.h - 10);
    BioBLESS.navigation.up.lineTo(80, this.navigation.h - 10);
    BioBLESS.navigation.up.lineTo(60, this.navigation.h - 30);
    BioBLESS.navigation.up.endFill();
    var that = BioBLESS;
    BioBLESS.navigation.down.on('mousedown',function(){
            if(BioBLESS.navigation.condition === 0){
                BioBLESS.navigation.down.interactive = false;
                BioBLESS.navigation.down.buttonMode = false;
                BioBLESS.navigation.up.interactive = true;
                BioBLESS.navigation.up.buttonMode = true;
                BioBLESS.navigation.condition = -1;
                for(var j = 0; j < BioBLESS.navigation.button.length; j++){
                    BioBLESS.navigation.button[j].interactive = true;
                    BioBLESS.navigation.button[j].buttonMode = true;
                }
            }
        });
    BioBLESS.navigation.up.on('mousedown',function(){
            if(BioBLESS.navigation.condition === 0){
                BioBLESS.navigation.down.interactive = true;
                BioBLESS.navigation.down.buttonMode = true;
                BioBLESS.navigation.up.interactive = false;
                BioBLESS.navigation.up.buttonMode = false;
                BioBLESS.navigation.condition = 1;
                for(var j = 0; j < BioBLESS.navigation.button.length; j++){
                    BioBLESS.navigation.button[j].interactive = false;
                    BioBLESS.navigation.button[j].buttonMode = false;
                }
            }
        });
    BioBLESS.animation[BioBLESS.animation.length] = function(){
        if(BioBLESS.navigation.condition == 1){
            if(Math.abs(BioBLESS.navigation.position.y - BioBLESS.navigation.start_y) > 1){
                BioBLESS.navigation.position.y -= (BioBLESS.navigation.position.y - BioBLESS.navigation.start_y) * 0.15;
                BioBLESS.navigation.up.alpha *= 0.85;
                BioBLESS.navigation.down.alpha = 1 - BioBLESS.navigation.up.alpha;
            }else{
                BioBLESS.navigation.position.y = BioBLESS.navigation.start_y;
                BioBLESS.navigation.condition = 0;
                BioBLESS.navigation.down.alpha = 1;
                BioBLESS.navigation.up.alpha = 0;
                
            }
        }else if(BioBLESS.navigation.condition == -1){
            if(Math.abs(BioBLESS.navigation.position.y) > 1){
                BioBLESS.navigation.position.y *= 0.85;
                BioBLESS.navigation.down.alpha *= 0.85;
                BioBLESS.navigation.up.alpha = 1 - BioBLESS.navigation.down.alpha;
            }else{
                BioBLESS.navigation.position.y = 0;
                BioBLESS.navigation.condition = 0;
                BioBLESS.navigation.down.alpha = 0;
                BioBLESS.navigation.up.alpha = 1;
                
            }
        }
    };


    this.navigation.addChild(background);
    this.navigation.addChild(this.navigation.up);
    this.navigation.addChild(this.navigation.down);
    for(var v = 0; v < BioBLESS.navigation.button.length; v++){
        this.navigation.addChild(BioBLESS.navigation.button[v]);
        this.navigation.addChild(BioBLESS.navigation.button[v].title);
    }
    this.navigation.position.y -= this.navigation.h - 160;
    this.navigation.start_y = this.navigation.position.y;
    
    this.navigation_title = new PIXI.Container();
    var background2 = new PIXI.Graphics();
    background2.beginFill(0x000000, 1);
    background2.lineStyle(0);
    background2.drawRect(0, 0, 120, 120);
    background2.endFill();
    background2.lineStyle(3, 0xffffff, 1);
    background2.drawCircle(60, 60, 50);
    var title = new PIXI.Text('BioBLESS', {fill: "#ffffff"});
    title.position.y = 45;
    title.position.x = 13;
    this.navigation_title.addChild(background2);
    this.navigation_title.addChild(title);
};

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
