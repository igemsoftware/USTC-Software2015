/** 
* @author needsay
* @constructor BioBLESS.device 
* @description the class of devices 
*/ 
!function() {
/** 
* @description {Num} the height and the width of node, the distance between nodes, the distance between floors
*/ 
var nodeH = 100, nodeW = 50, nodeDis = 100, floorDis = 135;
var svg_index = 0;
/** 
* @description {PIXI.Container} the stage of the whole devices
*/ 
BioBLESS.device.stage = new PIXI.Container();
/** 
* @description {PIXI.Container} the movable stage
*/ 
BioBLESS.device.stage.movable_stage = new PIXI.Container();
/** 
* @description {Num} used for controling stage scale in scale animation
*/ 
BioBLESS.device.stage.movable_stage._scale = 1;

BioBLESS.device.get_gates_supsification = function(){
	this.gates = $.getJSON("misc/gates_supsification.json");
};
/** 
* @author needsay
* @constructor dev
* @description the class of each device
* @example new dev(); 
*/ 
var dev = function(){
/** 
* @description {PIXI.Container} the stage of the device
*/ 
this.stage = new PIXI.Container();

/** 
* @description prepare something
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 

this.draw_line = function(graphic, start_x, start_y, end_x, end_y, mode){
	if(mode === true){
		graphic.moveTo(start_x, start_y);
		graphic.lineTo(start_x, end_y);
		graphic.lineTo(end_x, end_y);
		graphic.lineTo(start_x, end_y);
	}else{
		graphic.moveTo(start_x, start_y);
		graphic.lineTo(end_x, start_y);
		graphic.lineTo(end_x, end_y);
		graphic.lineTo(end_x, start_y);
	}
}
this.draw_arrow = function(graphic, scale, x, y, mode){
	switch(mode){
		case "down":
		    graphic.moveTo(x, y);
			graphic.lineTo(x - scale + 2, y - scale);
			graphic.lineTo(x + scale - 2, y - scale);
			break;
		case "up":
		    graphic.moveTo(x, y);
			graphic.lineTo(x - scale + 2, y + scale);
			graphic.lineTo(x + scale - 2, y + scale);
			break;
			
	}
}
this.prepare = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.chosen = false;
	this._index = n;
	this.input = [];
	this.input_num = 0;
	this.up_height_input_num = [];
	this.down_height_input_num = [];
	for(i = 0; i < devices[n].input.length; i++){
		this.input[i] = {};
		this.input[i].to_dev_index = [];
		this.input[i].to_dev_output_index = [];
		this.input[i].x = [];
		this.input[i].y = [];
	};
	this.output = [];
	this.output_num = 0;
	for(i = 0; i < devices[n].output.length; i++){
		this.output[i] = {};
		this.output[i].to_dev_index = [];
		this.output[i].to_dev_input_index = [];
	};
	
	
	
	this.lines_num = devices[n].parts.id.length;//主线数
	this.parts_num = 0;//主线上总结点数
	this.part_to_line = [];//part序号到其所在主线序号的映射
	this.to_part = [];
	for(i = 0; i < this.lines_num; i++){
		this.to_part[i] = [];
		for(j = 0; j < devices[n].parts.id[i].length; j++){
		    this.part_to_line[this.parts_num + j] = i;
			this.to_part[i][j] = this.parts_num + j;
		};
	    this.parts_num = this.parts_num + devices[n].parts.id[i].length;
	};//计算总结点数
};

/** 
* @description analyse lines from part to part
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
this.line_analysis = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.is_line = [];//用于指示是否有支线从第i个节点经蛋白质连接到到第j个节点
	this.line_type = [];//用于指示从节点i到节点j的线末端的类型
	for(i = 0; i < this.parts_num; i++){
	    this.is_line[i] = [];
		this.line_type[i] = [];
		for(j = 0; j < this.parts_num; j++){
		    this.is_line[i][j] = false;
			this.line_type[i][j] = null;
		};
	};
	var end, start;
	for(k = 0; k < devices[n].map.length; k++){
		if(devices[n].map[k].id1[0] === 'd'){
			start = parseInt(devices[n].map[k].id1.substring(1)) - 1;
			end = -1;
			for(l = 0; l < devices[n].map.length; l++){
				if(devices[n].map[l].id1 === devices[n].map[k].id2){
					end = parseInt(devices[n].map[l].id2.substring(1)) - 1;
					s = devices[n].map[l].type;
					break;
				};
			};
			if(end == -1){
		        this.is_line[start][start] = true;
	            this.line_type[start][start] = s;
			}else{
				this.is_line[start][end] = true;
	            this.line_type[start][end] = s;
			};
			
		};
	};	
	
};
/** 
* @description analyse the relative height of each protein node
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
this.height_analysis = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.protein_height = [];//蛋白质节点的相对高度,0表示该主线节点不生成蛋白质
	for(i = 0; i < this.parts_num; i++)
	    this.protein_height[i] = 0;
	for(Num = 1; Num < this.parts_num; Num++){
		for(i = 0; i < this.parts_num - Num; i++){
			j = i + Num;
			if(this.is_line[i][j]){
				if(this.part_to_line[i] == this.part_to_line[j]){
					l = 0;
					for(k = i; k < j; k++){
						if(++this.part[k].up_max_height > l)
						    l = this.part[k].up_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].up_max_height = l;
				    };
				}else{
					l = 0;
					for(k = i; k < j; k++){
						if(--this.part[k].down_max_height < l)
						    l = this.part[k].down_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].down_max_height = l;
				    };
				};
				this.protein_height[i] = l;
				
				
			};
			if(this.is_line[j][i]){
				if(this.part_to_line[i] == this.part_to_line[j]){
					l = 0;
					for(k = i + 1; k <= j; k++){
						if(++this.part[k].up_max_height > l)
						    l = this.part[k].up_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].up_max_height = l;
				    };
				}else{
					l = 0;
					for(k = i + 1; k <= j; k++){
						if(--this.part[k].down_max_height < l)
						    l = this.part[k].down_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].down_max_height = l;
				    };
				};
				this.protein_height[j] = l;
				
			};
		};
		
	};//计算this.protein_height
	for(i = 0; i < devices[n].output.length; i++){
		j = parseInt(devices[n].output[i].substring(1)) - 1;
		this.protein_height[j] = ++this.part[j].up_max_height;
	}
	this.protein_heightest = 0, this.protein_lowest = 0;//蛋白质节点的最大高度与最低高度
	for(i = 0; i < this.parts_num; i++){
		if(this.protein_height[i] > this.protein_heightest) this.protein_heightest = this.protein_height[i];
		if(this.protein_height[i] < this.protein_lowest) this.protein_lowest = this.protein_height[i];
	};
};

/** 
* @description analyse each part
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
this.part_analysis = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.part = [];
    for(i = 0; i < this.parts_num; i++){
		this.part[i] = function(){};
    	this.part[i].upIndegree = 0;//上入度
		this.part[i].upOutdegree = 0;//上出度
		this.part[i].downIndegree = 0;//下入度
		this.part[i].downOutdegree = 0;//下出度
		this.part[i].upLine = 0;//上部已连线数
		this.part[i].downLine = 0;//下部已连线数
		this.part[i].up_max_height = 0;
		this.part[i].down_max_height = 0;
		for(j = 0; j < this.parts_num; j++){
			if(i === j){
				if(this.is_line[i][j])
				    this.part[i].upOutdegree += 1;
			}else if(this.part_to_line[i] == this.part_to_line[j]){
   			    if(this.is_line[i][j])
    		        this.part[i].upOutdegree += 1;
	    	    if(this.is_line[j][i])
		            this.part[i].upIndegree += 1;
		    }else{
			    if(this.is_line[i][j])
			        this.part[i].downOutdegree += 1;
   			    if(this.is_line[j][i])
    		        this.part[i].downIndegree += 1;
	        };
    	};
	};
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id2[0] !== 'e'){
			for(j = 0; j < devices[n].input.length; j++){
				if(devices[n].input[j] === devices[n].map[i].id1){
					k = parseInt(devices[n].map[i].id2.substring(1)) - 1;
					this.part[k].downIndegree += 1;
					break;
				}
			}
		}
	}
};
/** 
* @description draw device
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
var id = ["00000167","00000057","00000316","00000139","00000141","00000627","10000001","00001957","00001956","00001955","00000296","00005850","00001687"];
this.get_id = function(){
	return id[svg_index++ % 13];
}

this.draw_protein = function(){
	var graphic = new PIXI.Graphics();
	graphic.lineStyle(3, 0x000000, 1);
	graphic.drawCircle(25, 50, 20);
	return graphic;
};
this.draw = function(devices, n){
	if(n >= 0){
	if(!devices[n]){
		alert("Error!");
		return;
	};
	this.prepare(devices, n);
	this.line_analysis(devices, n);
	this.part_analysis(devices, n);
	this.height_analysis(devices, n);
	
	var i, j, k, l, Num, s;//备用变量
	//////////////////////////////////////////////////数据处理
	
	this.stage_h = floorDis * (this.protein_heightest - this.protein_lowest + 4);
	this.stage_w = nodeDis * (this.parts_num + this.lines_num + 1);
	
    
    
    
    var texture = PIXI.Texture.fromImage("misc/test.png");
	
	var parts = [];
	/*var BBAs = [];
	for(i = 0; i < devices[n].posloc.length; i++){
		BBAs[this.to_part[devices[n].posloc[i].l1][parseInt(devices[n].posloc[i].from.substring(1)) - 1]] = new PIXI.Graphics();
	};*/
	var graphics = new PIXI.Graphics();
	
	graphics.lineStyle(8, 0x00ff55, 1);
	Num = 0;
	for(i = 0; i < this.lines_num; i++){
		graphics.moveTo((this.to_part[i][0] + i + 1) * nodeDis - 40, this.stage_h / 2.0);
		for(j = 0; j < devices[n].parts.id[i].length; j++){
			parts[this.to_part[i][j]] = BioBLESS.IDdraw.drawElement(this.get_id());
			parts[this.to_part[i][j]].position.y = (this.stage_h - nodeH) / 2.0;
			parts[this.to_part[i][j]].position.x = (this.to_part[i][j] + i + 1) * nodeDis;
			/*if(BBAs[this.to_part[i][j]]){
			    BBAs[this.to_part[i][j]].lineStyle(0);
				BBAs[this.to_part[i][j]].beginFill(0x00ffff);
				BBAs[this.to_part[i][j]].drawRect(parts[this.to_part[i][j]].position.x + nodeW, this.stage_h / 2.0 - 5, 50, 10);
				BBAs[this.to_part[i][j]].endFill();
				BBAs[this.to_part[i][j]].interactive = true;
				BBAs[this.to_part[i][j]].buttonMode = true;
				BBAs[this.to_part[i][j]].on('mousedown', function(){
					    alert("");
				    });
			};*/
		};
		Num += devices[n].parts.id[i].length;
		graphics.lineTo((Num + i + 1) * nodeDis, this.stage_h / 2.0);
		graphics.moveTo((Num + i + 1) * nodeDis, this.stage_h / 2.0);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, this.stage_h / 2.0 - 8);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, this.stage_h / 2.0 + 8);
	};//绘制主线上的part
	
	var ind = 15;
	graphics.lineStyle(4, 0xff3300, 1);
	for(var d = 1; d < this.parts_num; d++){
		for(i = 0; i < this.parts_num - d; i++){
			j = i + d;
			if(this.is_line[i][j]){
				parts[i].protein = this.draw_protein();
				parts[i].protein.position.x = parts[i].position.x;
				parts[i].protein.position.y = parts[i].position.y - this.protein_height[i] * floorDis;
				if(this.protein_height[i] > 0){
					this.part[i].upLine++;
					this.part[j].upLine++;
					k = nodeW / (this.part[i].upIndegree + this.part[i].upOutdegree + 1);
					l = nodeW / (this.part[j].upIndegree + this.part[j].upOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * this.part[i].upLine, parts[i].position.y + ind);
					graphics.lineTo(parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + nodeH - 18);
					this.draw_arrow(graphics, 6, parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + nodeH - 20, "up");
					
					this.draw_line(graphics, parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0, parts[j].position.x + l * this.part[j].upLine, parts[j].position.y - 8 + ind + 5, false);
					if(this.line_type[i][j] == 'inh'){
						graphics.moveTo(parts[j].position.x + l * this.part[j].upLine - 6, parts[j].position.y - 7 + ind + 5);
						graphics.lineTo(parts[j].position.x + l * this.part[j].upLine + 6, parts[j].position.y - 7 + ind + 5);
					}else{
						this.draw_arrow(graphics, 6, parts[j].position.x + l * this.part[j].upLine, parts[j].position.y - 5 + ind + 5, "down");
					};
				}else{
					this.part[i].downLine++;
					this.part[j].downLine++;
					k = nodeW / (this.part[i].downIndegree + this.part[i].downOutdegree + 1);
					l = nodeW / (this.part[j].downIndegree + this.part[j].downOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * this.part[i].downLine, parts[i].position.y + nodeH - ind - 15);
					graphics.lineTo(parts[i].position.x + k * this.part[i].downLine, parts[i].protein.position.y + 16);
					this.draw_arrow(graphics, 6, parts[i].position.x + k * this.part[i].downLine, parts[i].protein.position.y + 18, "down");
					
					this.draw_line(graphics, parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0, parts[j].position.x + l * this.part[j].downLine, parts[j].position.y + nodeH + 8 - ind - 15, false);
					
					if(this.line_type[i][j] !== 'inh'){
						graphics.moveTo(parts[j].position.x + l * this.part[j].downLine - 6, parts[j].position.y + nodeH + 7 - ind - 15);
						graphics.lineTo(parts[j].position.x + l * this.part[j].downLine + 6, parts[j].position.y + nodeH + 7 - ind - 15);
					}else{
						this.draw_arrow(graphics, 6, parts[j].position.x + l * this.part[j].downLine, parts[j].position.y + nodeH + 5 - ind - 15, "up");
					};
				};
				
			};
		};
	};
	for(j = 0; j < devices[n].output.length; j++){
		i = parseInt(devices[n].output[j].substring(1)) - 1;
		this.part[i].upLine++;
		parts[i].protein = this.draw_protein();
		parts[i].protein.position.x = parts[i].position.x;
		parts[i].protein.position.y = parts[i].position.y - this.protein_height[i] * floorDis;
		if(this.part[i].upIndegree + this.part[i].upOutdegree > 1){
			k = nodeW / (this.part[i].upIndegree + this.part[i].upOutdegree + 1);
		    this.draw_line(graphics, parts[i].position.x + k * this.part[i].upLine, parts[i].position.y + ind, parts[i].position.x + nodeW / 2, parts[i].protein.position.y + (nodeH + floorDis) / 2, true);
		    this.draw_line(graphics, parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + (nodeH + floorDis) / 2, parts[i].position.x + nodeW / 2, parts[i].protein.position.y + nodeH + 5 - ind - 12, false);
		}else{
			graphics.moveTo(parts[i].position.x + nodeW / 2, parts[i].position.y + ind);
			graphics.lineTo(parts[i].position.x + nodeW / 2, parts[i].protein.position.y + nodeH + 5 - ind - 12);
		}
		this.draw_arrow(graphics, 6, parts[i].position.x + nodeW / 2, parts[i].protein.position.y + nodeH + 5 - ind - 12, "up");
	};//绘制有关蛋白质节点的支路
	
	graphics.lineStyle(6, 0xffff00, 1);
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id2[0] == 'e'){
			Num = parseInt(devices[n].map[i].id2.substring(1)) - 1;
			k = parseInt(devices[n].map[Num].id1.substring(1)) - 1;
			l = parseInt(devices[n].map[Num].id2.substring(1)) - 1;
			
            parts[k].protein.Text = new PIXI.Text(devices[n].map[i].id1);
			parts[k].protein.Text.anchor.x = 0.5;
			parts[k].protein.Text.anchor.y = 0.5;
			var height = this.protein_height[k];
			var input_num;
			if(height > 0){
				input_num = this.up_height_input_num;
			}else{
				input_num = this.down_height_input_num;
				height = 0 - height;
			};
			if(input_num[height] === undefined)
			    input_num[height] = 0;
			var ind2 = input_num[height]++ * 10;
			
			if(k < l){
				graphics.moveTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 40 - ind + ind2);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x + nodeW + 31, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 19, parts[k].protein.position.y + nodeH / 2.0 + 7);
				}else{
					this.draw_arrow(graphics, 6, parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 7, "up");
				}
				
				
				
				parts[k].protein.Text.position.x = parts[k].protein.position.x + nodeW + 25;
				parts[k].protein.Text.position.y =  parts[k].protein.position.y + nodeH / 2.0 + 55 - ind + ind2;
				
			}else{
				graphics.moveTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 40 - ind + ind2);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x - 19, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x - 31, parts[k].protein.position.y + nodeH / 2.0 + 7);
				}else{
					this.draw_arrow(graphics, 6, parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 7, "up");
				}
				
				parts[k].protein.Text.position.x = parts[k].protein.position.x - 25;
				parts[k].protein.Text.position.y = parts[k].protein.position.y + nodeH / 2.0 + 55 - ind + ind2;
			};
			
			for(var p = 0; p < devices[n].input.length; p++){
				if(devices[n].input[p] === devices[n].map[i].id1){
					this.input[p].x[this.input[p].x.length] = parts[k].protein.Text.position.x;
					this.input[p].y[this.input[p].y.length] = parts[k].protein.Text.position.y;
				}
			};
		}else{
			for(j = 0; j < devices[n].input.length; j++){
				if(devices[n].input[j] === devices[n].map[i].id1){
					var height = 0;
			        var input_num = this.up_height_input_num;
			        if(input_num[height] === undefined)
			            input_num[height] = 0;
			        var ind2 = input_num[height]++ * 30;
					k = parseInt(devices[n].map[i].id2.substring(1)) - 1;
					l = nodeW / (this.part[k].downIndegree + this.part[k].downOutdegree + 1);
					var p = 50;
					this.part[k].downLine++;
					if(parts[k].Text === undefined)
					    parts[k].Text = [];
				    var t = parts[k].Text.length;
					parts[k].Text[t] = new PIXI.Text(devices[n].map[i].id1);
			        parts[k].Text[t].anchor.x = 0.5;
			        parts[k].Text[t].anchor.y = 0.5;
					parts[k].Text[t].position.x = parts[k].position.x + this.part[k].downLine * l;
					parts[k].Text[t].position.y = parts[k].position.y + nodeH + 55 - p + ind2;
					graphics.moveTo(parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 8 - ind - 15);
					graphics.lineTo(parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 40 - p + ind2);
					if(devices[n].map[i].type == 'inh'){
						graphics.moveTo(parts[k].position.x + this.part[k].downLine * l - 6, parts[k].position.y + nodeH + 8 - ind - 15);
						graphics.lineTo(parts[k].position.x + this.part[k].downLine * l + 6, parts[k].position.y + nodeH + 8 - ind - 15);
					}else{
						this.draw_arrow(graphics, 6, parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 8 - ind - 15, "up");
					};
					
					this.input[j].x[this.input[j].x.length] = parts[k].Text[t].position.x;
					this.input[j].y[this.input[j].y.length] = parts[k].Text[t].position.y;
					break;
				};
			};
		};
	};//绘制Input的支路
	
	for(i = 0; i < devices[n].output.length; i++){
		this.output[i].x = parts[(parseInt(devices[n].output[i].substring(1)) - 1)].protein.position.x;
		this.output[i].y = parts[(parseInt(devices[n].output[i].substring(1)) - 1)].protein.position.y;
	};
	
	
	graphics.lineStyle(4, 0x000000, 1);
	graphics.drawRoundedRect(10, 70, this.stage_w - 30, this.stage_h - 250, 50);
	
	
	
	this.stage.addChild(graphics);
	for(i = 0; i < this.parts_num; i++){
		/*if(BBAs[i])
		    this.stage.addChild(BBAs[i]);*/
		this.stage.addChild(parts[i]);
		if(parts[i].protein){
		    this.stage.addChild(parts[i].protein);
		};
	};
	}else if(n === -1){
		var output = BioBLESS.device.create_textbutton("OUT", 100, 40, 0x0000ff);
		this.stage_h = 100;
		this.stage_w = 1000;
		output.x = 450;
		this.stage.addChild(output);
		this.chosen = false;
	    this.input = [];
	    this.input_num = 0;
		this.input[0] = {};
		this.input[0].to_dev_index = [];
		this.input[0].to_dev_output_index = [];
		this.input[0].x = [500];
		this.input[0].y = [40];
	    this.output = [];
	    this.output_num = 0;
	}else{
		var input = BioBLESS.device.create_textbutton("INPUT " + (0 - n - 1).toString(), 150, 40, 0x0000ff);
		this.stage_h = 100;
		this.stage_w = 1000;
		input.x = 425;
		this.stage.addChild(input);
		this.chosen = false;
	    this.input = [];
	    this.input_num = 0;
	    this.output = [];
	    this.output_num = 0;
		this.output[0] = {};
		this.output[0].to_dev_index = [];
		this.output[0].to_dev_input_index = [];
		this.output[0].x = 525;
		this.output[0].y = -30;
	};
	
	
};//绘制函数

