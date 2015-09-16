/**
 * biopart_draw function works for preparing biopart considering about its own ID
 * @author USTC-software frontend
 * @author Ubrok
 * @since  2015-9-3
 */
BioBLESS.biopart_draw = function() {};

/**
 * draw_biopart_svg makes svg of biopart according to its ID
 * @param  {id}
 * @return graphics {PIXI.Grphics}
 */
BioBLESS.biopart_draw.draw_biopart_svg = function(id) {
    var stage = new PIXI.Container();	
    var graphics = new PIXI.Graphics();
	stage.addChild(graphics);
    switch(id){
	    case "Cds":
        case "cds":
		case "Coding":
		case "coding":
            /**
             * cds
             * <path fill="#3360A3" d="M 452.625 25.76
             * h -69.708
             * c -2.667 -0.012 -3.2 3.24 -3.2 3.24
             * v 21.76
             * c 0.294 1.175 0.378 3.321 3.2 3.308
             * l 69.708 0.039
             * v -0.002
             * v 14.182
             * l 48.281 -28.359
             * l -48.281 -28.359
             * v 14.194"/>
             */
            graphics.beginFill(0xa664a1, 1);
            graphics.moveTo(80, 25.76);
            graphics.lineTo(80 - 69.708, 25.76);//(10.292, 25.76)
            graphics.bezierCurveTo(10.292 - 2.667, 25.76 - 0.012, 10.292 - 3.2, 25.76 + 3.24, 10.292 - 3.2, 25.76 + 3.24);//(7.092, 29)
            graphics.lineTo(7.092, 29 + 21.76);//(7.092, 50.76)
            graphics.bezierCurveTo(7.092 + 0.294, 50.76 + 1.175, 7.092 + 0.378, 50.76 + 3.321, 7.092 + 3.2, 50.76 + 3.308);//(10.292, 54.068)
            graphics.lineTo(10.292 + 69.708, 54.068);//(80, 54.068)
            graphics.lineTo(80, 54.068 + 14.18);//(80, 68.248)
            graphics.lineTo(80 + 48.281, 68.248 - 28.359);//(128.281, 39.889)
            graphics.lineTo(128.281 - 48.281, 39.889 - 28.359);//(80, 11.53)
            graphics.lineTo(80, 11.53 + 14.23);//(80, 25.76)
            graphics.endFill();
			graphics.y = 60;
			graphics.x = 40;
            break;
        case "promoter":
		case "Promoter":
            /**
             * promoter
             * <path fill="#A6910F" d="M 218.667 220.376 
             * c 0 3.945 4.747 3.945 4.747 3.945 
             * l 22.078 -0.02 
             * c 4.914 0 4.914 -3.906 4.914 -3.906 
             * l 0 -95.977 
             * c 0 -7.578 11.363 -10.352 14.4 -10.352 
             * l 40.818 0.039 
             * v -0.002 
             * v 14.182 
             * l 48.281 -28.359 
             * l -48.281 -28.359 
             * v 14.194 
             * V 85.76
             * l -72.908 -0.012 
             * c -2.963 0 -14.05 2.773 -14.05 10.352 
             * v 125.234"/>
             */
            graphics.beginFill(0x4095be, 1);
            graphics.lineStyle(3, 0x4095be, 1);
            graphics.moveTo(218.667, 220.376);
            graphics.bezierCurveTo(218.667, 220.376 + 3.945, 218.667 + 4.747, 220.376 + 3.945, 218.667 + 4.747, 220.376 + 3.945);//(223.414, 224.321)
            graphics.lineTo(223.414 + 22.078, 224.321 - 0.02);//(245.492, 224.301)
            graphics.bezierCurveTo(245.492 + 4.914, 224.301, 245.492 + 4.914, 224.301 - 3.906, 245.492 + 4.914, 224.301 - 3.906);//(250.406, 220.395)
            graphics.lineTo(250.406, 220.395 - 95.977);//(250.406, 124.418)
            graphics.bezierCurveTo(250.406, 124.418 - 7.578, 250.406 + 11.363, 124.418 - 10.352, 250.406 + 14.4, 124.418 - 10.352);//(264.806, 114.066)
            graphics.lineTo(264.806 + 40.818, 114.066 - 0.039);//(305.624, 114.027)
            graphics.lineTo(305.624, 114.027 - 0.002);//(305.624, 114.025)
            graphics.lineTo(305.624, 114.025 + 14.182);//(305.624, 128.207)
            graphics.lineTo(305.624 + 48.281, 128.207 - 28.259);//(353.905, 99.948)
            graphics.lineTo(353.905 - 48.281, 99.948 - 28.259);//(305.624, 71.689)
            graphics.lineTo(305.624, 71.689 + 14.194);//(305.624, 85.883)
            graphics.lineTo(305.624, 85.76);
            graphics.lineTo(305.624 - 72.908, 85.76 - 0.012);//(232.716, 85.748)
            graphics.bezierCurveTo(232.716 - 2.963, 85.748, 232.716 - 14.05, 85.748 + 2.773, 232.716 - 14.05, 85.748 + 10.352);//(218.666, 96.1)
            graphics.lineTo(218.666, 96.1 + 125.234);//(218.666, 221.334)
            graphics.endFill();
			graphics.scale.x = 0.7;
		    graphics.scale.y = 0.6;
			graphics.y = -25;
			graphics.x = -67;
            break;
        case "protein":
		case "Protein":
            /**
             * protein
             * <ellipse fill="#716E5B" cx="264.807" cy="288.5" rx="94.693" ry="43"/>
             */
            graphics.beginFill(0xd5bf95, 1);
            graphics.drawEllipse(100, 100, 95, 45);
            graphics.endFill();
            break;
        case "rbs":
		case "RBS":
            /**
             * rbs
             * <ellipse fill="#C6C717" cx="488.472" cy="292" rx="67.528" ry="45"/>
             */
            graphics.beginFill(0xdd963c, 1);
            graphics.drawEllipse(100, 100, 67, 45);
            graphics.endFill();
            break;
        case "sRNA":
		case "SRNA":
		case "srna":
		case "Srna":
            /**
             * sRNA
             * <path fill="#6B6C28" d="M220.375 181.582
             * c 0 0 -0.547 -4.583 5.156 -4.583
             * h 117.415
             * c 5.703 0 5.151 4.583 5.151 4.583
             * l -0.1 20.835
             * l -0.122 24.243
             * c 0 0 -0.391 2.007 1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * l 0.002 -22.266
             * c 0 0 -1.323 -1.978 -2.031 -1.978
             * h -8.44
             * c -0.708 0 -2.031 1.978 -2.031 1.978
             * v 22.266
             * c 0 0 -0.391 2.007 -1.484 2.007 
             * h 0.469
             * h -5
             * c -1.094 0 -1.484 -2.007 -1.484 -2.007
             * v -24.243
             * v -21.482"/>
             */
            graphics.beginFill(0x6B6C28, 1);
            graphics.moveTo(223.35, 180.935);
            graphics.bezierCurveTo(223.35, 180.935, 223.35 - 0.547, 180.935 - 4.583, 223.35 + 5.156, 180.935 - 4.583);//(228.506, 176.352)
            graphics.lineTo(228.506 + 116.293, 176.352);//(344.799, 176.352)
            graphics.bezierCurveTo(344.799 + 5.703, 176.352, 344.799 + 5.151, 176.352 + 4.583, 344.799 + 5.151, 176.352 + 4.583);//(349.95, 180.935)
            graphics.lineTo(349.95, 180.935 + 20.835);//(349.95, 201.77)
            graphics.lineTo(349.95, 201.77 + 24.243);//(349.95, 226.013)
            graphics.bezierCurveTo(349.95, 226.66, 349.95 - 0.391,226.66 + 2.007, 349.95 + 1.484,226.66 + 2.007);//(351.433, 228.667)
            graphics.lineTo(349.359 + 0.469, 228.667);//(349.828, 228.667)
            graphics.lineTo(349.828 - 5, 228.667);//(344.828, 228.667)

            graphics.bezierCurveTo(344.828 - 1.094, 228.667, 344.828 - 1.484, 228.667 - 2.007, 344.828 - 1.484, 228.667 - 2.007);//(343.344, 226.66)
            graphics.lineTo(343.344 + 0.002, 226.66 - 22.266);//(343.346, 204.394)
            graphics.bezierCurveTo(343.346, 204.394, 343.346 - 1.323, 204.394 - 1.978, 343.346 - 2.031, 204.394 - 1.978);//(341.315, 202.416)
            graphics.lineTo(341.315 - 8.44, 202.416);//(332.875, 202.416)
            graphics.bezierCurveTo(332.875 - 0.708, 202.416, 332.875 - 2.031, 202.416 + 1.978, 332.875 - 2.031, 202.416 + 1.978);//(330.844, 204.394)
            graphics.lineTo(330.844, 204.394 + 22.266);//(330.844, 226.66)
            graphics.bezierCurveTo(330.844, 226.66, 330.844 - 0.391, 226.66 + 2.007, 330.844 - 1.484, 226.66 + 2.007);//(329.36, 228.667)
            graphics.lineTo(329.36 + 0.469, 228.667);//(329.829, 228.667)
            graphics.lineTo(329.829 - 5, 228.667);//(324.829, 228.667)

            graphics.bezierCurveTo(324.829 - 1.094, 228.667, 324.829 - 1.484, 228.667 - 2.007, 324.829 - 1.484, 228.667 - 2.007);//(323.345, 226.66)
            graphics.lineTo(323.345 + 0.002, 226.66 - 22.266);//(323.347, 204.394)
            graphics.bezierCurveTo(323.347, 204.394, 323.347 - 1.323, 204.394 - 1.978, 323.347 - 2.031, 204.394 - 1.978);//(320.316, 202.416)
            graphics.lineTo(320.316 - 8.44, 202.416);//(312.876, 202.416)
            graphics.bezierCurveTo(312.876 - 0.708, 202.416, 312.876 - 2.031, 202.416 + 1.978, 312.876 - 2.031, 202.416 + 1.978);//(310.845, 204)
            graphics.lineTo(310.845, 204 + 22.266);//(310.845, 226.66)
            graphics.bezierCurveTo(310.845, 226.66, 310.845 - 0.391, 226.66 + 2.007, 310.845 - 1.484, 226.66 + 2.007);//(309.361, 228.667)
            graphics.lineTo(309.361 + 0.469, 228.667);//(309.83, 228.667)
            graphics.lineTo(309.83 - 5, 228.667);//(304.83, 228.667)

            graphics.bezierCurveTo(304.83 - 1.094, 228.667, 304.83 - 1.484, 228.667 - 2.007, 304.83 - 1.484, 228.667 - 2.007);//(303.346, 226.66)
            graphics.lineTo(303.346 + 0.002, 226.66 - 22.266);//(303.348, 204.394)
            graphics.bezierCurveTo(303.348, 204.394, 303.348 - 1.323, 204.394 - 1.978, 303.348 - 2.031, 204.394 - 1.978);//(301.317, 202.416)
            graphics.lineTo(301.317 - 8.44, 202.416);//(292.877, 202.416)
            graphics.bezierCurveTo(292.877 - 0.708, 202.416, 292.877 - 2.031, 202.416 + 1.978, 292.877 - 2.031, 202.416 + 1.978);//(290.846, 204.394)
            graphics.lineTo(290.846, 204.394 + 22.266);//(290.846, 226.66)
            graphics.bezierCurveTo(290.846, 226.66, 290.846 - 0.391, 226.66 + 2.007, 290.846 - 1.484, 226.66 + 2.007);//(289.362, 228.667)
            graphics.lineTo(289.362 + 0.469, 228.667);//(289.831, 228.667)
            graphics.lineTo(289.831 - 5, 228.667);//(284.831, 228.667)

            graphics.bezierCurveTo(284.831 - 1.094, 228.667, 284.831 - 1.484, 228.667 - 2.007, 284.831 - 1.484, 228.667 - 2.007);//(283.347, 226.66)
            graphics.lineTo(283.347 + 0.002, 226.66 - 22.266);//(283.349, 204.394)
            graphics.bezierCurveTo(283.349, 204.394, 283.349 - 1.323, 204.394 - 1.978, 283.349 - 2.031, 204.394 - 1.978);//(281.318, 202.416)
            graphics.lineTo(281.318 - 8.44, 202.416);//(272.878, 202.416)
            graphics.bezierCurveTo(272.878 - 0.708, 202.416, 272.878 - 2.031, 202.416 + 1.978, 272.878 - 2.031, 202.416 + 1.978);//(270.847, 204.394)
            graphics.lineTo(270.847, 204.394 + 22.266);//(270.847, 226.66)
            graphics.bezierCurveTo(270.847, 226.66, 270.847 - 0.391, 226.66 + 2.007, 270.847 - 1.484, 226.66 + 2.007);//(269.363, 228.667)
            graphics.lineTo(269.363 + 0.469, 228.667);//(269.832, 228.667)
            graphics.lineTo(269.832 - 5, 228.667);//(264.832, 228.667)

            graphics.bezierCurveTo(264.832 - 1.094, 228.667, 264.832 - 1.484, 228.667 - 2.007, 264.832 - 1.484, 228.667 - 2.007);//(263.348, 226.66)
            graphics.lineTo(263.348 + 0.002, 226.66 - 22.266);//(263.35, 204.394)
            graphics.bezierCurveTo(263.35, 204.394, 263.35 - 1.323, 204.394 - 1.978, 263.35 - 2.031, 204.394 - 1.978);//(261.319, 202.416)
            graphics.lineTo(261.319 - 8.44, 202.416);//(252.879, 202.416)
            graphics.bezierCurveTo(252.879 - 0.708, 202.416, 252.879 - 2.031, 202.416 + 1.978, 252.879 - 2.031, 202.416 + 1.978);//(250.848, 204.394)
            graphics.lineTo(250.848, 204.394 + 22.266);//(250.848, 226.66)
            graphics.bezierCurveTo(250.848, 226.66, 250.848 - 0.391, 226.66 + 2.007, 250.848 - 1.484, 226.66 + 2.007);//(249.364, 228.667)
            graphics.lineTo(249.364 + 0.469, 228.667);//(249.833, 228.667)
            graphics.lineTo(249.833 - 5, 228.667);//(244.833, 228.667)

            graphics.bezierCurveTo(244.833 - 1.094, 228.667, 244.833 - 1.484, 228.667 - 2.007, 244.833 - 1.484, 228.667 - 2.007);//(243.349, 226.66)
            graphics.lineTo(243.349 + 0.002, 226.66 - 22.266);//(243.351, 204.394)
            graphics.bezierCurveTo(243.351, 204.394, 243.351 - 1.323, 204.394 - 1.978, 243.351 - 2.031, 204.394 - 1.978);//(241.32, 202.416)
            graphics.lineTo(241.32 - 8.44, 202.416);//(232.88, 202.416)
            graphics.bezierCurveTo(232.88 - 0.708, 202.416, 232.88 - 2.031, 202.416 + 1.978, 232.88 - 2.031, 202.416 + 1.978);//(230.849, 204.394)
            graphics.lineTo(230.849, 204.394 + 22.266);//(230.849, 226.66)
            graphics.bezierCurveTo(230.849, 226.66, 230.849 - 0.391, 226.66 + 2.007, 230.849 - 1.484, 226.66 + 2.007);//(229.365, 228.667)
            graphics.lineTo(229.365 + 0.469, 228.667);//(229.834, 228.667)
            graphics.lineTo(229.834 - 5, 228.667);//(224.834, 228.667)
            
            graphics.bezierCurveTo(224.834 - 1.094, 228.667, 224.834 - 1.484, 228.667 - 2.007, 224.834 - 1.484, 228.667 - 2.007);//(223.35, 226.66)
            graphics.lineTo(223.35, 226.66 - 24.243);//(223.35, 202.417)
            graphics.lineTo(223.35, 202.417 - 21.482);//(223.35, 180.935)
            graphics.endFill();
			graphics.x = -187;
			graphics.y = -90;
            break;
        case "terminator":
		case "Terminator":
            /**
             * terminator
             * <circle fill="#FAC811" cx="411" cy="261" r="138"/>
             */
            graphics.beginFill(0xFF0505, 1);
            graphics.drawCircle(100, 100, 50);
            graphics.endFill();
            break;
        default:
            throw new Error("Not found!");
    }
    return stage;
};

