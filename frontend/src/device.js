(function() {
/** 
* @author needsay
* @constructor device_obj 
* @description the class of devices 
* @example new device_obj(); 
*/ 
var device_obj = function() {
/** 
* @description {Num} the height and the width of node, the distance between nodes, the distance between floors
*/ 
var nodeH = 40, nodeW = 130, nodeDis = 180, floorDis = 135;
/** 
* @description {PIXI.Container} the stage of the whole devices
*/ 
this.stage = new PIXI.Container();
/** 
* @description {PIXI.Container} the movable stage
*/ 
this.stage.movable_stage = new PIXI.Container();
/** 
* @description {Num} used for controling stage scale in scale animation
*/ 
this.stage.movable_stage._scale = 1;

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
this.prepare = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.chosen = false;
	this._index = n;
	this.input = [];
	for(i = 0; i < devices[n].input.id.length; i++){
		this.input[i] = function(){};
		this.input[i].to_dev_index = null;
	};
	this.output = [];
	for(i = 0; i < devices[n].output.length; i++){
		this.output[i] = function(){};
		this.output[i].to_dev_index = null;
	};
	
	
	
	this.lines_num = devices[n].lines.id.length;//主线数
	this.parts_num = 0;//主线上总结点数
	this.part_to_line = new Array();//part序号到其所在主线序号的映射
	this.to_part = new Array();
	this.is_dna = new Array();//用于指示第i条主线的第j个节点是否是DNA
	for(i = 0; i < this.lines_num; i++){
		this.to_part[i] = new Array();
		this.is_dna[i] = new Array();
		for(j = 0; j < devices[n].lines.id[i].length; j++){
		    this.part_to_line[this.parts_num + j] = i;
			this.to_part[i][j] = this.parts_num + j;
			this.is_dna[i][j] = false;
		};
	    this.parts_num = this.parts_num + devices[n].lines.id[i].length;
	};//计算总结点数
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id1[0] == 'd'){
			this.is_dna[this.part_to_line[parseInt(devices[n].map[i].id1.substring(1)) - 1]][parseInt(devices[n].map[i].id1.substring(1)) - 1] = true;
		};
	};
};