this.show_input = function(){
	for(i = 0; i < this.parts_num; i++){
		if(parts[i].protein){
			if(parts[i].protein.Text){
				this.stage.addChild(parts[i].protein.Text);
			};
		};
		if(parts[i].Text){
			for(j = 0; j < parts[i].Text.length; j++)
		        this.stage.addChild(parts[i].Text[j]);
		}
	};
};

};


/** 
* @description analyse the layout of the whole devices
* @param {devices} the whole devices
*/ 
BioBLESS.device.devs_analysis = function(devices){
	var i, j, k, l, temp;
	this.devs = [];
	
	
	var gates = this.gates.responseJSON;
	var g = [];
	for(i = 0; i < gates.nodes.length; i++){
		for(j = 0; j < devices.length; j++){
			if(gates.nodes[i] === devices[j].id){
				g[i] = j;
				break;
			}
		};
		if(j === devices.length){
			if(gates.nodes[i][0] === "O"){
				g[i] = -1;
			}else if(gates.nodes[i][0] === "I"){
				g[i] = -2 - parseInt(gates.nodes[i].substring(5));
			}else alert("Error - 1002");
		}
		    
	};
	var j = 0;
	for(i = 0; i < gates.nodes.length; i++){
		this.devs[i] = new dev();
		this.devs[i].draw(devices, g[i]);
		if(g[i] < 0) continue;
		var index_button = BioBLESS.device.create_textbutton(i.toString(), 100, 30, 0x00ffff);
		index_button.x = 50;
		index_button.y = 100;
		this.devs[i].stage.addChild(index_button);
	};
	for(i = 0; i < gates.arcs.length; i++){
		var from = gates.arcs[i].from;
		var to = gates.arcs[i].to;
		
		this.devs[from].output[0].to_dev_index[this.devs[from].output[0].to_dev_index.length] = to;
		this.devs[from].output[0].to_dev_input_index[this.devs[from].output[0].to_dev_input_index.length] = this.devs[to].input_num;
		this.devs[to].input[this.devs[to].input_num].to_dev_index[0] = from;
		this.devs[to].input[this.devs[to].input_num].to_dev_output_index[0] = 0;
		this.devs[to].input_num++;
		
	}
	
	this.poi = [];
	this.poi[0] = [];
	for(i = 0; i < this.devs.length; i++){
		if(this.devs[i].input.length === 0){
			this.poi[0][this.poi[0].length] = this.devs[i];
			this.devs[i].chosen = true;
		}
	};
	this.poi[1] = [];
	for(i = 0; i < this.devs.length; i++){
		for(j = 0; j < this.devs[i].input.length; j++){
			if(this.devs[i].input[j].to_dev_index.length === 0){
				this.poi[1][this.poi[1].length] = this.devs[i];
				this.devs[i].chosen = true;
				break;
			}
		};
	};
	i = 0;
	while(this.poi[i].length > 0){
		if(this.poi[i + 1] === undefined)
		    this.poi[i + 1] = [];
		for(j = 0; j < this.poi[i].length; j++){
			for(k = 0; k < this.poi[i][j].output.length; k++){
				for(l = 0; l < this.poi[i][j].output[k].to_dev_index.length; l++){
    				if(this.devs[this.poi[i][j].output[k].to_dev_index[l]].chosen === false){
	     				this.poi[i + 1][this.poi[i + 1].length] = this.devs[this.poi[i][j].output[k].to_dev_index[l]];
		    			this.devs[this.poi[i][j].output[k].to_dev_index[l]].chosen = true;
			    	}
			    }
			};
			
		};
		i++;
	};
	this.row = [];
	this.devs_height = 0;
	this.devs_width = 0;
	for(i = 0; i < this.poi.length - 1; i++){
		this.row[i] = {};
		this.row[i].node_height = this.poi[i][0].stage_h;
		this.row[i].width = this.poi[i][0].stage_w;
		for(j = 1; j < this.poi[i].length; j++){
			if(this.row[i].node_height < this.poi[i][j].stage_h)
		    this.row[i].node_height = this.poi[i][j].stage_h;
			if(this.row[i].width < this.poi[i][j].stage_w)
			    this.row[i].width = this.poi[i][j].stage_w;
		};
		this.row[i].width += 200;
		if(this.devs_height < this.row[i].node_height * this.poi[i].length)
		    this.devs_height = this.row[i].node_height * this.poi[i].length;
	};
	var x = 0;
	for(i = 0; i < this.row.length; i++){
		for(j = 0; j < this.poi[i].length; j++){
			this.poi[i][j].stage.position.x = x + j % 4 * 10 + (this.row[i].width -this.poi[i][j].stage_w) / 2 ;
			this.poi[i][j].stage.position.y = (j + 1) / (this.poi[i].length + 1) * this.devs_height - this.poi[i][j].stage_h / 2;
			this.stage.movable_stage.addChild(this.poi[i][j].stage);
		};
		x += this.row[i].width;
	};
	this.devs_width = x - 200;
	
	
};
BioBLESS.device.draw_lines_between_devices = function(){
	var i, j, k, l, temp;
	for(i = 0; i < this.devs.length; i++){
		for(j = 0; j < this.devs[i].output.length; j++){
			for(l = 0; l < this.devs[i].output[j].to_dev_index.length; l++){
				var graphic = new PIXI.Graphics();
				graphic.lineStyle(6, 0xffff00, 1);
				var input_dev =  this.devs[this.devs[i].output[j].to_dev_index[l]];
				for(k = 0; k < input_dev.input[this.devs[i].output[j].to_dev_input_index[l]].x.length; k++){
					
				
				var input_x = input_dev.stage.position.x + input_dev.input[this.devs[i].output[j].to_dev_input_index[l]].x[k];
				var input_y = input_dev.stage.position.y + input_dev.input[this.devs[i].output[j].to_dev_input_index[l]].y[k];
				var output_x = this.devs[i].stage.position.x + this.devs[i].output[j].x;
				var output_y = this.devs[i].stage.position.y + this.devs[i].output[j].y;
				if(input_x > output_x + nodeW + 25 || input_x === output_x - 25){
					graphic.moveTo(output_x + nodeW, output_y + nodeH / 2);
					graphic.lineTo(output_x + nodeW + 28, output_y + nodeH / 2);
					graphic.moveTo(output_x + nodeW + 25, output_y + nodeH / 2);
					graphic.lineTo(output_x + nodeW + 25, input_y + 30 + ((input_y + 30 > output_y + nodeH / 2) ? 3 : -3));
					graphic.moveTo(output_x + nodeW + 25, input_y + 30);
					graphic.lineTo(input_x, input_y + 30);
					graphic.moveTo(input_x, input_y + 33);
					graphic.lineTo(input_x, input_y + 13 - 30);
					//graphic.moveTo(input_x, input_y + 13);
					//graphic.lineTo(input_x - 4, input_y + 18);
					//graphic.lineTo(input_x + 4, input_y + 18);
				}else{
					graphic.moveTo(output_x, output_y + nodeH / 2);
					graphic.lineTo(output_x - 28, output_y + nodeH / 2);
					graphic.moveTo(output_x - 25, output_y + nodeH / 2);
					graphic.lineTo(output_x - 25, input_y + 30 + (input_y + 30 > output_y + nodeH / 2 ? 3 : -3));
					graphic.moveTo(output_x - 25, input_y + 30);
					graphic.lineTo(input_x, input_y + 30);
					graphic.moveTo(input_x, input_y + 33);
					graphic.lineTo(input_x, input_y + 13 - 30);
					//graphic.moveTo(input_x, input_y + 13);
					//graphic.lineTo(input_x - 4, input_y + 18);
					//graphic.lineTo(input_x + 4, input_y + 18);
				}
				}
				this.stage.movable_stage.addChild(graphic);
			};
		};
	};
    this.stage.movable_stage.addChild(this.poi[this.poi.length - 2][0].stage);
};

