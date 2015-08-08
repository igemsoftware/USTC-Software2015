BioBLESS.device = new function() {
this.stage = new PIXI.Container();
this.stage.movable_stage = new PIXI.Container();
this.stage.movable_stage._scale = 1;
this.prepare = function(devices, n){
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
					alert("Error!");
					return;
				};
				
				this.is_line[Num + j][end] = true;
				this.line_type[Num + j][end] = s;
			};
		};
		Num = Num + this.lines_num;	
	};//计算this.is_line与this.line_type
};
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
					this.protein_height[i] += 1;
					for(k = 0; k < i; k++){
						for(l = i; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[k] += 1;
							if(this.is_line[l][k] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[l] += 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[k] += 1;
							if(this.is_line[l][k] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[l] += 1;
						};
					};
					if(this.is_line[j][i])
					    this.protein_height[j] += 1;
				}else{
					this.protein_height[i] -= 1;
					for(k = 0; k < i; k++){
						for(l = i; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[k] -= 1;
							if(this.is_line[l][k] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[l] -= 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[k] -= 1;
							if(this.is_line[l][k] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[l] -= 1;
						};
					};
					if(this.is_line[j][i])
					    this.protein_height[j] -= 1;
				};
				
			};
			if(this.is_line[j][i]){
				if(this.part_to_line[i] == this.part_to_line[j]){
					this.protein_height[j] += 1;
					for(k = 0; k < i; k++){
						for(l = i; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[k] += 1;
							if(this.is_line[l][k] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[l] += 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[k] += 1;
							if(this.is_line[l][k] && this.part_to_line[k] == this.part_to_line[l])
							    this.protein_height[l] += 1;
						};
					};
				}else{
					this.protein_height[j] -= 1;
					for(k = 0; k < i; k++){
						for(l = i; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[k] -= 1;
							if(this.is_line[l][k] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[l] -= 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < this.parts_num; l++){
							if(this.is_line[k][l] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[k] -= 1;
							if(this.is_line[l][k] && this.part_to_line[k] != this.part_to_line[l])
							    this.protein_height[l] -= 1;
						};
					};
				};
			};
		};
	};//计算this.protein_height
	this.protein_heightest = 0, this.protein_lowest = 0;//蛋白质节点的最大高度与最低高度
	for(i = 0; i < this.parts_num; i++){
		if(this.protein_height[i] > this.protein_heightest) this.protein_heightest = this.protein_height[i];
		if(this.protein_height[i] < this.protein_lowest) this.protein_lowest = this.protein_height[i];
	};
};
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
		for(j = 0; j < this.parts_num; j++){
   			if(this.part_to_line[i] == this.part_to_line[j]){
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
};
this.draw = function(devices, n){
	this.stage.movable_stage._scale = 1;
	var w = BioBLESS.width;
	if(!devices[n]){
		alert("Error!");
		return;
	};
	this.prepare(devices, n);
	this.line_analysis(devices, n);
	this.height_analysis(devices, n);
	this.part_analysis(devices, n);
	var i, j, k, l, Num, s;//备用变量
	//////////////////////////////////////////////////数据处理
	var nodeH = 40, nodeW = 130, nodeDis = 180, floorDis = 120;
	var stageH = floorDis * (this.protein_heightest - this.protein_lowest + 4);
	var stageW = nodeDis * (this.parts_num + 3);
	if(stageH < $("body").height())
	    stageH = $("body").height();
	if(stageW < $("body").width())
	    stageW = $("body").width();
    
    
    
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
		graphics.moveTo((this.to_part[i][0] + i + 1) * nodeDis - 40, stageH / 2.0);
		for(j = 0; j < devices[n].lines.id[i].length; j++){
			parts[this.to_part[i][j]] = new PIXI.Sprite(texture);
			parts[this.to_part[i][j]].position.y = (stageH - nodeH) / 2.0;
			parts[this.to_part[i][j]].position.x = (this.to_part[i][j] + i + 1) * nodeDis;
			if(BBAs[this.to_part[i][j]]){
			    BBAs[this.to_part[i][j]].lineStyle(0);
				BBAs[this.to_part[i][j]].beginFill(0x00ffff);
				BBAs[this.to_part[i][j]].drawRect(parts[this.to_part[i][j]].position.x + nodeW, stageH / 2.0 - 5, 50, 10);
				BBAs[this.to_part[i][j]].endFill();
				BBAs[this.to_part[i][j]].interactive = true;
				BBAs[this.to_part[i][j]].buttonMode = true;
				BBAs[this.to_part[i][j]].on('mousedown', function(){
					    alert("");
				    });
				
			};
		};
		Num += devices[n].lines.id[i].length;
		graphics.lineTo((Num + i + 1) * nodeDis, stageH / 2.0);
		graphics.moveTo((Num + i + 1) * nodeDis, stageH / 2.0);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, stageH / 2.0 - 8);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, stageH / 2.0 + 8);
	};//绘制主线上的part
	
	
	graphics.lineStyle(6, 0xff3300, 1);
	for(i = 0; i < this.parts_num; i++){
		for(j = 0; j < this.parts_num; j++){
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
	};//绘制有关蛋白质节点的支路
	
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id2[0] == 'e'){
			Num = parseInt(devices[n].map[i].id2.substring(1)) - 1;
			k = parseInt(devices[n].map[Num].id1.substring(1)) - 1;
			l = parseInt(devices[n].map[Num].id2.substring(1)) - 1;

			if(k < l){
				graphics.moveTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 40);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x + nodeW + 33, parts[k].protein.position.y + nodeH / 2.0 + 8);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 17, parts[k].protein.position.y + nodeH / 2.0 + 8);
				}else{
					graphics.moveTo(parts[k].protein.position.x + nodeW + 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 17, parts[k].protein.position.y + nodeH / 2.0 + 18);
					graphics.lineTo(parts[k].protein.position.x + nodeW + 33, parts[k].protein.position.y + nodeH / 2.0 + 18);
				}
				
				
				parts[k].protein.Text = new PIXI.Text(devices[n].map[i].id1);
				parts[k].protein.Text.position.x = parts[k].protein.position.x + nodeW;
				parts[k].protein.Text.position.y =  parts[k].protein.position.y + nodeH / 2.0 + 40;
				
			}else{
				graphics.moveTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
				graphics.lineTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 40);
				if(devices[n].map[i].type == 'inh'){
					graphics.moveTo(parts[k].protein.position.x - 17, parts[k].protein.position.y + nodeH / 2.0 + 8);
					graphics.lineTo(parts[k].protein.position.x - 33, parts[k].protein.position.y + nodeH / 2.0 + 8);
				}else{
					graphics.moveTo(parts[k].protein.position.x - 25, parts[k].protein.position.y + nodeH / 2.0 + 8);
					graphics.lineTo(parts[k].protein.position.x - 17, parts[k].protein.position.y + nodeH / 2.0 + 18);
					graphics.lineTo(parts[k].protein.position.x - 33, parts[k].protein.position.y + nodeH / 2.0 + 18);
				}
				parts[k].protein.Text = new PIXI.Text(devices[n].map[i].id1);
				parts[k].protein.Text.position.x = parts[k].protein.position.x - 50;
				parts[k].protein.Text.position.y =  parts[k].protein.position.y + nodeH / 2.0 + 40;
			};
				
				
			
		};
	};//绘制Input的支路
	
	this.stage.movable_stage.addChild(graphics);
	for(i = 0; i < this.parts_num; i++){
		if(BBAs[i])
		    this.stage.movable_stage.addChild(BBAs[i]);
		this.stage.movable_stage.addChild(parts[i]);
		if(parts[i].protein){
		    this.stage.movable_stage.addChild(parts[i].protein);
			if(parts[i].protein.Text){
				this.stage.movable_stage.addChild(parts[i].protein.Text);
			};
		};
	};
	
	var moveX = w / 2 - (this.parts_num + this.lines_num + 1) * 90 + 25;
	if(moveX > 0)
	    this.stage.movable_stage.position.x = moveX;
	this.stage.addChild(this.stage.movable_stage);
	return this.stage;
	
};//绘制函数

};
