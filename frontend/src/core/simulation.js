BioBLESS.simulation.init = function() {
    this.stage = BioBLESS.utils.init_stage();
};
BioBLESS.simulation.refresh = function(){
    $.ajax({
        type: 'POST',
        url: BioBLESS.host + '/simulate/',
        contentType: 'application/json',
        data: JSON.stringify(BioBLESS.gene_network.get_parameters()),
        success: function(data) {
		    BioBLESS.simulation.draw(data); 
			BioBLESS.change_stage(BioBLESS.simulation);
			BioBLESS.gene_network.OK_button.alpha = 1;
		    BioBLESS.gene_network.OK_button.interactive = true;
	        BioBLESS.gene_network.OK_button.buttonMode = true;
		}
    });
};
BioBLESS.simulation.draw = function(_nodes){
    this.stage.movable_stage.removeChildren();
	this.stage.movable_stage.x = 0;
	this.stage.movable_stage.y = 0;
    
    var nodes = function(){};
    nodes.t = _nodes.t;
    nodes.c = [];
    nodes.names = [];
    var i = 0;
    for(var o in _nodes){
        if(o != "t"){
            nodes.c[i] = _nodes[o];
            nodes.names[i] = o;
            i++;
        }
    }
    var xAxis = 1100, yAxis = 600;//轴长
    var ox = 350, oy = 800;//原点坐标
    
    ///////////////////////////////////一些数据的准备
    graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.moveTo(ox, oy);
    graphics.lineTo(ox + xAxis, oy);
    graphics.moveTo(ox, oy + 1);
    graphics.lineTo(ox, oy - yAxis);/////////绘制坐标主轴
    
    
    var maxY = 0;
    for(var j = 0; j < nodes.c.length; j++){
	    for(i = 0; i < nodes.c[j].length; i++){
            if(maxY < nodes.c[j][i]){
                maxY = nodes.c[j][i];
            }
		}
    }
    
    var xDis = 0, yDis = 0;
    xDis = nodes.t[nodes.t.length - 1] / 25;
    var dis1 = function(x){
        if(x >= 10){
            return dis1(x / 10) * 10;
        }else{
            if(x < 1.5){
                return 1;
            }
            x /= 2;
            return (parseInt(x) + ((x - parseInt(x)) >= 0.5 ? 1 : 0)) * 2;
        }
    };
    var dis2 = function(x){
        if(x <= 1){
            return dis2(x * 10) / 10;
        }else{
            if(x < 1.5){
                return 1;
            }
            x /= 2;
            return (parseInt(x) + ((x - parseInt(x)) >= 0.5 ? 1 : 0)) * 2;
        }
    };
    
    if(xDis > 5){
        xDis = dis1(xDis) * 5;
    }else if(xDis < 5){
        xDis = dis2(xDis) * 5;
    }
    
    yDis = maxY / 35;
    if(yDis > 5){
        yDis = dis1(yDis) * 5;
    }else if(yDis < 5){
        yDis = dis2(yDis) * 5;
    }
    
    ox += 20;
    oy -= 20;
    var d = (xAxis - 50) / nodes.t[nodes.t.length - 1] * xDis / 5;
    i = 0;
    while(i * d < xAxis - 50){
        graphics.moveTo(ox + i * d, oy + 20);
        graphics.lineTo(ox + i * d, oy + 13 - ((i % 5) ? 0 : 7));
        if(i % 5 === 0){
            var Text = new PIXI.Text((Math.floor(i / 5 * xDis * 100) / 100).toString());
			Text.anchor.x = 0.5;
            Text.position.x = ox + i * d;
            Text.position.y = oy + 20;
			Text.style.fill = "white";
            this.stage.movable_stage.addChild(Text);
        }
        i++;
    }
    
    i = 0;
    d = (yAxis - 100) / maxY * yDis / 5;
    while(i * d < yAxis - 50){
        graphics.moveTo(ox - 20, oy - i * d);
        graphics.lineTo(ox - 13 + ((i % 5) ? 0 : 7), oy - i * d);
        if(i % 5 === 0){
            var text_node = new PIXI.Text((Math.floor((i / 5 * yDis) * 100) / 100).toString());
			text_node.anchor.x = 1;
			text_node.anchor.y = 0.5;
            text_node.position.x = ox - 20;
            text_node.position.y = oy - i * d;
			text_node.style.fill = "white";
            this.stage.movable_stage.addChild(text_node);
        }
        i++;
    }//////////////////////////////////绘制坐标轴的标度
    
    BioBLESS.simulation.color = [];
	BioBLESS.simulation.lines = [];
	var on_click_linetitle = function(){
	    for(i = 0; i < BioBLESS.simulation.lines.length; i++){
		    BioBLESS.simulation.lines[i].line.alpha = 0;
			BioBLESS.simulation.lines[i].title_bg.alpha = 0.25;
			BioBLESS.simulation.lines[i].title.alpha = 0.25;
		};
		BioBLESS.simulation.lines[this.i].line.alpha = 1;
		BioBLESS.simulation.lines[this.i].title_bg.alpha = 1;
		BioBLESS.simulation.lines[this.i].title.alpha = 1;
		all_button.alpha = 0.5;
	};
    var _color, gray = 0, red, green, blue;
	var ind = 0 - (nodes.c.length - 1) * 70 / 2;
    for(i = 0; i < nodes.c.length; i++){
        gray = 255;
        while(gray > 200 || gray < 150){
            red = parseInt(Math.random() * 255);
            green = parseInt(Math.random() * 255);
            blue = parseInt(Math.random() * 255);
            gray = 0.3 * red + 0.6 * green + 0.1 * blue;
        }
        _color = red * 65536 + green * 256 + blue;//计算时变曲线的颜色
        
		BioBLESS.simulation.lines[i] = new PIXI.Container();
		var line = new PIXI.Graphics();
        line.lineStyle(1, _color, 1);
        line.moveTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[0], 
        oy - (yAxis - 100) * nodes.c[i][0] / maxY);
        for(j = 1; j < nodes.t.length; j++){
            line.lineTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[j], 
        oy - (yAxis - 100) * nodes.c[i][j] / maxY);
            line.moveTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[j], 
        oy - (yAxis - 100) * nodes.c[i][j] / maxY);
        }////////////////////////////画时变曲线
		var title_bg = new PIXI.Graphics();
        title_bg.lineStyle(2, _color, 1);
        title_bg.moveTo(ox + xAxis + 80, oy - yAxis / 2 + i * 70 + ind);
        title_bg.lineTo(ox + xAxis + 220, oy - yAxis / 2 + i * 70 + ind);
		title_bg.lineStyle(0, 0, 0);
		title_bg.beginFill(0, 0);
		title_bg.drawRect(ox + xAxis + 70, oy - yAxis / 2 + i * 70 + ind - 15, 200, 30);
		BioBLESS.simulation.color[i] = _color.toString(16);
		while(BioBLESS.simulation.color[i].length < 6){
		    BioBLESS.simulation.color[i] = "0" + BioBLESS.simulation.color[i]
		};
		BioBLESS.simulation.color[i] = "#" + BioBLESS.simulation.color[i];
        var text_node2 = new PIXI.Text(nodes.names[i], {fill: BioBLESS.simulation.color[i]});
		text_node2.anchor.y = 0.5;
        text_node2.position.x = ox + xAxis + 240;
        text_node2.position.y = oy - yAxis / 2 + i * 70 + ind;////////////////////////画线的名字的指示标
		BioBLESS.simulation.lines[i].addChild(line);
		BioBLESS.simulation.lines[i].addChild(title_bg);
		BioBLESS.simulation.lines[i].addChild(text_node2);
		BioBLESS.simulation.lines[i].interactive = true;
		BioBLESS.simulation.lines[i].buttonMode = true;
		BioBLESS.simulation.lines[i].i = i;
		BioBLESS.simulation.lines[i].line = line;
		BioBLESS.simulation.lines[i].title_bg = title_bg;
		BioBLESS.simulation.lines[i].title = text_node2;
		BioBLESS.simulation.lines[i].on("click", on_click_linetitle);
        this.stage.movable_stage.addChild(BioBLESS.simulation.lines[i]);
    }
	var all_button = new PIXI.Container();
	var all_bg = new PIXI.Graphics();
	all_bg.beginFill(0xffffff, 1);
	all_bg.drawRoundedRect(0, 0, 80, 40, 8);
	all_bg.endFill();
	all_button.addChild(all_bg);
	var all = new PIXI.Text("ALL");
	all.anchor.x = all.anchor.y = 0.5;
	all.x = 40;
	all.y = 20;
	all_button.addChild(all);
	all_button.x = ox + xAxis - 100;
	all_button.y = oy - yAxis + 20;
	all_button.scale.x = all_button.scale.y = 0.75;
	all_button.interactive = true;
	all_button.buttonMode = true;
	all_button.on("click", function(){
	    for(i = 0; i < BioBLESS.simulation.lines.length; i++){
		    BioBLESS.simulation.lines[i].line.alpha = 1;
			BioBLESS.simulation.lines[i].title_bg.alpha = 1;
			BioBLESS.simulation.lines[i].title.alpha = 1;
		};
		all_button.alpha = 1;
	});
	this.stage.movable_stage.addChild(all_button);
    
	var t1 = BioBLESS.height / 900;
	var t2 = (BioBLESS.width - 100) / 1900;
	this.stage.movable_stage._scale = this.stage.movable_stage.scale.x = this.stage.movable_stage.scale.y = (t1 < t2 ? t1 : t2) * 0.8;
	this.stage.movable_stage.x = (BioBLESS.width - 1900 * this.stage.movable_stage.scale.x - 100) / 2 + 100;
	this.stage.movable_stage.y = (BioBLESS.height - 900 * this.stage.movable_stage.scale.x) / 2;
    this.stage.movable_stage.addChild(graphics);
    this.stage.addChild(this.stage.movable_stage);
    return this.stage;
};