/** 
* @description analyse lines from part to part
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
this.line_analysis = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	
	
	this.is_line = new Array();//用于指示是否有支线从第i个节点经蛋白质连接到到第j个节点
	this.line_type = new Array();//用于指示从节点i到节点j的线末端的类型
	for(i = 0; i < this.parts_num; i++){
	    this.is_line[i] = new Array();
		this.line_type[i] = new Array();
		for(j = 0; j < this.parts_num; j++){
		    this.is_line[i][j] = false;
			this.line_type[i][j] = null;
		};
	};
	Num = 0;
	for(i = 0; i < this.lines_num; i++){
		for(j = 0; j < devices[n].lines.id[i].length; j++){
			if(this.is_dna[i][j]){
				var end = -1;
				for(k = 0; k < devices[n].map.length; k++){
					if(devices[n].map[k].id1[0] == 'd' && parseInt(devices[n].map[k].id1.substring(1)) - 1 == this.to_part[i][j]){
						for(l = 0; l < devices[n].map.length; l++){
							if(devices[n].map[l].id1 == devices[n].map[k].id2){
								end = parseInt(devices[n].map[l].id2.substring(1)) - 1;
								s = devices[n].map[l].type;
							};
						};
					};
				};
				if(end == -1){
					alert("Error - 1000!");
					return;
				};
				
				this.is_line[Num + j][end] = true;
				this.line_type[Num + j][end] = s;
			};
		};
		Num = Num + this.lines_num;	
	};//计算this.is_line与this.line_type
	for(i = 0; i < devices[n].output.length; i++){
		this.is_line[parseInt(devices[n].output[i].substring(1)) - 1][parseInt(devices[n].output[i].substring(1)) - 1] = true;
	};
	
};
/** 
* @description analyse the relative height of each protein node
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw
*/ 
this.height_analysis = function(devices, n){
	var i, j, k, l, Num, s;//备用变量
	this.protein_height = new Array(this.parts_num);//蛋白质节点的相对高度,0表示该主线节点不生成蛋白质
	for(i = 0; i < this.parts_num; i++)
	    this.protein_height[i] = 0;
	for(Num = 1; Num < this.parts_num; Num++){
		for(i = 0; i < this.parts_num - Num; i++){
			j = i + Num;
			if(this.is_line[i][j]){
				if(this.part_to_line[i] == this.part_to_line[j]){
					l = 0;
					for(k = i; k <= j; k++){
						if(++this.part[k].up_max_height > l)
						    l = this.part[k].up_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].up_max_height = l;
				    };
				}else{
					l = 0;
					for(k = i; k <= j; k++){
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
					for(k = i; k <= j; k++){
						if(++this.part[k].up_max_height > l)
						    l = this.part[k].up_max_height;
					};
					for(k = i; k <= j; k++){
					    this.part[k].up_max_height = l;
				    };
				}else{
					l = 0;
					for(k = i; k <= j; k++){
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
	this.part = new Array();
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
			for(j = 0; j < devices[n].input.id.length; j++){
				if(devices[n].input.id[j] === devices[n].map[i].id1){
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
this.draw = function(devices, n){
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
	this.stage_w = nodeDis * (this.parts_num + 3);
	
    
    
    
    var texture = PIXI.Texture.fromImage("/misc/test.png");
	
	var parts = new Array();
	var BBAs = new Array();
	for(i = 0; i < devices[n].posloc.length; i++){
		BBAs[this.to_part[devices[n].posloc[i].l1][parseInt(devices[n].posloc[i].from.substring(1)) - 1]] = new PIXI.Graphics();
	};
	var graphics = new PIXI.Graphics();
	
	graphics.lineStyle(10, 0x00ff55, 1);
	Num = 0;
	for(i = 0; i < this.lines_num; i++){
		graphics.moveTo((this.to_part[i][0] + i + 1) * nodeDis - 40, this.stage_h / 2.0);
		for(j = 0; j < devices[n].lines.id[i].length; j++){
			parts[this.to_part[i][j]] = new PIXI.Sprite(texture);
			parts[this.to_part[i][j]].position.y = (this.stage_h - nodeH) / 2.0;
			parts[this.to_part[i][j]].position.x = (this.to_part[i][j] + i + 1) * nodeDis;
			if(BBAs[this.to_part[i][j]]){
			    BBAs[this.to_part[i][j]].lineStyle(0);
				BBAs[this.to_part[i][j]].beginFill(0x00ffff);
				BBAs[this.to_part[i][j]].drawRect(parts[this.to_part[i][j]].position.x + nodeW, this.stage_h / 2.0 - 5, 50, 10);
				BBAs[this.to_part[i][j]].endFill();
				BBAs[this.to_part[i][j]].interactive = true;
				BBAs[this.to_part[i][j]].buttonMode = true;
				BBAs[this.to_part[i][j]].on('mousedown', function(){
					    alert("");
				    });
			};
		};
		Num += devices[n].lines.id[i].length;
		graphics.lineTo((Num + i + 1) * nodeDis, this.stage_h / 2.0);
		graphics.moveTo((Num + i + 1) * nodeDis, this.stage_h / 2.0);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, this.stage_h / 2.0 - 8);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, this.stage_h / 2.0 + 8);
	};//绘制主线上的part
	
	
	graphics.lineStyle(6, 0xff3300, 1);
	for(var d = 1; d < this.parts_num; d++){
		for(i = 0; i < this.parts_num - d; i++){
			j = i + d;
			if(this.is_line[i][j]){
				parts[i].protein = new PIXI.Sprite(texture);
				parts[i].protein.position.x = parts[i].position.x;
				parts[i].protein.position.y = parts[i].position.y - this.protein_height[i] * floorDis;
				if(this.protein_height[i] > 0){
					this.part[i].upLine++;
					this.part[j].upLine++;
					k = nodeW / (this.part[i].upIndegree + this.part[i].upOutdegree + 1);
					l = nodeW / (this.part[j].upIndegree + this.part[j].upOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * this.part[i].upLine, parts[i].position.y);
					graphics.lineTo(parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + nodeH + 5);
					graphics.moveTo(parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + nodeH + 5);
					graphics.lineTo(parts[i].position.x + k * this.part[i].upLine - 8, parts[i].protein.position.y + nodeH + 15);
					graphics.lineTo(parts[i].position.x + k * this.part[i].upLine + 8, parts[i].protein.position.y + nodeH + 15);
					
					
					graphics.moveTo(parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0);
					graphics.lineTo(parts[j].position.x + l * this.part[j].upLine, parts[i].protein.position.y + nodeH / 2.0);
					graphics.moveTo(parts[j].position.x + l * this.part[j].upLine, parts[i].protein.position.y + nodeH / 2.0 - 3);
					graphics.lineTo(parts[j].position.x + l * this.part[j].upLine, parts[j].position.y - 8);
					if(this.line_type[i][j] == 'inh'){
						graphics.moveTo(parts[j].position.x + l * this.part[j].upLine - 10, parts[j].position.y - 7);
						graphics.lineTo(parts[j].position.x + l * this.part[j].upLine + 10, parts[j].position.y - 7);
					}else{
						graphics.moveTo(parts[j].position.x + l * this.part[j].upLine, parts[j].position.y - 5);
						graphics.lineTo(parts[j].position.x + l * this.part[j].upLine + 8, parts[j].position.y - 15);
						graphics.lineTo(parts[j].position.x + l * this.part[j].upLine - 8, parts[j].position.y - 15);
					};
				}else{
					this.part[i].downLine++;
					this.part[j].downLine++;
					k = nodeW / (this.part[i].downIndegree + this.part[i].downOutdegree + 1);
					l = nodeW / (this.part[j].downIndegree + this.part[j].downOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * this.part[i].downLine, parts[i].position.y+ nodeH);
					graphics.lineTo(parts[i].position.x + k * this.part[i].downLine, parts[i].protein.position.y - 5);
					graphics.moveTo(parts[i].position.x + k * this.part[i].downLine, parts[i].protein.position.y - 5);
					graphics.lineTo(parts[i].position.x + k * this.part[i].downLine - 8, parts[i].protein.position.y - 15);
					graphics.lineTo(parts[i].position.x + k * this.part[i].downLine + 8, parts[i].protein.position.y - 15);
					
					
					graphics.moveTo(parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0);
					graphics.lineTo(parts[j].position.x + l * this.part[j].downLine, parts[i].protein.position.y + nodeH / 2.0);
					graphics.moveTo(parts[j].position.x + l * this.part[j].downLine, parts[i].protein.position.y + nodeH / 2.0 + 3);
					graphics.lineTo(parts[j].position.x + l * this.part[j].downLine, parts[j].position.y + nodeH + 8);
					if(this.line_type[i][j] == 'inh'){
						graphics.moveTo(parts[j].position.x + l * this.part[j].downLine - 10, parts[j].position.y + nodeH + 7);
						graphics.lineTo(parts[j].position.x + l * this.part[j].downLine + 10, parts[j].position.y + nodeH + 7);
					}else{
						graphics.moveTo(parts[j].position.x + l * this.part[j].downLine, parts[j].position.y + nodeH + 5);
						graphics.lineTo(parts[j].position.x + l * this.part[j].downLine + 8, parts[j].position.y + nodeH + 15);
						graphics.lineTo(parts[j].position.x + l * this.part[j].downLine - 8, parts[j].position.y + nodeH + 15);
					};
				};
				
			};
		};
	};
	for(j = 0; j < devices[n].output.length; j++){
		i = parseInt(devices[n].output[j].substring(1)) - 1;
		this.part[i].upLine++;
		k = nodeW / (this.part[i].upIndegree + this.part[i].upOutdegree + 1);
		parts[i].protein = new PIXI.Sprite(texture);
		parts[i].protein.position.x = parts[i].position.x;
		parts[i].protein.position.y = parts[i].position.y - this.protein_height[i] * floorDis;
		graphics.moveTo(parts[i].position.x + k * this.part[i].upLine, parts[i].position.y);
		graphics.lineTo(parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + (nodeH + floorDis) / 2 - 3);
		graphics.moveTo(parts[i].position.x + k * this.part[i].upLine, parts[i].protein.position.y + (nodeH + floorDis) / 2);
		graphics.lineTo(parts[i].position.x + nodeW / 2, parts[i].protein.position.y + (nodeH + floorDis) / 2);
		graphics.moveTo(parts[i].position.x + nodeW / 2, parts[i].protein.position.y + (nodeH + floorDis) / 2 + 3);
		graphics.lineTo(parts[i].position.x + nodeW / 2, parts[i].protein.position.y + nodeH + 5);
		graphics.moveTo(parts[i].position.x + nodeW / 2, parts[i].protein.position.y + nodeH + 5);
		graphics.lineTo(parts[i].position.x + nodeW / 2 - 8, parts[i].protein.position.y + nodeH + 15);
		graphics.lineTo(parts[i].position.x + nodeW / 2 + 8, parts[i].protein.position.y + nodeH + 15);
	};//绘制有关蛋白质节点的支路
	
	
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id2[0] == 'e'){
			Num = parseInt(devices[n].map[i].id2.substring(1)) - 1;
			k = parseInt(devices[n].map[Num].id1.substring(1)) - 1;
			l = parseInt(devices[n].map[Num].id2.substring(1)) - 1;
            parts[k].protein.Text = new PIXI.Text(devices[n].map[i].id1);
			parts[k].protein.Text.anchor.x = 0.5;
			parts[k].protein.Text.anchor.y = 0.5;
			if(k < l){
				graphics.moveTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 40);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x + nodeW + 33, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 17, parts[k].protein.position.y + nodeH / 2.0 + 7);
				}else{
					graphics.moveTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 17, parts[k].protein.position.y + nodeH / 2.0 + 18);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 33, parts[k].protein.position.y + nodeH / 2.0 + 18);
				}
				
				
				
				parts[k].protein.Text.position.x = parts[k].protein.position.x + nodeW + 25;
				parts[k].protein.Text.position.y =  parts[k].protein.position.y + nodeH / 2.0 + 55;
				
			}else{
				graphics.moveTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 40);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x - 17, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x - 33, parts[k].protein.position.y + nodeH / 2.0 + 7);
				}else{
					graphics.moveTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 7);
					graphics.lineTo(parts[k].protein.position.x - 17, parts[k].protein.position.y + nodeH / 2.0 + 18);
					graphics.lineTo(parts[k].protein.position.x - 33, parts[k].protein.position.y + nodeH / 2.0 + 18);
				}
				
				parts[k].protein.Text.position.x = parts[k].protein.position.x - 25;
				parts[k].protein.Text.position.y = parts[k].protein.position.y + nodeH / 2.0 + 55;
			};
			
			for(var p = 0; p < devices[n].input.id.length; p++){
				if(devices[n].input.options[0][p] === devices[n].map[i].id1){
					this.input[p].x = parts[k].protein.Text.position.x;
					this.input[p].y = parts[k].protein.Text.position.y;
				}
			};
		}else{
			for(j = 0; j < devices[n].input.id.length; j++){
				if(devices[n].input.id[j] === devices[n].map[i].id1){
					k = parseInt(devices[n].map[i].id2.substring(1)) - 1;
					l = nodeW / (this.part[k].downIndegree + this.part[k].downOutdegree + 1);
					var p = 20;
					this.part[k].downLine++;
					parts[k].Text = new PIXI.Text(devices[n].map[i].id1);
			        parts[k].Text.anchor.x = 0.5;
			        parts[k].Text.anchor.y = 0.5;
					parts[k].Text.position.x = parts[k].position.x + this.part[k].downLine * l;
					parts[k].Text.position.y = parts[k].position.y + nodeH + 55 - p;
					graphics.moveTo(parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 8);
					graphics.lineTo(parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 40 - p);
					if(devices[n].map[i].type == 'inh'){
						graphics.moveTo(parts[k].position.x + this.part[k].downLine * l - 8, parts[k].position.y + nodeH + 8);
						graphics.lineTo(parts[k].position.x + this.part[k].downLine * l + 8, parts[k].position.y + nodeH + 8);
					}else{
						graphics.moveTo(parts[k].position.x + this.part[k].downLine * l, parts[k].position.y + nodeH + 8);
						graphics.lineTo(parts[k].position.x + this.part[k].downLine * l - 8, parts[k].position.y + nodeH + 18);
						graphics.lineTo(parts[k].position.x + this.part[k].downLine * l + 8, parts[k].position.y + nodeH + 18);
					};
					
					this.input[j].x = parts[k].Text.position.x;
					this.input[j].y = parts[k].Text.position.y;
					break;
				};
			};
		};
	};//绘制Input的支路
	
	for(i = 0; i < devices[n].output.length; i++){
		this.output[i].x = parts[(parseInt(devices[n].output[i].substring(1)) - 1)].protein.position.x;
		this.output[i].y = parts[(parseInt(devices[n].output[i].substring(1)) - 1)].protein.position.y;
	};
	
	
	
	
	
	
	this.stage.addChild(graphics);
	for(i = 0; i < this.parts_num; i++){
		if(BBAs[i])
		    this.stage.addChild(BBAs[i]);
		this.stage.addChild(parts[i]);
		if(parts[i].protein){
		    this.stage.addChild(parts[i].protein);
			if(parts[i].protein.Text){
				this.stage.addChild(parts[i].protein.Text);
			};
		};
		if(parts[i].Text)
		    this.stage.addChild(parts[i].Text);
	};
	
	
	
};//绘制函数


};


