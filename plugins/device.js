            var DevicesModule = function(){};
            DevicesModule.GetDevice = function(devices){};
            DevicesModule.Draw = function(devices, n, renderer){
				var linesNum = devices[n].lines.length;//主线数
				
				var partsNum = 0;//主线上总结点数
				var partToline = new Array();
				for(i = 0; i < linesNum; i++){
					for(j = 0; j < devices[n].lines[i].id.length; j++)
					    partToline[partsNum + j] = i;
				    partsNum = partsNum + devices[n].lines[i].id.length;
				};//计算总结点数
				
				var i, j, k, l, Num, s;//备用变量
				
				var isDNA = new Array();//用于指示第i条主线的第j个节点是否是DNA
				isDNA[0] = [false, true, true, false, false];//测试用数据
				isDNA[1] = [false, false];//测试用数据
				
				var isLine = new Array();//用于指示是否有支线从第i个节点连接到第j个节点
				var lineType = new Array();
				for(i = 0; i < partsNum; i++){
				    isLine[i] = new Array();
					lineType[i] = new Array();
					for(j = 0; j < partsNum; j++){
					    isLine[i][j] = false;
						lineType[i][j] = null;
					};
				};
				Num = 0;
				for(i = 0; i < devices[n].lines.length; i++){
					for(j = 0; j < devices[n].lines[i].id.length; j++){
						if(isDNA[i][j]){
							var endi = -1, endj = -1;
							for(k = 0; k < devices[n].map.length; k++){
								if(devices[n].map[k].l1 == i && devices[n].map[k].id1 == devices[n].lines[i].id[j]){
									for(l = 0; l < devices[n].map.length; l++){
										if(devices[n].map[k].id2 == devices[n].map[l].id1){
											endi = devices[n].map[l].l2;
											for(var o = 0; o < devices[n].lines[endi].id.length; o++){
												if(devices[n].lines[endi].id[o] == devices[n].map[l].id2){
												    endj = o;
													s = devices[n].map[l].type;
													break;
												};
											};
											break;
										};
									};
									break;
								};
							};
							if(endi == -1 || endj == -1){
								alert("Error!");
								return;
							};
							for(k = 0; k < endi; k++)
							    endj += devices[n].lines[k].id.length;
							isLine[Num + j][endj] = true;
							lineType[Num + j][endj] = s;
						};
					};
					Num = Num + devices[n].lines[i].length;
					
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
                //renderer = PIXI.autoDetectRenderer(stageW, stageH, f);
                //if(!renderer)
                //    return;
                var stage = new PIXI.Container();
                
                var texture = PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAoCAIAAAC95rUiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB8SURBVGhD7dExAcAgEMDAb42xIr6iuuCBDHdLBORZ+xtue0+5yoYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGxJsSLAhwYYEGwJmfrGzAaMiHjaeAAAAAElFTkSuQmCC");
				
				var parts = new Array();
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(10, 0x00ff55, 1);
				Num = 0;
				for(i = 0; i < linesNum; i++){
					graphics.moveTo((Num + i + 1) * nodeDis - 40, stageH / 2.0);
					for(j = 0; j < devices[n].lines[i].id.length; j++){
						parts[Num + j] = new PIXI.Sprite(texture);
						parts[Num + j].position.y = (stageH - nodeH) / 2.0;
						parts[Num + j].position.x = (Num + j + i + 1) * nodeDis;
					};
					Num += devices[n].lines[i].id.length;
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
					if(devices[n].map[i].l2 == -4){
						Num = parseInt(devices[n].map[i].id2.substring(1));
						k = parseInt(devices[n].map[Num - 1].id1.substring(1)) - 1;
						l = parseInt(devices[n].map[Num - 1].id2.substring(1)) - 1;
						for(j = 0; j < devices[n].map[Num - 1].l1; j++)
						    k += devices[n].lines[j].id.length;
						for(j = 0; j < devices[n].map[Num- 1].l2; j++)
						    l += devices[n].lines[j].id.length;

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
				};
				
				
				
				
				
				
				
				
				stage.addChild(graphics);
				for(i = 0; i < partsNum; i++){
					stage.addChild(parts[i]);
					if(parts[i].protein){
					    stage.addChild(parts[i].protein);
						if(parts[i].protein.Text){
							stage.addChild(parts[i].protein.Text);
						};
					};
				};
				
				//animate();
                
				//function animate() {
 				//   renderer.render(stage);
 				//   requestAnimationFrame( animate );
				//};
                return stage;
				
			};//绘制函数
			
			
			
			
            DevicesModule.OnDoubleClick = function(){};






//Test Below











	    main = function(renderer) {
			var Devices = 
			[{
			    'id': 0,
   			    'name': 'test',
  			    'icon':  null,
				
  			    'type': 
				{
   			        'type': null,
   			        'function': '',
    			    'chassis':'',
  			        'standard':'',
  			        'contributor':''
  			    },
				
  			    'lines':
  			    [
				    {
   			            'id':['d1', 'd2', 'd3', 'd4', 'd5'],
   			            'options':[]
  			        },
					{
   			            'id':['d1', 'd2'],
   			            'options':[]
  			        },
				],
				
  			    'input':
				{
   			        'id':['p100', 'p200'],
   			        'options':[]
   			    },
  			    'output':['p5', 'p6'],
			  
  			    'map':
                [    //所有的id为一个字符加一个无符号数   p代表蛋白质 e代表反应 d代表dna
    			    {id:'e1', id1:'d2', l1:0, id2:'p2', l2:0, type:'trans'},
     			    {id:'e2', id1:'p2', id2:'d4', type:'inh', l1:0, l2:0},
     			    {id:'e3', id1:'p100', id2:'e2', type:'inh', l1:-2, l2:-4},
    			    {id:'e4', id1:'d3', id2:'p3', type:'trans', l1:0, l2:0},
					{id:'e5', id1:'p3', id2:'d1', type:'inh', l1:0, l2:1},
					{id:'e6', id1:'p200', id2:'e5', type:'inh', l1:-2, l2:-4}
					
  			    ],
				
   			    'posloc':
  			    [
  			        {from:'d1', to:'d2'}
  			    ]   
            }];//测试用devices
			
			return DevicesModule.Draw(Devices, 0, renderer);
		};
