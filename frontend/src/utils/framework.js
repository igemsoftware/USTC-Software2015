/** 
* @author USTC-software
* @description the frame
*/ 

/** 
* @description get current plugin stage
* @return {PIXI.Container} current plugin stage
*/ 
BioBLESS.zoom_function = function(d){
    if(!BioBLESS.stage)
        return;
    if(d > 0){
        if(BioBLESS.stage.movable_stage._scale > 3)
            return;
        BioBLESS.stage.movable_stage._scale *= 1.1;
    
    }else{
        if(BioBLESS.stage.movable_stage._scale < 0.1)
            return;
        BioBLESS.stage.movable_stage._scale /= 1.1;
    }
};

BioBLESS.scroll_animation = function(){
    if(BioBLESS.stage !== undefined){
        if(Math.abs(BioBLESS.stage.movable_stage.scale.x - BioBLESS.stage.movable_stage._scale) > 0.001){
            if(BioBLESS.stage.movable_stage.inPosition === null){
                BioBLESS.stage.movable_stage.inPosition = function(){};
                BioBLESS.stage.movable_stage.inPosition.x = BioBLESS.width / 2;
                BioBLESS.stage.movable_stage.inPosition.y = BioBLESS.height / 2;
            }
            BioBLESS.stage.movable_stage.position.x += (BioBLESS.stage.movable_stage.scale.x - BioBLESS.stage.movable_stage._scale) * 0.25 * BioBLESS.stage.movable_stage.inPosition.x;
            BioBLESS.stage.movable_stage.position.y += (BioBLESS.stage.movable_stage.scale.y - BioBLESS.stage.movable_stage._scale) * 0.25 * BioBLESS.stage.movable_stage.inPosition.y;
            BioBLESS.stage.movable_stage.scale.x -= (BioBLESS.stage.movable_stage.scale.x - BioBLESS.stage.movable_stage._scale) * 0.25;
            BioBLESS.stage.movable_stage.scale.y -= (BioBLESS.stage.movable_stage.scale.y - BioBLESS.stage.movable_stage._scale) * 0.25;
        }else
            BioBLESS.stage.movable_stage.scale.x = BioBLESS.stage.movable_stage.scale.y = BioBLESS.stage.movable_stage._scale;
    }
};



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
    var navigation_button = ["logic","gene_network","simulation","analysis","dna"];
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
            BioBLESS.navigation.button[j].title.scale.x *= 6.5 / navigation_button[j].length;
            BioBLESS.navigation.button[j].title.scale.y *= 6.5 / navigation_button[j].length;
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
    for(var w = 0; w < BioBLESS.navigation.button.length; w++){
        BioBLESS.navigation.button[w].interactive = true;
        BioBLESS.navigation.button[w].buttonMode = true;
    }
};