BioBLESS.device.create_textbutton = function(t, w, h, color){
	var button = new PIXI.Container();
	button.background = new PIXI.Graphics();
	button.text = new PIXI.Text(t);
	
	button.background.beginFill(color, 1);
	button.background.drawRoundedRect(0, 0, w, h, h / 5);
	button.background.endFill();
	
	button.text.anchor.x = 0.5;
	button.text.anchor.y = 0.5;
	button.text.x = w / 2;
	button.text.y = h / 2;
	
	button.addChild(button.background);
	button.addChild(button.text);
	return button;
};
/** 
* @description draw one device or the whole devices
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw (If n is equal to -1, the stage returned will contain the whole devices)
*/ 
BioBLESS.device.draw = function(devices, n){
	this.stage.movable_stage.removeChildren();
	
	if(n !== -1){
		var i, j, k, l, temp;
		this.devs_analysis(devices);
		this.draw_lines_between_devices();
		var t1 = this.row[0].width / this.devs_width;
		var t2 = BioBLESS.height / this.devs_height;
		this.stage.movable_stage._scale = this.stage.movable_stage.scale.x = this.stage.movable_stage.scale.y = (t1 < t2)? t1 : t2;
		this.stage.movable_stage.position.x = (BioBLESS.width - this.devs_width * ((t1 < t2)? t1 : t2)) / 2; 
		this.stage.movable_stage.position.y = (BioBLESS.height - this.devs_height * ((t1 < t2)? t1 : t2)) / 2; 
		
	}else if(n >= 0){
	    this.stage.movable_stage._scale = 1;
		var w = BioBLESS.width;
		var device = new dev();
		device.draw(devices, n);
		this.stage.movable_stage.addChild(device.stage);
		var moveX = w / 2 - (this.parts_num + this.lines_num + 1) * 90 + 25;
		if(moveX > 0)
		    this.stage.movable_stage.position.x = moveX;
		
	}
	this.stage.addChild(this.stage.movable_stage);
	return this.stage;
}


}();