/**
 * biopart_create function is prepared for biopart-creation which could be draggable 
 * @function
 * @param {devices} 
 * @param {w}  
 * @param {h}
 * @return {stage} PIXI.Container
 */
BioBLESS.biopart_draw.biopart_create = function(devices, w, h){
    var onDragStart = function(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
        this.startX = this.position.x;
        this.startY = this.position.y;
    };
    var onDragEnd = function() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        his.position.x = this.startX;
        this.position.y = this.startY;    
    };
    var onDragMove = function() {
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x - 75;
            this.position.y = newPosition.y - 35;
            this.childPosition = this.data.getLocalPosition(that.childStage);
        }
    };
    this.stage = new PIXI.Container();
    that._BIOPART = [];
    that.BIOPART = [];
    for(var i = 0; i < devices.length; i++){
            that._BIOPART[i] = this.draw_biopart_svg(devices[i].icon);
            that.BIOPART[i] = this.draw_biopart_svg(devices[i].icon);
            that._BIOPART[i].position.x = w - 195;
            that._BIOPART[i].position.y = 140 + i * 100;
            that.BIOPART[i].position.x = w - 195;
            that.BIOPART[i].position.y = 140 + i * 100;
            that.BIOPART[i].interactive = true;
            that.BIOPART[i].buttonMode = true;
            that.BIOPART[i].Index = i;
            that.BIOPART[i].on('mousedown', onDragStart)
                           .on('touchstart', onDragStart)
                           .on('mouseup', onDragEnd)
                           .on('mouseupoutside', onDragEnd)
                           .on('touchend', onDragEnd)
                           .on('touchendoutside', onDragEnd)
                           .on('mousemove', onDragMove)
                           .on('touchmove', onDragMove);
        }
    return this.stage;
};
