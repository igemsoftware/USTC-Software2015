BioBLESS.analysis.init = function() {
    this.stage = BioBLESS.utils.init_stage();
};
BioBLESS.analysis.onchange = function(){
    this.draw();
};
BioBLESS.analysis.calculate_c = function(data){
    var t = data.t[data.t.length - 1] * 0.7;
    var n = 0;
    var out = 0;
    for(var i = data.t.length - 1; i > 0; i--){
        if(data.t[i] > t){
            out = out / (n + 1) * n + data["S" + BioBLESS.gene_network.out_index.toString()][i] / (n + 1);
            n++;
        }else break;
    }
    return out;
};
BioBLESS.analysis.calculate_item = function(){
    if(BioBLESS.analysis.now_index < BioBLESS.analysis.scroll_area.items.length){
        var new_i = BioBLESS.analysis.items_parameters.length;
        BioBLESS.analysis.items_parameters[new_i] = {};
        var item_p = BioBLESS.analysis.items_parameters[new_i];
        item = BioBLESS.analysis.scroll_area.items[BioBLESS.analysis.now_index];
        item_p.name = item.title._text;
        var parameter = BioBLESS.gene_network.clone(BioBLESS.gene_network.get_parameters());
        var _parameter = BioBLESS.gene_network.clone(BioBLESS.gene_network.get_parameters());
        var count = -1;
        var k;
        for(k = 0; k < parameter.nodes.length; k++){
            if(parameter.nodes[k] !== "INPUT")
                count++;
            if(count === item.d_i)
                break;
        }
        parameter.simulation_parameters[k][item.map_id][item.params_o] *= 1 + BioBLESS.analysis.change_rate;
        _parameter.simulation_parameters[k][item.map_id][item.params_o] *= 1 - BioBLESS.analysis.change_rate;
        
        $.ajax({
            type: 'POST',
            url: '/simulate/',
            contentType: 'application/json',
            data: JSON.stringify(parameter),
            success: function(data) {
                item_p.max_value = BioBLESS.analysis.calculate_c(data);
                $.ajax({
                    type: 'POST',
                    url: '/simulate/',
                    contentType: 'application/json',
                    data: JSON.stringify(_parameter),
                    success: function(_data) {
                        item_p.min_value = BioBLESS.analysis.calculate_c(_data);
                        BioBLESS.analysis.show();
                        BioBLESS.analysis.calculate_item();
                    }
                });
            }
        });
        BioBLESS.analysis.now_index++;
    }else if(BioBLESS.analysis.OK){
        BioBLESS.analysis.OK.alpha = 1;
        BioBLESS.analysis.OK.interactive = true;
        BioBLESS.analysis.OK.buttonMode = true;
    }
        
    
};
BioBLESS.analysis.calculate = function(){
	this.stage.movable_stage.x = 0;
	this.stage.movable_stage.y = 0;
    this.stage.movable_stage._scale = 1;
	this.stage.movable_stage.scale.x = this.stage.movable_stage.scale.y = 1;
    this.stage.movable_stage.removeChildren();
    BioBLESS.analysis.items_parameters = [];
    BioBLESS.analysis.now_index = 0;
    var parameter = BioBLESS.gene_network.get_parameters();
	$.ajax({
        type: 'POST',
        url: '/simulate/',
        contentType: 'application/json',
        data: JSON.stringify(parameter),
        success: function(data) {
		    BioBLESS.analysis.standard_c = Math.round(BioBLESS.analysis.calculate_c(data) * 10000) / 10000;
            BioBLESS.analysis.calculate_item();
		}
    });
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
	
    var y_name = new PIXI.Text("Molecule number");
    y_name.style.fill = "white";
    y_name.anchor.x = 1;
    y_name.anchor.y = 0.5;
    y_name.x = ox - 5;
    y_name.y = oy - yAxis + 5;
    stage.addChild(y_name);
    
    var x_name = new PIXI.Text("Parameter");
    x_name.style.fill = "white";
    x_name.anchor.x = 1;
    x_name.x = ox + xAxis + 65;
    x_name.y = oy + 5;
    stage.addChild(x_name);
    
	for(var j = 0; j < items_num; j++){
        var name = new PIXI.Text(items[j].name);
        name.style.fill = "white";
        name.x = ox + (j + 1) * dis;
        name.y = oy + 15;
        name.anchor.x = name.anchor.y = 0.5;
        stage.addChild(name);
        graphics.beginFill(0x0000ff, 1);
        graphics.drawCircle(name.x, oy - origin_y, 15);
        graphics.endFill();
        
        graphics.beginFill(0xff0000, 1);
        graphics.drawCircle(name.x, oy - (origin_y / origin_value * items[j].max_value), 15);
        graphics.endFill();

        graphics.beginFill(0x00ff00, 1);
        graphics.drawCircle(name.x, oy - (origin_y / origin_value * items[j].min_value), 15);
        graphics.endFill();
	}
    
    graphics.beginFill(0x0000ff, 1);
    graphics.drawCircle(ox + xAxis / 4 - 20, oy - yAxis - 15, 15);
    graphics.endFill();
    
    var text1 = new PIXI.Text(": 0%");
    text1.anchor.y = 0.5;
    text1.style.fill = "white";
    text1.x = ox + xAxis / 4 + 10;
    text1.y = oy - yAxis - 15;
    stage.addChild(text1);
    
    graphics.beginFill(0xff0000, 1);
    graphics.drawCircle(ox + xAxis / 4 * 2 - 20, oy - yAxis - 15, 15);
    graphics.endFill();
    
    var text2 = new PIXI.Text(": +" + Math.floor(BioBLESS.analysis.change_rate * 100 + 0.5) + "%");
    text2.anchor.y = 0.5;
    text2.style.fill = "white";
    text2.x = ox + xAxis / 4 * 2 + 10;
    text2.y = oy - yAxis - 15;
    stage.addChild(text2);
    

    graphics.beginFill(0x00ff00, 1);
    graphics.drawCircle(ox + xAxis / 4 * 3 - 20, oy - yAxis - 15, 15);
    graphics.endFill();
    
    var text3 = new PIXI.Text(": -" + Math.floor(BioBLESS.analysis.change_rate * 100 + 0.5) + "%");
    text3.anchor.y = 0.5;
    text3.style.fill = "white";
    text3.x = ox + xAxis / 4 * 3 + 10;
    text3.y = oy - yAxis - 15;
    stage.addChild(text3);
	
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
	
	var y_name = new PIXI.Text("Robustness");
    y_name.style.fill = "white";
    y_name.anchor.x = 1;
    y_name.anchor.y = 0.5;
    y_name.x = ox - 5;
    y_name.y = oy - yAxis + 5;
    stage.addChild(y_name);
    
    var x_name = new PIXI.Text("Parameter");
    x_name.style.fill = "white";
    x_name.anchor.x = 1;
    x_name.x = ox + xAxis + 65;
    x_name.y = oy + 5;
    stage.addChild(x_name);
    
	var items_num = items.length;
	var dis = xAxis / (items_num + 1);
	
	var max_num = 0;
	for(var i = 0; i < items_num; i++){
	    if(max_num < Math.abs((items[i].max_value - items[i].min_value) / this.standard_c * 100))
		    max_num = Math.abs((items[i].max_value - items[i].min_value) / this.standard_c * 100);
	}
	if(max_num === 0)
        max_num = 0.0001;
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xffffff, 1);
	
	
	
	for(var j = 0; j < items_num; j++){
	    var name = new PIXI.Text(items[j].name);
		name.style.fill = "white";
		name.x = ox + (j + 1) * dis;
		name.y = oy + 15;
		name.anchor.x = name.anchor.y = 0.5;
		stage.addChild(name);
		var h = Math.abs((items[j].max_value - items[j].min_value) / this.standard_c * 100) / max_num * 0.9 * yAxis;
		graphics.drawRect(name.x - dis / 4, oy - h, dis / 2, h);
		
		var num = new PIXI.Text((Math.round(Math.abs((items[j].max_value - items[j].min_value) / this.standard_c * 100) * 100) / 100).toString() + "%");
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

/**
 * create an inputarea of device
 * @function
 */
BioBLESS.analysis.create_inputarea = function(device, index, h){
    var stage = new PIXI.Container();
    var contain = new PIXI.Container();
    var num = 0;
    var y = 5;
    var on_click = function(){
        device.map[this.i].params_chosen[this.o] = true;
        var item = BioBLESS.analysis.create_scroll_item("d" + index.toString() + "-" + this.map_id + "-" + this.title, 260, 50);
        item.d_i = index;
        item.map_id = this.map_id;
        item.params_o = this.o;
        BioBLESS.analysis.scroll_area.items[BioBLESS.analysis.scroll_area.items.length] = item;
        BioBLESS.analysis.scroll_area.redraw();
        BioBLESS.analysis.dialog.parent.removeChild(BioBLESS.analysis.dialog);
    };
    for(var i = 0; i < device.map.length; i++){
        var j = 0;
        
        if(device.map[i].params_chosen === undefined)
            device.map[i].params_chosen = {};
        else{
            var temp = false;
            for(var o in device.map[i].params_chosen){
                if(device.map[i].params_chosen[o] !== true){
                    temp = true;
                    break;
                }
            }
            if(!temp)
                continue;
        }
        var describe = new PIXI.Text("(" + BioBLESS.analysis.devices[index].map[i].id + ")" + BioBLESS.gene_network.describe_map_item(BioBLESS.analysis.devices[index], i) + ":");
        describe.style.wordWrap = true;
        describe.style.wordWrapWidth = 445;
        describe.style.font = 'bold 17px Arial';
        describe.y = y;
        describe.x = 5;
        y += describe.height + 5;
        contain.addChild(describe);
        for(var oi in device.map[i].params){
            if(device.map[i].params_chosen[oi] === true)
                continue;
            device.map[i].params_chosen[oi] = false;
            var item = BioBLESS.analysis.create_scroll_item(oi, 460, 50);
            item.y = y;
            contain.addChild(item);
            item.i = i;
            item.o = oi;
            item.index = index;
            item.map_id = device.map[i].id;
            item.title = oi;
            item.on('click', on_click);
            y += 50;
        }
        y += 5;
    }

    stage.inputarea = BioBLESS.logic.create_scrollarea(contain, y, 460, Math.round((h - 230) / 50) * 50);
    stage.inputarea.x = 20;
    stage.inputarea.y = 140;
    stage.inputarea.scroll_fun = function(){
        if(BioBLESS.gene_network.textarea !== undefined){
            BioBLESS.gene_network.textarea.del();
            BioBLESS.gene_network.textarea = undefined;
        }
    };

    var mask = new PIXI.Graphics();
    mask.beginFill(0, 0);
    mask.drawRect(0, -1000, 460, 1000);
    mask.drawRect(0, Math.round((h - 180) / 50) * 50, 460, 1000);
    mask.endFill();
    mask.interactive = true;
    stage.inputarea.addChild(mask);
    stage.addChild(stage.inputarea);
    
    return stage;
};

BioBLESS.analysis.create_scroll_item = function(title, w, h){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0, 0);
    bg.drawRect(0, 0, w, h);
    bg.endFill();
    stage.addChild(bg);
    title = new PIXI.Text(title);
    title.anchor.x = title.anchor.y = 0.5;
    title.x = w / 2;
    title.y = h / 2;
    stage.addChild(title);
    
    var mouse_over = function(){
        if(this.is_out){
            this.is_out = false;
            this.bg.clear();
            this.bg.beginFill(0x555555, 1);
            this.bg.drawRect(0, 0, w, h);
            this.bg.endFill();
            BioBLESS.scroll_function = stage.parent.parent.scroll_function;
        }
    };
    var mouse_out = function(){
        if(!this.is_out){
            this.is_out = true;
            this.bg.clear();
            this.bg.beginFill(0, 0);
            this.bg.drawRect(0, 0, w, h);
            this.bg.endFill();
        }
    };
    stage.interactive = true;
    stage.buttonMode = true;
    stage.is_out = true;
    stage.bg = bg;
    stage.h = 60;
    stage.on('mouseover', mouse_over)
         .on('mouseout', mouse_out);
    stage.title = title;
    return stage;
};

