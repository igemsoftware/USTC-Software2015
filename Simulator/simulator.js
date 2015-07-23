var Simulator = new function(){
	    this.stage = null;
	};
Simulator.GetNodes = function(){};
Simulator.Draw = function(nodes, style){
	var xAxis = 1100, yAxis = 600;
	var ox = 350, oy = 800;
	renderer = PIXI.autoDetectRenderer(1920, 1080, style);
    if(!renderer)
        return;
	this.stage = new PIXI.Container();
	///////////////////////////////////
	graphics = new PIXI.Graphics();
	graphics.lineStyle(2, 0x000000, 1);
	graphics.moveTo(ox, oy);
	graphics.lineTo(ox + xAxis, oy);
	graphics.moveTo(ox, oy + 1);
	graphics.lineTo(ox, oy - yAxis);
	
	
	var maxY = 0;
	for(var i = 0; i < nodes.c.length; i++){
		if(maxY < nodes.c[i][nodes.c[i].length - 1]){
			maxY = nodes.c[i][nodes.c[i].length - 1];
		};
	};
	
	var xDis = 0, yDis = 0;
	xDis = nodes.t[nodes.t.length - 1] / 25;
	var dis1 = function(x){
		if(x >= 10){
			return dis1(x / 10) * 10;
		}else{
			if(x < 1.5){
				return 1;
			};
			x /= 2;
			return (parseInt(x) + ((x - parseInt(x)) >= 0.5 ? 1 : 0)) * 2;
		};
	};
	var dis2 = function(x){
		if(x <= 1){
			return dis2(x * 10) / 10;
		}else{
			if(x < 1.5){
				return 1;
			};
			x /= 2;
			return (parseInt(x) + ((x - parseInt(x)) >= 0.5 ? 1 : 0)) * 2;
		};
	};
	
	if(xDis > 5){
		xDis = dis1(xDis) * 5;
	}else if(xDis < 5){
		xDis = dis2(xDis) * 5;
	};
	
	yDis = maxY / 35;
	if(yDis > 5){
		yDis = dis1(yDis) * 5;
	}else if(xDis < 5){
		yDis = dis2(yDis) * 5;
	};
	
	ox += 20;
	oy -= 20;
	var i = 0, d = (xAxis - 50) / nodes.t[nodes.t.length - 1] * 
	xDis / 5;
	while(i * d < xAxis - 50){
		graphics.moveTo(ox + i * d, oy + 20);
		graphics.lineTo(ox + i * d, oy + 13 - ((i % 5) ? 0 : 7));
		if(!(i % 5)){
			var Text = new PIXI.Text((i / 5 * xDis).toString());
			Text.position.x = ox + i * d - (i / 5 * yDis).toString().length * 8;
			Text.position.y = oy + 20;
			this.stage.addChild(Text);
		};
		i++;
	};
	
	var i = 0, d = (yAxis - 100) / maxY * 
	yDis / 5;
	while(i * d < yAxis - 50){
		graphics.moveTo(ox - 20, oy - i * d);
		graphics.lineTo(ox - 13 + ((i % 5) ? 0 : 7), oy - i * d);
		if(!(i % 5)){
			var Text = new PIXI.Text((i / 5 * yDis).toString());
			Text.position.x = ox - 20 - (i / 5 * yDis).toString().length * 16;
			Text.position.y = oy - i * d - 14;
			this.stage.addChild(Text);
		};
		i++;
	};
	
	//////////////////////////////////绘制坐标轴
	var _color, gray = 0, red, green, blue;
	for(var i = 0; i < nodes.c.length; i++){
		gray = 255;
		while(gray > 155 || gray < 100){
			red = parseInt(Math.random() * 255);
			green = parseInt(Math.random() * 255);
			blue = parseInt(Math.random() * 255);
			gray = 0.3 * red + 0.6 * green + 0.1 * blue;
		};
		_color = red * 65536 + green * 256 + blue;
		graphics.lineStyle(2, _color, 1);
		graphics.moveTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[0], 
		oy - (yAxis - 100) * nodes.c[i][0] / maxY);
		for(var j = 1; j < nodes.t.length; j++){
			graphics.lineTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[j], 
		oy - (yAxis - 100) * nodes.c[i][j] / maxY);
		    graphics.moveTo(ox + (xAxis - 50) / nodes.t[nodes.t.length - 1] * nodes.t[j], 
		oy - (yAxis - 100) * nodes.c[i][j] / maxY);
		};
		
		graphics.moveTo(ox + xAxis + 80, oy - yAxis + 100 + i * 70);
		graphics.lineTo(ox + xAxis + 220, oy - yAxis + 100 + i * 70);
		var Text = new PIXI.Text(nodes.name[i], {fill: "#" + _color.toString(16)});
		Text.position.x = ox + xAxis + 240;
		Text.position.y = oy - yAxis + 82 + i * 70;
		this.stage.addChild(Text);
	};
	
	this.stage.addChild(graphics);
	var that = this;
	animate();
	function animate() {
 				   renderer.render(that.stage);
 				   requestAnimationFrame( animate );
	};
};