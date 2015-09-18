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
        if(BioBLESS.stage.movable_stage._scale < 0.01)
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
        }
    }
};




BioBLESS.prepare_navigation = function(){
    var navigation_button = ["Logic","\n  Gene\nNetwork","Simulation","Analysis","\n    DNA\nSequence"];
	var navigation_plugin = ["logic","gene_network","simulation","analysis","dna"];
	var icon_urls = [BioBLESS.ustc_software.logic_logo_texture, BioBLESS.ustc_software.gene_network_logo_texture, BioBLESS.ustc_software.simulation_logo_texture, BioBLESS.ustc_software.analyse_logo_texture, BioBLESS.ustc_software.dna_logo_texture];
	var text_scale = [0.65, 0.5, 0.6, 0.6, 0.5];
	var text_y = [90, 95, 102, 100, 95];
	var icon_y = [0, 5, 10, 10, 5];
    BioBLESS.navigation = new PIXI.Container();
    var button_width = 120;
    var button_dis = (BioBLESS.height) / (navigation_button.length) * 5 / 6;
    if(button_dis < 120){
        button_dis = 120;
        BioBLESS.navigation.h = button_dis * (navigation_button.length + 1);
        this.navigation.scale.x = this.navigation.scale.y = BioBLESS.height / BioBLESS.navigation.h;
    }else
        BioBLESS.navigation.h = BioBLESS.height;
    BioBLESS.navigation.w = 120;
    var background = new PIXI.Graphics();
    background.beginFill(0x808080, 1);
    background.lineStyle(0);
    background.drawRect(0, 0, this.navigation.w, this.navigation.h);
    background.endFill();
	background.interactive = true;
	this.navigation.addChild(background);
	var tag = new PIXI.Graphics();
	tag.beginFill(0xffffff, 1);
	tag.drawRect(0, 0, 120, 120);
	tag.endFill();
	BioBLESS.navigation.addChild(tag);
	
    BioBLESS.navigation.button = [];
    var onmousedown_obj = function() {
        if(BioBLESS[this.plugin] !== undefined){
             BioBLESS.change_stage(BioBLESS[this.plugin]);
		}
    };
	var mouse_over = function(){
	    if(this.is_out){
		    this.is_out = false;
			this.bg.beginFill(0xffffff, 1);
			this.bg.drawRect(0, 0, 120, 120);
			this.bg.endFill();
		}
	};
	var mouse_out = function(){
	    if(!this.is_out){
		    this.is_out = true;
			this.bg.clear();
		}
	};
    for(var i = 0; i < navigation_button.length; i++){
	    BioBLESS.navigation.button[i] = new PIXI.Container();
		BioBLESS.navigation.button[i].y = BioBLESS.height / 12 + i * button_dis;
		BioBLESS.navigation.button[i].is_out = true;
		var bg = new PIXI.Graphics();
		BioBLESS.navigation.button[i].addChild(bg);
		BioBLESS.navigation.button[i].bg = bg;
		var icon = new PIXI.Sprite(icon_urls[i]);
		icon.anchor.x = 0.5;
		icon.scale.x = icon.scale.y = 0.07;
		icon.x = 60;
		icon.y = icon_y[i];
		BioBLESS.navigation.button[i].addChild(icon);
		var title = new PIXI.Text(navigation_button[i]);
		title.anchor.x = 0.5;
		title.anchor.y = 0.5;
		title.scale.x = title.scale.y = text_scale[i];
		title.x = 60;
		title.y = text_y[i];
		BioBLESS.navigation.button[i].addChild(title);
        BioBLESS.navigation.button[i].interactive = true;
		BioBLESS.navigation.button[i].buttonMode = true;
		BioBLESS.navigation.button[i].plugin = navigation_plugin[i];
        BioBLESS.navigation.button[i].on('click', onmousedown_obj)
		                             .on('mouseover', mouse_over)
									 .on('mouseout', mouse_out);
		BioBLESS.navigation.addChild(BioBLESS.navigation.button[i]);
		BioBLESS[navigation_plugin[i]].tag_index = i;
    }
	if(BioBLESS.now_plugin)
	    tag.y = BioBLESS.navigation.button[BioBLESS.now_plugin.tag_index].y;
    else
        tag.y = BioBLESS.navigation.button[0].y;
	BioBLESS.navigation.tag = tag;
    
};