BioBLESS.analysis.create_dialog = function(h){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    var title = new PIXI.Text("NULL");
    bg.beginFill(0x888888, 1);
    bg.drawRoundedRect(0, 0, 500, h, 10);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    stage.x = (BioBLESS.width - 500) / 2;
    stage.y = (BioBLESS.height - h) / 2;
    var dialog_mask = new PIXI.Graphics();
    dialog_mask.beginFill(0, 0);
    dialog_mask.drawRect(-1000, -1000, 3000, 1000);
    dialog_mask.drawRect(-1000, h, 3000, 1000);
    dialog_mask.drawRect(-1000, 0, 1000, h);
    dialog_mask.drawRect(500, 0, 1000, h);
    dialog_mask.interactive = true;
    dialog_mask.on('click', function(){stage.parent.removeChild(stage);});
    
    var title_bg = new PIXI.Graphics();
    title_bg.beginFill(0xffffff, 1);
    title_bg.drawRect(20, 30, 460, 40);
    title_bg.endFill();
    title_bg.beginFill(0x000000, 1);
    title_bg.moveTo(470, 40);
    title_bg.lineTo(447, 40);
    title_bg.lineTo(458.5, 60);
    title_bg.endFill();
    title_bg.interactive = true;
    title_bg.buttonMode = true;
    title_bg.is_view = false;
    var items = [];
    for(var i = 0; i < BioBLESS.analysis.devices.length; i++){
        items[i] = "device " + i.toString();
    }
    title_bg.scroll_area = BioBLESS.gene_network.create_scroll_area(items, 460);
    title_bg.scroll_area.on_click_outside = function(){
        title_bg.is_view = false;
        stage.removeChild(title_bg.scroll_area);
    };
    title_bg.scroll_area.x = 20;
    title_bg.scroll_area.y = 71;
    title_bg.scroll_area.alpha = 0.8;
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
                title.text = items[this.i];
                that.is_view = false;
                that.parent.removeChild(that.scroll_area);
                that.parent.removeChild(that.parent.inputarea);
                that.parent.inputarea = BioBLESS.analysis.create_inputarea(BioBLESS.analysis.devices[this.i], this.i, h);
                that.parent.addChild(that.parent.inputarea);
                stage.addChild(title_bg);
                stage.addChild(title);
                stage.addChild(dialog_mask);
            };
            for(var i = 0; i < buttons.length; i++){
                buttons[i].bg.i = i;
                buttons[i].bg.on("click", on_click);
            }
        }
    });
    
    
   
    
    title.x = 25;
    title.y = 35;
   
    
    var parameter = new PIXI.Text("Parameter:");
    parameter.x = 20;
    parameter.y = 100;
    stage.addChild(parameter);
    
    
    
    if(BioBLESS.analysis.devices.length > 0){
        title.text = "device 0";
        stage.inputarea = BioBLESS.analysis.create_inputarea(BioBLESS.analysis.devices[0], 0, h);
        stage.addChild(stage.inputarea);
    }
    stage.addChild(title_bg);
    stage.addChild(title);
    stage.addChild(dialog_mask);
    
    
    return stage;
};
BioBLESS.analysis.create_scroll_area = function(h){
    var contain = new PIXI.Container();
    var stage = BioBLESS.logic.create_scrollarea(contain, 250, 260, h - 300);
    var _stage = new PIXI.Container();
    var mouse_over = function(){
        if(this.is_out){
            this.is_out = false;
            this.bg.clear();
            this.bg.beginFill(0x555555, 1);
            this.bg.drawRect(0, 0, 260, 60);
            this.bg.endFill();
            BioBLESS.scroll_function = stage.scroll_function;
        }
    };
    var mouse_out = function(){
        if(!this.is_out){
            this.is_out = true;
            this.bg.clear();
            this.bg.beginFill(0, 0);
            this.bg.drawRect(0, 0, 260, 60);
            this.bg.endFill();
        }
    };
    var on_click = function(){
        var dialog = BioBLESS.analysis.create_dialog((BioBLESS.height - 300) > 500 ? (BioBLESS.height - 300) : 500);
        BioBLESS.analysis.dialog = dialog;
        BioBLESS.base_stage.addChild(dialog);
    };
    var add_button = new PIXI.Container();
    var bg = new PIXI.Graphics();
    add_button.addChild(bg);
    bg.beginFill(0, 0);
    bg.drawRect(0, 0, 250, 60);
    bg.endFill();
    var add = new PIXI.Graphics();
    add.lineStyle(5, 0xffffff, 1);
    add.moveTo(-20, 0);
    add.lineTo(20, 0);
    add.moveTo(0, 20);
    add.lineTo(0, -20);
    add.x = 125;
    add.y = 30;
    add_button.addChild(add);
    add_button.interactive = true;
    add_button.buttonMode = true;
    add_button.is_out = true;
    add_button.bg = bg;
    add_button.add = add;
    add_button.h = 60;
    add_button.on('mouseover', mouse_over)
              .on('mouseout', mouse_out)
              .on('click', on_click);
    contain.addChild(add_button);
    var mask = new PIXI.Graphics();
    mask.beginFill(0, 0);
    mask.drawRect(0, -1000, 260, 1000);
    mask.drawRect(0, h - 300, 260, 1000);
    mask.endFill();
    mask.interactive = true;
    _stage.addChild(mask);
    _stage.addChild(stage);
    _stage.items = [];
    _stage.redraw = function(){
        this.removeChildren();
        contain.removeChildren();
        var y = 0;
        for(var i = 0; i < this.items.length; i++){
            _stage.items[i].y = y;
            y += _stage.items[i].h;
            contain.addChild(_stage.items[i]);
        }
        if(this.items.length < 5){
            add_button.y = y;
            contain.addChild(add_button);
        }
        var s = BioBLESS.logic.create_scrollarea(contain, 250, 260, h - 300);
        _stage.addChild(s);
    };
    BioBLESS.analysis.scroll_area = _stage;
    return _stage;
};
BioBLESS.analysis.create_right_stage = function(h){
    var stage = new PIXI.Container();
    var bg = new PIXI.Graphics();
    bg.beginFill(0x888888, 1);
    bg.drawRect(0, 0, 300, h);
    bg.endFill();
    stage.addChild(bg);
    stage.x = BioBLESS.width - 300;
    
    var scroll_area = BioBLESS.analysis.create_scroll_area(h);
    scroll_area.x = 20;
    scroll_area.y = 220;
    stage.addChild(scroll_area);
    
    var score = new PIXI.Text("Score:");
    score.x = 20;
    score.y = 20;
    stage.addChild(score);
    
    var score_num = new PIXI.Text("unknow");
    score_num.x = 50 + score.width;
    score_num.y = 20;
    stage.addChild(score_num);
    this.score_num = score_num;
    
    $.ajax({
        type: 'POST',
        url: '/score/',
        contentType: 'application/json',
        data: JSON.stringify(BioBLESS.logic.circuit),
        success: function(data) {
		    score_num.text = (Math.round(data.score * 100) / 100).toString();
		}
    });
    
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
        BioBLESS.analysis.change_rate =  (this.i + 1) * 0.05;
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
    BioBLESS.analysis.change_rate = 0.05;
    
    var parameter = new PIXI.Text("Parameter:");
    parameter.x = 20;
    parameter.y = 170;
    stage.addChild(parameter);
    
    
    
    
    var OK = BioBLESS.logic.create_textbutton("Analyse", 140, 40, 0x000000);
    OK.x = 80;
    OK.y = h - 60;
	OK.interactive = true;
	OK.buttonMode = true;
	OK.on('click', function(){
	    BioBLESS.analysis.calculate();
        OK.alpha = 0.5;
        OK.interactive = false;
        OK.buttonMode = false;
        BioBLESS.analysis.OK = OK;
        setTimeout(function(){
            OK.alpha = 0.5;
            OK.interactive = false;
            OK.buttonMode = false;
        }, 30000);
	});
    
    stage.addChild(OK);
    
    return stage;
};
BioBLESS.analysis.show = function(){
    if(BioBLESS.analysis.items_parameters.length === 0)
        return;
    var output1 = BioBLESS.analysis.create_output_stage1(BioBLESS.analysis.items_parameters, BioBLESS.analysis.standard_c);
    var output2 = BioBLESS.analysis.create_output_stage2(BioBLESS.analysis.items_parameters);
    output1.scale.x = output1.scale.y = output2.scale.x = output2.scale.y = (BioBLESS.width - 420) / 3200;
    output1.y = output2.y = (BioBLESS.height - 900 * output1.scale.x) / 2;
    output1.x = 100;
    output2.x = 120 + output1.scale.x * 1450;
    this.stage.movable_stage.removeChildren();
    BioBLESS.analysis.stage.movable_stage.addChild(output1);
    BioBLESS.analysis.stage.movable_stage.addChild(output2);
};
BioBLESS.analysis.redraw = function(){
    var backup1 = this.score_num.text;
    var backup2 = this.scroll_area.items;
    this.stage.removeChild(this.right_stage);
    var right_stage = this.create_right_stage(BioBLESS.height > 400 ? BioBLESS.height : 400);
    this.right_stage = right_stage;
	this.stage.addChild(right_stage);
    this.score_num.text = backup1;
    this.scroll_area.items = backup2;
    this.scroll_area.redraw();
    
};
BioBLESS.analysis.draw = function(){
    BioBLESS.gene_network.onchange();
    BioBLESS.analysis.input_chosen = [];
    BioBLESS.analysis.devices = BioBLESS.gene_network.clone(BioBLESS.gene_network.devices);
    this.stage.removeChildren();
    this.stage.movable_stage.removeChildren();
	this.stage.movable_stage.x = 0;
	this.stage.movable_stage.y = 0;
    this.stage.movable_stage._scale = 1;
	this.stage.movable_stage.scale.x = this.stage.movable_stage.scale.y = 1;
    this.parameters = {};
    var right_stage = this.create_right_stage(BioBLESS.height > 400 ? BioBLESS.height : 400);
    this.right_stage = right_stage;
    this.stage.addChild(this.stage.movable_stage);
	this.stage.addChild(right_stage);
};
