BioBLESS.analysis.init = function() {
    this.stage = BioBLESS.utils.init_stage();
    this.draw();
};
BioBLESS.analysis.calculate = function(){
    var items = [];
    var num = 0;
    for(var o in BioBLESS.analysis.parameters){
         items[num] = {};
         items[num].name = o;
         items[num].max_value = Math.random() * 2;
         items[num].min_value = Math.random() * 2;
         num++;
    }
    return items;
};
BioBLESS.analysis.draw_oxy = function(x_l, y_l){
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.moveTo(0, 0);
    graphics.lineTo(x_l, 0);
    graphics.lineTo(x_l - 20, - 10);
    graphics.lineTo(x_l, 0);
    graphics.lineTo(0, 0);
    graphics.lineTo(0, 0 - y_l);
    graphics.lineTo(0 + 10, 20 - y_l);
    graphics.lineTo(0, 0 - y_l);/////////绘制坐标主轴
    return graphics;
};
BioBLESS.analysis.create_output_stage1 = function(items, origin_value){
    var xAxis = 1100, yAxis = 600;//轴长
    var ox = 350, oy = 800;//原点坐标
    var stage = new PIXI.Container();
    var oxy = BioBLESS.analysis.draw_oxy(xAxis, yAxis);
    oxy.x = ox;
    oxy.y = oy;
    stage.addChild(oxy);
    
    var items_num = items.length;
    var dis = xAxis / (items_num + 1);
    
    var origin_y = 1;
    for(var i = 0; i < items_num; i++){
        if(origin_y > origin_value / items[i].max_value)
            origin_y = origin_value / items[i].max_value;
    }
    if(origin_y > 0.5)
        origin_y = 0.5;
    else
        origin_y *= 0.8;    
    origin_y *= yAxis;
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.moveTo(ox, oy - origin_y);
    graphics.lineTo(ox + 15, oy - origin_y);
    graphics.lineStyle(0, 0, 0);
    
    var origin_name = new PIXI.Text(origin_value.toString());
    origin_name.style.fill = "white";
    origin_name.anchor.x = 1;
    origin_name.anchor.y = 0.5;
    origin_name.x = ox - 5;
    origin_name.y = oy - origin_y;
    stage.addChild(origin_name);
    
    for(var j = 0; j < items_num; j++){
        var name = new PIXI.Text(items[j].name);
        name.style.fill = "white";
        name.x = ox + (j + 1) * dis;
        name.y = oy + 15;
        name.anchor.x = name.anchor.y = 0.5;
        stage.addChild(name);
        graphics.beginFill(0x0000ff, 1);
        graphics.drawCircle(name.x, oy - origin_y, 5);
        graphics.endFill();
        
        graphics.beginFill(0xff0000, 1);
        graphics.drawCircle(name.x, oy - (origin_y / origin_value * items[j].max_value), 5);
        graphics.endFill();
        
        graphics.beginFill(0x00ff00, 1);
        graphics.drawCircle(name.x, oy - (origin_y / origin_value * items[j].min_value), 5);
        graphics.endFill();
    }
    
    stage.addChild(graphics);
    return stage;
};
BioBLESS.analysis.create_output_stage2 = function(items){
    var xAxis = 1100, yAxis = 600;//轴长
    var ox = 350, oy = 800;//原点坐标
    var stage = new PIXI.Container();
    var oxy = BioBLESS.analysis.draw_oxy(xAxis, yAxis);
    oxy.x = ox;
    oxy.y = oy;
    
    
    var items_num = items.length;
    var dis = xAxis / (items_num + 1);
    
    var max_num = 0;
    for(var i = 0; i < items_num; i++){
        if(max_num < Math.abs(items[i].max_value - items[i].min_value))
            max_num = Math.abs(items[i].max_value - items[i].min_value);
    }
    
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0x00ff00, 1);
    
    
    
    for(var j = 0; j < items_num; j++){
        var name = new PIXI.Text(items[j].name);
        name.style.fill = "white";
        name.x = ox + (j + 1) * dis;
        name.y = oy + 15;
        name.anchor.x = name.anchor.y = 0.5;
        stage.addChild(name);
        var h = Math.abs(items[j].max_value - items[j].min_value) / max_num * 0.9 * yAxis;
        graphics.drawRect(name.x - dis / 4, oy - h, dis / 2, h);
        
        var num = new PIXI.Text((Math.round(Math.abs(items[j].max_value - items[j].min_value) * 100) / 100).toString());
        num.style.fill = "white";
        num.anchor.x = 0.5;
        num.anchor.y = 1;
        num.x = name.x;
        num.y = oy - h - 5;
        
        stage.addChild(num);
        
    }
    
    stage.addChild(graphics);
    stage.addChild(oxy);
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
            }
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
                }
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
                event.preventDefault(); //for firef0 
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
            stage.change_value = function(v){BioBLESS.analysis.parameters[name] = v;};
            that.addChild(stage);
            BioBLESS.analysis.parameters[name] = value;
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
    }
    
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
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, 300, BioBLESS.height);
    bg.endFill();
    stage.addChild(bg);
    stage.x = BioBLESS.width - 300;
    
    var scroll_area = BioBLESS.analysis.create_scroll_area();
    scroll_area.x = 20;
    scroll_area.y = 220;
    stage.addChild(scroll_area);
    
    var score = new PIXI.Text("Score:");
    score.x = 20;
    score.y = 20;
    stage.addChild(score);
    
    var score_num = new PIXI.Text("6");
    score_num.x = 50 + score.width;
    score_num.y = 20;
    stage.addChild(score_num);
    
    var change_rate = new PIXI.Text("Change rate:");
    change_rate.x = 20;
    change_rate.y = 70;
    stage.addChild(change_rate);
    var change_buttons = [];
    var on_change = function(){
        for(var i = 0; i < change_buttons.length; i++){
            change_buttons[i].alpha = 0.5;
        }
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
    }
    
    change_buttons[0].alpha = 1;
    stage.change_rate = 0.05;
    
    var parameter = new PIXI.Text("Parameter:");
    parameter.x = 20;
    parameter.y = 170;
    stage.addChild(parameter);
    
    
    
    
    var OK = BioBLESS.logic.create_textbutton("OK", 100, 40, 0x000000);
    OK.x = 100;
    OK.y = BioBLESS.height - 60;
    OK.interactive = true;
    OK.buttonMode = true;
    OK.on('click', function(){
        var items = BioBLESS.analysis.calculate();
        if(items.length === 0)
            return;
        var output1 = BioBLESS.analysis.create_output_stage1(items, 1);
        var output2 = BioBLESS.analysis.create_output_stage2(items);
        output1.scale.x = output1.scale.y = output2.scale.x = output2.scale.y = (BioBLESS.width - 420) / 3200;
        output1.y = output2.y = (BioBLESS.height - 900 * output1.scale.x) / 2;
        output1.x = 100;
        output2.x = 120 + output1.scale.x * 1450;
        BioBLESS.analysis.stage.movable_stage.removeChildren();
        BioBLESS.analysis.stage.movable_stage._scale = 1;
        BioBLESS.analysis.stage.movable_stage.addChild(output1);
        BioBLESS.analysis.stage.movable_stage.addChild(output2);
    });
    
    stage.addChild(OK);
    
    return stage;
};
BioBLESS.analysis.draw = function(){
    this.parameters = {};
    var right_stage = this.create_right_stage();
    this.stage.addChild(this.stage.movable_stage);
    this.stage.addChild(right_stage);
};
