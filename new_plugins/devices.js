this.stage = new PIXI.Container();
this.stage.child_stage = new PIXI.Container();

this.draw = function(devices, n, w){
	if(!devices[n]){
		alert("Error!");
		return;
	};
	var linesNum = devices[n].lines.id.length;//主线数
	
	var partsNum = 0;//主线上总结点数
	var partToline = new Array();//part序号到其所在主线序号的映射
	var toPart = new Array();
	var isDNA = new Array();//用于指示第i条主线的第j个节点是否是DNA
	for(i = 0; i < linesNum; i++){
		toPart[i] = new Array();
		isDNA[i] = new Array();
		for(j = 0; j < devices[n].lines.id[i].length; j++){
		    partToline[partsNum + j] = i;
			toPart[i][j] = partsNum + j;
			isDNA[i][j] = false;
		};
	    partsNum = partsNum + devices[n].lines.id[i].length;
	};//计算总结点数
	
	for(i = 0; i < devices[n].map.length; i++){
		if(devices[n].map[i].id1[0] == 'd'){
			isDNA[partToline[parseInt(devices[n].map[i].id1.substring(1)) - 1]][parseInt(devices[n].map[i].id1.substring(1)) - 1] = true;
		};
	};
	
	var i, j, k, l, Num, s;//备用变量
	
	
	var isLine = new Array();//用于指示是否有支线从第i个节点连接到第j个节点
	var lineType = new Array();//线的类型
	for(i = 0; i < partsNum; i++){
	    isLine[i] = new Array();
		lineType[i] = new Array();
		for(j = 0; j < partsNum; j++){
		    isLine[i][j] = false;
			lineType[i][j] = null;
		};
	};
	Num = 0;
	for(i = 0; i < devices[n].lines.id.length; i++){
		for(j = 0; j < devices[n].lines.id[i].length; j++){
			if(isDNA[i][j]){
				var end = -1;
				for(k = 0; k < devices[n].map.length; k++){
					if(devices[n].map[k].id1[0] == 'd' && parseInt(devices[n].map[k].id1.substring(1)) - 1 == toPart[i][j]){
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
				
				isLine[Num + j][end] = true;
				lineType[Num + j][end] = s;
			};
		};
		Num = Num + devices[n].lines.id.length;	
	};//计算isLine
	
	var pHeight = new Array(partsNum);//蛋白质节点的相对高度,0表示该主线节点不生成蛋白质
	for(i = 0; i < partsNum; i++)
	    pHeight[i] = 0;
	for(Num = 1; Num < partsNum; Num++){
		for(i = 0; i < partsNum - Num; i++){
			j = i + Num;
			if(isLine[i][j]){
				if(partToline[i] == partToline[j]){
					pHeight[i] += 1;
					for(k = 0; k < i; k++){
						for(l = i; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] == partToline[l])
							    pHeight[k] += 1;
							if(isLine[l][k] && partToline[k] == partToline[l])
							    pHeight[l] += 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] == partToline[l])
							    pHeight[k] += 1;
							if(isLine[l][k] && partToline[k] == partToline[l])
							    pHeight[l] += 1;
						};
					};
					if(isLine[j][i])
					    pHeight[j] += 1;
				}else{
					pHeight[i] -= 1;
					for(k = 0; k < i; k++){
						for(l = i; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] != partToline[l])
							    pHeight[k] -= 1;
							if(isLine[l][k] && partToline[k] != partToline[l])
							    pHeight[l] -= 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] != partToline[l])
							    pHeight[k] -= 1;
							if(isLine[l][k] && partToline[k] != partToline[l])
							    pHeight[l] -= 1;
						};
					};
					if(isLine[j][i])
					    pHeight[j] -= 1;
				};
				
			};
			if(isLine[j][i]){
				if(partToline[i] == partToline[j]){
					pHeight[j] += 1;
					for(k = 0; k < i; k++){
						for(l = i; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] == partToline[l])
							    pHeight[k] += 1;
							if(isLine[l][k] && partToline[k] == partToline[l])
							    pHeight[l] += 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] == partToline[l])
							    pHeight[k] += 1;
							if(isLine[l][k] && partToline[k] == partToline[l])
							    pHeight[l] += 1;
						};
					};
				}else{
					pHeight[j] -= 1;
					for(k = 0; k < i; k++){
						for(l = i; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] != partToline[l])
							    pHeight[k] -= 1;
							if(isLine[l][k] && partToline[k] != partToline[l])
							    pHeight[l] -= 1;
						};
					};
					for(k = i; k <= j; k++){
						for(l = j + 1; l < partsNum; l++){
							if(isLine[k][l] && partToline[k] != partToline[l])
							    pHeight[k] -= 1;
							if(isLine[l][k] && partToline[k] != partToline[l])
							    pHeight[l] -= 1;
						};
					};
				};
			};
		};
	};//计算pHeight
	var heightest = 0, lowest = 0;
	for(i = 0; i < partsNum; i++){
		if(pHeight[i] > heightest) heightest = pHeight[i];
		if(pHeight[i] < lowest) lowest = pHeight[i];
	};
	
	var node = new Array();
    for(i = 0; i < partsNum; i++){
		node[i] = function(){};
    				node[i].upIndegree = 0;//上入度
		node[i].upOutdegree = 0;//上出度
		node[i].downIndegree = 0;//下入度
		node[i].downOutdegree = 0;//下出度
		node[i].upLine = 0;//上部已连线数
		node[i].downLine = 0;//下部已连线数
	    			for(j = 0; j < partsNum; j++){
		    			if(partToline[i] == partToline[j]){
    			if(isLine[i][j])
	    		    node[i].upOutdegree += 1;
		    	if(isLine[j][i])
			        node[i].upIndegree += 1;
    					}else{
	    					if(isLine[i][j])
		    				    node[i].downOutdegree += 1;
    			if(isLine[j][i])
	    		    node[i].downIndegree += 1;
		    };
    				};
	    		};
	
	//////////////////////////////////////////////////数据处理
	
	
	
	
	
	var nodeH = 40, nodeW = 130, nodeDis = 180, floorDis = 120;
	var stageH = floorDis * (heightest - lowest + 4);
	var stageW = nodeDis * (partsNum + 3);
	if(stageH < $("body").height())
	    stageH = $("body").height();
	if(stageW < $("body").width())
	    stageW = $("body").width();
    
    
    
    var texture = PIXI.Texture.fromImage("test.png");
	
	var parts = new Array();
	var BDEs = new Array();
	for(i = 0; i < devices[n].posloc.length; i++){
		BDEs[toPart[devices[n].posloc[i].l1][parseInt(devices[n].posloc[i].from.substring(1)) - 1]] = new PIXI.Graphics();
	};
	var graphics = new PIXI.Graphics();
	
	graphics.lineStyle(10, 0x00ff55, 1);
	Num = 0;
	for(i = 0; i < linesNum; i++){
		graphics.moveTo((toPart[i][0] + i + 1) * nodeDis - 40, stageH / 2.0);
		for(j = 0; j < devices[n].lines.id[i].length; j++){
			parts[toPart[i][j]] = new PIXI.Sprite(texture);
			parts[toPart[i][j]].position.y = (stageH - nodeH) / 2.0;
			parts[toPart[i][j]].position.x = (toPart[i][j] + i + 1) * nodeDis;
			if(BDEs[toPart[i][j]]){
			    BDEs[toPart[i][j]].lineStyle(0);
				BDEs[toPart[i][j]].beginFill(0x00ffff);
				BDEs[toPart[i][j]].drawRect(parts[toPart[i][j]].position.x + nodeW, stageH / 2.0 - 5, 50, 10);
				BDEs[toPart[i][j]].endFill();
				BDEs[toPart[i][j]].interactive = true;
				BDEs[toPart[i][j]].buttonMode = true;
				BDEs[toPart[i][j]].on('mousedown', function(){
					    alert("");
				    });
				
			};
		};
		Num += devices[n].lines.id[i].length;
		graphics.lineTo((Num + i + 1) * nodeDis, stageH / 2.0);
		graphics.moveTo((Num + i + 1) * nodeDis, stageH / 2.0);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, stageH / 2.0 - 8);
		graphics.lineTo((Num + i + 1) * nodeDis - 11, stageH / 2.0 + 8);
	};//主线上的part
	
	
	graphics.lineStyle(6, 0xff3300, 1);
	for(i = 0; i < partsNum; i++){
		for(j = 0; j < partsNum; j++){
			if(isLine[i][j]){
				parts[i].protein = new PIXI.Sprite(texture);
				parts[i].protein.position.x = parts[i].position.x;
				parts[i].protein.position.y = parts[i].position.y - pHeight[i] * floorDis;
				if(pHeight[i] > 0){
					node[i].upLine++;
					node[j].upLine++;
					k = nodeW / (node[i].upIndegree + node[i].upOutdegree + 1);
					l = nodeW / (node[j].upIndegree + node[j].upOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * node[i].upLine, parts[i].position.y);
					graphics.lineTo(parts[i].position.x + k * node[i].upLine, parts[i].protein.position.y + nodeH + 5);
					graphics.moveTo(parts[i].position.x + k * node[i].upLine, parts[i].protein.position.y + nodeH + 5);
					graphics.lineTo(parts[i].position.x + k * node[i].upLine - 8, parts[i].protein.position.y + nodeH + 15);
					graphics.lineTo(parts[i].position.x + k * node[i].upLine + 8, parts[i].protein.position.y + nodeH + 15);
					
					
					graphics.moveTo(parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0);
					graphics.lineTo(parts[j].position.x + l * node[j].upLine, parts[i].protein.position.y + nodeH / 2.0);
					graphics.moveTo(parts[j].position.x + l * node[j].upLine, parts[i].protein.position.y + nodeH / 2.0 - 3);
					graphics.lineTo(parts[j].position.x + l * node[j].upLine, parts[j].position.y - 8);
					if(lineType[i][j] == 'inh'){
						graphics.moveTo(parts[j].position.x + l * node[j].upLine - 10, parts[j].position.y - 7);
						graphics.lineTo(parts[j].position.x + l * node[j].upLine + 10, parts[j].position.y - 7);
					}else{
						graphics.moveTo(parts[j].position.x + l * node[j].upLine, parts[j].position.y - 5);
						graphics.lineTo(parts[j].position.x + l * node[j].upLine + 8, parts[j].position.y - 15);
						graphics.lineTo(parts[j].position.x + l * node[j].upLine - 8, parts[j].position.y - 15);
					};
				}else{
					node[i].downLine++;
					node[j].downLine++;
					k = nodeW / (node[i].downIndegree + node[i].downOutdegree + 1);
					l = nodeW / (node[j].downIndegree + node[j].downOutdegree + 1);
					graphics.moveTo(parts[i].position.x + k * node[i].downLine, parts[i].position.y+ nodeH);
					graphics.lineTo(parts[i].position.x + k * node[i].downLine, parts[i].protein.position.y - 5);
					graphics.moveTo(parts[i].position.x + k * node[i].downLine, parts[i].protein.position.y - 5);
					graphics.lineTo(parts[i].position.x + k * node[i].downLine - 8, parts[i].protein.position.y - 15);
					graphics.lineTo(parts[i].position.x + k * node[i].downLine + 8, parts[i].protein.position.y - 15);
					
					
					graphics.moveTo(parts[i].protein.position.x + nodeW, parts[i].protein.position.y + nodeH / 2.0);
					graphics.lineTo(parts[j].position.x + l * node[j].downLine, parts[i].protein.position.y + nodeH / 2.0);
					graphics.moveTo(parts[j].position.x + l * node[j].downLine, parts[i].protein.position.y + nodeH / 2.0 + 3);
					graphics.lineTo(parts[j].position.x + l * node[j].downLine, parts[j].position.y + nodeH + 8);
					if(lineType[i][j] == 'inh'){
						graphics.moveTo(parts[j].position.x + l * node[j].downLine - 10, parts[j].position.y + nodeH + 7);
						graphics.lineTo(parts[j].position.x + l * node[j].downLine + 10, parts[j].position.y + nodeH + 7);
					}else{
						graphics.moveTo(parts[j].position.x + l * node[j].downLine, parts[j].position.y + nodeH + 5);
						graphics.lineTo(parts[j].position.x + l * node[j].downLine + 8, parts[j].position.y + nodeH + 15);
						graphics.lineTo(parts[j].position.x + l * node[j].downLine - 8, parts[j].position.y + nodeH + 15);
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
	
	
	
	
	
	
	
	
	this.stage.child_stage.addChild(graphics);
	for(i = 0; i < partsNum; i++){
		if(BDEs[i])
		    this.stage.child_stage.addChild(BDEs[i]);
		this.stage.child_stage.addChild(parts[i]);
		if(parts[i].protein){
		    this.stage.child_stage.addChild(parts[i].protein);
			if(parts[i].protein.Text){
				this.stage.child_stage.addChild(parts[i].protein.Text);
			};
		};
	};
	
	var moveX = w / 2 - (partsNum + linesNum + 1) * 90 + 25;
	if(moveX > 0)
	    this.stage.child_stage.position.x = moveX;
	this.stage.addChild(this.stage.child_stage);
	return this.stage;
	
};//绘制函数


