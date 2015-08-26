BioBLESS.analysis.init = function() {
    this.stage = BioBLESS.utils.init_stage();
    this.draw();
};
BioBLESS.analysis.create_output_stage1 = function(items, max_values, min_values){
    var stage = new PIXI.Container();
    return stage;
};
BioBLESS.analysis.create_output_stage2 = function(items, max_values, min_values){
    var stage = new PIXI.Container();
    return stage;
};
BioBLESS.analysis.create_dialog = function(items, on_ok){
    var stage = new PIXI.Container();
    var mask = new PIXI.Graphics();
    mask.beginFill(0, 0);
    mask.drawRect(-1000, -1000, 3000, 5000);
    mask.interactive = true;
    mask.on('click', function(){stage.del();});
    stage.addChild(mask);
    var bg = new PIXI.Graphics();
    bg.beginFill(0x333333, 1);
    bg.drawRoundedRect(0, 0, 500, 80, 20);
    bg.endFill();
    bg.interactive = true;
    stage.addChild(bg);
    
    var title = new PIXI.Text(items[0]);
    stage.i = 0;
    title.x = 55;
    title.y = 25;
    var title_bg = new PIXI.Graphics();
    title_bg.beginFill(0xffffff, 1);
    title_bg.drawRect(50, 20, 195, 40);
    title_bg.endFill();
    title_bg.beginFill(0x000000, 1);
    title_bg.moveTo(240, 32);
    title_bg.lineTo(217, 32);
    title_bg.lineTo(228.5, 52);
    title_bg.endFill();
    title_bg.scroll_area = BioBLESS.gene_network.create_scroll_area(items, 195);
    var scroll_area_mask = new PIXI.Graphics();
    scroll_area_mask.beginFill(0, 0);
    scroll_area_mask.drawRect(-1000, -1000, 1000, 3000);
    scroll_area_mask.drawRect(195, -1000, 1000, 3000);
    scroll_area_mask.drawRect(0, -1000, 195, 1000);
    scroll_area_mask.drawRect(0, items.length * 40, 195, 1000);
    scroll_area_mask.endFill();
    scroll_area_mask.interactive = true;
    scroll_area_mask.on('click', function(){
        title_bg.is_view = false;
        stage.removeChild(title_bg.scroll_area);
    });
    title_bg.scroll_area.addChild(scroll_area_mask);
    title_bg.scroll_area.x = 50;
    title_bg.scroll_area.y = 61;
    title_bg.scroll_area.alpha = 0.8;
    title_bg.interactive = true;
    title_bg.buttonMode = true;
    title_bg.on("click", function(){
        if(this.is_view){
            this.is_view = false;
            this.parent.removeChild(this.scroll_area);
        }else{
            this.is_view = true;
            
            this.parent.addChild(this.scroll_area);
            this.parent.addChild(title_bg);
            this.parent.addChild(title);
            var buttons = this.scroll_area.buttons;
            var that = this;
            var on_click = function(){
                stage.i = this.i;
                title.text = items[this.i];
                that.is_view = false;
                that.parent.removeChild(that.scroll_area);
            };
            for(var i = 0; i < buttons.length; i++){
                buttons[i].bg.i = i;
                buttons[i].bg.on("click", on_click);
            };
        }
    });
    stage.addChild(title_bg);
    stage.addChild(title);
    
    var input = BioBLESS.gene_network.create_textarea(211, 51);
    input.value = "0";
    input.style.left = (BioBLESS.width / 2).toString() + "px";
    input.style.top = ((BioBLESS.height - 80) / 2 + 19).toString() + "px";
    $("body").append(input);
    
    var on_key_down = function(event){
        var code = event.keyCode||event.which;
        if(code === 13|| code === 32){
            stage.del();
            on_ok(items[stage.i], parseFloat(input.value));
        }else if(((code >= 48) && (code <= 57)) || code === 8 || code === 0 || ((code >= 96) && (code <= 105)) || code === 37 || code === 39){
        }else{
            if(code === 46 || code === 110 || code === 190){
                var num = 0;
                for(var i = 0; i < input.value.length; i++){
                    if(input.value[i] === '.')
                         num++;
                };
                if(num === 0){
                    if(input.value === "")
                        input.value = "0";
                    return;
                }
            }
            if(window.event){
                event.returnValue = false;
            }
            if(event.preventDefault){
                event.preventDefault(); //for firefox 
            }
        }
    };
    input.onkeydown = on_key_down;
    input.onkeypress = on_key_down;
    
    stage.del = function(){
        $("#" + input.id).remove();
        stage.parent.removeChild(stage);
    };
    
    return stage;
};
BioBLESS.analysis.create_scroll_area = function(){
    var contain = new PIXI.Container();
    var stage = BioBLESS.logic.create_scrollarea(contain, 250, 260, BioBLESS.height - 300);
    var buttons = [];
    var mouse_over = function(){
        if(this.is_out){
            this.is_out = false;
            this.bg.clear();
            this.bg.beginFill(0x555555, 1);
            this.bg.drawRect(0, 0, 260, 50);
            this.bg.endFill();
            BioBLESS.scroll_function = stage.scroll_function;
        }
    };
    var mouse_out = function(){
        if(!this.is_out){
            this.is_out = true;
            this.bg.clear();
            this.bg.beginFill(0, 0);
            this.bg.drawRect(0, 0, 260, 40);
            this.bg.endFill();
        }
    };
    var on_click = function(){
        var that = this;
        var on_ok = function(name, value){
            that.removeChildren();
            that.interactive = false;
            that.buttonMode = false;
            var stage = BioBLESS.gene_network.create_inputitem(name, value, 250);
            stage.y = 5;
            stage.change_value = function(){};
            
            that.addChild(stage);
        };
        var dialog = BioBLESS.analysis.create_dialog(["123", "456", "789"], on_ok);
        dialog.x = (BioBLESS.width - 500) / 2;
        dialog.y = (BioBLESS.height - 80) / 2;
        BioBLESS.base_stage.addChild(dialog);
    };
    for(var i = 0; i < 5; i++){
        buttons[i] = new PIXI.Container();
        var bg = new PIXI.Graphics();
        buttons[i].addChild(bg);
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, 250, 50);
        bg.endFill();
        var add = new PIXI.Graphics();
        add.lineStyle(5, 0x00ff00, 1);
        add.moveTo(-20, 0);
        add.lineTo(20, 0);
        add.moveTo(0, 20);
        add.lineTo(0, -20);
        add.x = 125;
        add.y = 25;
        buttons[i].addChild(add);
        buttons[i].y = i * 50;
        buttons[i].interactive = true;
        buttons[i].buttonMode = true;
        buttons[i].is_out = true;
        buttons[i].bg = bg;
        buttons[i].add = add;
        buttons[i].on('mouseover', mouse_over)
                  .on('mouseout', mouse_out)
                  .on('click', on_click);
        contain.addChild(buttons[i]);
    };
    
    var mask = new PIXI.Graphics();
    mask.beginFill(0, 0);
    mask.drawRect(0, -1000, 260, 1000);
    mask.drawRect(0, BioBLESS.height - 300, 260, 1000);
    mask.endFill();
    mask.interactive = true;
    stage.addChild(mask);
    
    return stage;
};
BioBLESS.analysis.create_right_stage = function(){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x333333, 1);
    bg.drawRect(0, 0, 300, BioBLESS.height);
    bg.endFill();
    stage.addChild(bg);
    stage.x = BioBLESS.width - 300;
    
    var scroll_area = BioBLESS.analysis.create_scroll_area();
    scroll_area.x = 20;
    scroll_area.y = 220;
    stage.addChild(scroll_area);
    
    var score = new PIXI.Text("Score:");
    score.style.fill = "white";
    score.x = 20;
    score.y = 20;
    stage.addChild(score);
    
    var score_num = new PIXI.Text("6");
    score_num.style.fill = "white";
    score_num.x = 50 + score.width;
    score_num.y = 20;
    stage.addChild(score_num);
    
    var change_rate = new PIXI.Text("Change rate:");
    change_rate.style.fill = "white";
    change_rate.x = 20;
    change_rate.y = 70;
    stage.addChild(change_rate);
    var change_buttons = [];
    var on_change = function(){
        for(var i = 0; i < change_buttons.length; i++){
            change_buttons[i].alpha = 0.5;
        };
        this.alpha = 1;
        stage.change_rate =  (this.i + 1) * 0.05;
    };
    
    for(var i = 0; i < 3; i++){
        change_buttons[i] = BioBLESS.logic.create_textbutton(((i + 1) * 5).toString() + "%", 60, 40, 0x000000);
        change_buttons[i].i = i;
        change_buttons[i].y = 120;
        change_buttons[i].x = 45 + i * 75;
        change_buttons[i].alpha = 0.5;
        change_buttons[i].interactive = true;
        change_buttons[i].buttonMode = true;
        change_buttons[i].on('click', on_change);
        stage.addChild(change_buttons[i]);
    };
    
    change_buttons[0].alpha = 1;
    stage.change_rate = 0.05;
    
    var parameter = new PIXI.Text("Parameter:");
    parameter.style.fill = "white";
    parameter.x = 20;
    parameter.y = 170;
    stage.addChild(parameter);
    
    
    
    
    var OK = BioBLESS.logic.create_textbutton("OK", 100, 40, 0x000000);
    OK.x = 100;
    OK.y = BioBLESS.height - 60;
    
    stage.addChild(OK);
    
    return stage;
};
BioBLESS.analysis.draw = function(){
    var right_stage = this.create_right_stage();
    this.stage.addChild(right_stage);
};