/** 
* @description analyse the layout of the whole devices
* @param {devices} the whole devices
*/ 
this.devs_analysis = function(devices){
	var i, j, k, l, temp;
	this.devs = [];
	for(i = 0; i < devices.length; i++){
		this.devs[i] = new dev();
		this.devs[i].draw(devices, i);
	};
	for(i = 0; i < devices.length; i++){
		for(j = 0; j < devices[i].output.length; j++){
			for(k = 0; k < devices.length; k++){
				for(l = 0; l < devices[k].input.id.length; l++){
					if(devices[i].lines.options[0][(parseInt(devices[i].output[j].substring(1)) - 1)] === devices[k].input.options[0][l]){
						this.devs[k].input[l].to_dev_index = i;
						this.devs[k].input[l].to_dev_output_index = j;
						this.devs[i].output[j].to_dev_index = k;
						this.devs[i].output[j].to_dev_input_index = l;
						k = devices.length;
						break;
					};
				};
			};
		};
	};
	this.poi = [];
	this.poi[0] = [];
	for(i = 0; i < devices.length; i++){
		for(j = 0; j < devices[i].input.id.length; j++){
			if(this.devs[i].input[j].to_dev_index === null){
					this.poi[0][this.poi[0].length] = this.devs[i];
				this.devs[i].chosen = true;
				break;
			}
		};
	};
	i = 0;
	while(this.poi[i].length > 0){
		this.poi[i + 1] = [];
		for(j = 0; j < this.poi[i].length; j++){
			for(k = 0; k < this.poi[i][j].output.length; k++){
				if(this.poi[i][j].output[k].to_dev_index !== null){
    				if(this.devs[this.poi[i][j].output[k].to_dev_index].chosen === false){
	     				this.poi[i + 1][this.poi[i + 1].length] = this.devs[this.poi[i][j].output[k].to_dev_index];
		    			this.devs[this.poi[i][j].output[k].to_dev_index].chosen = true;
						break;
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
		if(this.devs_height < this.row[i].node_height * this.poi[i].length)
		    this.devs_height = this.row[i].node_height * this.poi[i].length;
	};
	var x = 0;
	for(i = 0; i < this.row.length; i++){
		for(j = 0; j < this.poi[i].length; j++){
			this.poi[i][j].stage.position.x = x;
			this.poi[i][j].stage.position.y = (j + 1) / (this.poi[i].length + 1) * this.devs_height - this.poi[i][j].stage_h / 2;
			this.stage.movable_stage.addChild(this.poi[i][j].stage);
		};
		x += this.row[i].width;
	};
	this.devs_width = x;
};
this.draw_lines_between_devices = function(){
	var i, j, k, l, temp;
	for(i = 0; i < this.devs.length; i++){
		for(j = 0; j < this.devs[i].output.length; j++){
			if(this.devs[i].output[j].to_dev_index !== null){
				var graphic = new PIXI.Graphics();
				graphic.lineStyle(6, 0xffff00, 1);
				var input_dev =  this.devs[this.devs[i].output[j].to_dev_index];
				var input_x = input_dev.stage.position.x + input_dev.input[this.devs[i].output[j].to_dev_input_index].x;
				var input_y = input_dev.stage.position.y + input_dev.input[this.devs[i].output[j].to_dev_input_index].y;
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
					graphic.lineTo(input_x, input_y + 13);
					graphic.moveTo(input_x, input_y + 13);
					graphic.lineTo(input_x - 4, input_y + 18);
					graphic.lineTo(input_x + 4, input_y + 18);
				}else{
					graphic.moveTo(output_x, output_y + nodeH / 2);
					graphic.lineTo(output_x - 28, output_y + nodeH / 2);
					graphic.moveTo(output_x - 25, output_y + nodeH / 2);
					graphic.lineTo(output_x - 25, input_y + 30 + (input_y + 30 > output_y + nodeH / 2 ? 3 : -3));
					graphic.moveTo(output_x - 25, input_y + 30);
					graphic.lineTo(input_x, input_y + 30);
					graphic.moveTo(input_x, input_y + 33);
					graphic.lineTo(input_x, input_y + 13);
					graphic.moveTo(input_x, input_y + 13);
					graphic.lineTo(input_x - 4, input_y + 18);
					graphic.lineTo(input_x + 4, input_y + 18);
				}
				
				
				
				this.stage.movable_stage.addChild(graphic);
			};
		};
	};

};
/** 
* @description draw one device or the whole devices
* @param {devices} the whole devices
* @param {Num} the index of the device you want to draw (If n is equal to -1, the stage returned will contain the whole devices)
*/ 
this.draw = function(devices, n){
	
	
	if(n !== -1){
		var i, j, k, l, temp;
		this.devs_analysis(devices);
		this.draw_lines_between_devices();
		
		
		
		
		
		
		this.stage.movable_stage._scale = this.stage.movable_stage.scale.x = this.stage.movable_stage.scale.y = this.row[0].width / this.devs_width;
		this.stage.movable_stage.position.x = (BioBLESS.width - this.devs_width * this.row[0].width / this.devs_width) / 2; 
		this.stage.movable_stage.position.y = (BioBLESS.height - this.devs_height * this.row[0].width / this.devs_width) / 2; 
		
	}else{
	    this.stage.movable_stage._scale = 1;
	
	
	
		var w = BioBLESS.width;
		var device = new dev();
		device.draw(devices, n);
	
	
		this.stage.movable_stage.addChild(device.stage);
		var moveX = w / 2 - (this.parts_num + this.lines_num + 1) * 90 + 25;
		if(moveX > 0)
		    this.stage.movable_stage.position.x = moveX;
		
	};
	this.stage.addChild(this.stage.movable_stage);
	return this.stage;
}


};
BioBLESS.device = new device_obj();
})();
