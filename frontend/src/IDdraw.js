/**
 * IDdraw function works for preparing SBOL considering about its own ID
 * @author USTC-software frontend
 * @since  2015-8-9
 */
BioBLESS.IDdraw = function(){};
/**
 * drawElement makes svg of SBOL according to IDnumber
 * @param icon caused by users
 * @return graphics {PIXI.Grphics}
 */
BioBLESS.IDdraw.drawElement = function(icon){
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(3, 0x000000, 1);
    switch(icon){
        case "00000167": //Promoter
            //<path d="M 31.5 15.5 L 40 23 L 31.5 30.3333" /><path d="M 10 50 L 10 23 L 39 23" />
            graphics.moveTo(31.5, 11.5);
            graphics.lineTo(40, 23);
            graphics.lineTo(31.5, 30.3333);
            graphics.moveTo(10, 50);
            graphics.lineTo(10, 23);
            graphics.lineTo(39, 23);
            break;
        case "00000057": //Operator
            //<path d="M 15 60 L 35 60 L 35 40 L 15 40 L 15 60 Z"/>
            graphics.drawRect(15, 40, 20, 20);
            break;
        case "00000316": //CDS
            //<path d="M 9 65 L 27 65 L 42 50 L 27 35 L 9 35 L 9 65 Z"/>
            graphics.moveTo(9, 65);
            graphics.lineTo(27, 65);
            graphics.lineTo(42, 50);
            graphics.lineTo(27, 35);
            graphics.lineTo(9, 35);
            graphics.lineTo(9, 65);
            break;
        case "00000139": //Ribosome Entry Site
            //<path d="M 12 45 L 12 50 L 38 50 L 38 45 C 38 35 32 30 25 30 C 18 30 12 35 12 45  Z" />
            graphics.moveTo(12, 45);
            graphics.lineTo(12, 50);
            graphics.lineTo(38, 50);
            graphics.lineTo(38, 45);
            graphics.bezierCurveTo(38, 35, 32, 30, 25, 30);
            graphics.bezierCurveTo(18, 30, 12, 35, 12, 45);
            break;
        case "00000141": //Terminator
            //<path d="M 25 50 L 25 26"/><path d="M 10 25 L 40 25"/>
              graphics.moveTo(25, 50);
              graphics.lineTo(25, 26);
              graphics.moveTo(10, 25);
              graphics.lineTo(40, 25);
              break;
          case "00000627": //Insulator
              //<path d="M 17 58 L 33 58 L 33 42 L 17 42 L 17 58 Z"/><path d="M 10 65 L 40 65 L 40 35 L 10 35 L 10 65 Z"/>
              graphics.drawRect(17, 42, 16, 16);
              graphics.drawRect(10, 35, 30, 30);
              break;
          case "10000001": //Ribonucleasen Site
              //<path d="M 25 50 L 25 45 "/><path d="M 25 38 L 25 33 "/><path d="M 17 16 L 33 32 "/><path d="M 33 16 L 17 32 "/>
            graphics.moveTo(25, 50);
            graphics.lineTo(25, 45);
            graphics.moveTo(25, 38);
            graphics.lineTo(25, 33);
            graphics.moveTo(17, 16);
            graphics.lineTo(33, 32);
            graphics.moveTo(33, 16);
            graphics.lineTo(17, 32);
            break;
        case "00001957": //RNA Stability Element
            //<path d="M 25 50 L 25 46 "/><path d="M 25 41 L 25 37 "/> <circle cx="25" cy="25" r="7"/>
            graphics.moveTo(25, 50);
            graphics.lineTo(25, 46);
            graphics.moveTo(25, 41);
            graphics.lineTo(25, 37);
            graphics.drawCircle(25, 25, 7);
            break;
        case "00001956": //Protease Site
            //<path d="M 25 50 L 25 25 "/><path d="M 17 16 L 33 32 "/><path d="M 33 16 L 17 32 "/>
            graphics.moveTo(25, 50);
            graphics.lineTo(25, 25);
            graphics.moveTo(17, 16);
            graphics.lineTo(33, 32);
            graphics.moveTo(33, 16);
            graphics.lineTo(17, 32);
            break;
        case "00001955": //Protein Stability Element
            //<path d="M 25 50 L 25 34 " /><circle cx="25" cy="25" r="7"/>
            graphics.moveTo(25, 50);
            graphics.lineTo(25, 34);
            graphics.drawCircle(25, 25, 7);
            break;
        case "00000296": //Origin of Replication
            //<circle cx="25" cy="50" r="12"/>
            graphics.drawCircle(25, 50, 12);
            break;
        case "00005850": //Primer Binding Site
            //<path d="M 12 45 L 38 45 L 28 38"/>
            graphics.moveTo(12, 45);
            graphics.lineTo(38, 45);
            graphics.lineTo(28, 38);
            break;
        case "00001687": //Restrictionm Enzyme Recognition Site
            //<path d="M 25 37 L 25 63" />
            graphics.moveTo(25, 37);
            graphics.lineTo(25, 63);
            break;
        case "00001691": //Blunt Restriction Site
            //<path d="M 19 37 L 22 37 L 22 63 L 19 63 "/><path d="M 31 37 L 28 37 L 28 63 L 31  63 "/>
            graphics.moveTo(31, 37);
            graphics.lineTo(28, 37);
            graphics.lineTo(28, 63);
            graphics.lineTo(31, 63);
            graphics.moveTo(19, 37);
            graphics.lineTo(22, 37);
            graphics.lineTo(22, 63);
            graphics.lineTo(19, 63);
            break;
        case "10000002": //5'Sticky Restriction Site
            //<path d="M 10 37 L 10 50 L 40 50 L 40 63"/>
            graphics.moveTo(10, 37);
            graphics.lineTo(10, 50);
            graphics.lineTo(40, 50);
            graphics.lineTo(40, 63);
            break;
        case "10000003": //3'Sticky Rstriction Site
              //<path d="M 40 37 L 40 50 L 10 50 L 10 63" />
            graphics.moveTo(40, 37);
            graphics.lineTo(40, 50);
            graphics.lineTo(10, 50);
            graphics.lineTo(10, 63);
            break;
        case "00001933": //5'Overhang
              //<path d="M 10 46 L 40 46"/><path d="M 25 54 L 40 54"/>
            graphics.moveTo(10, 46);
            graphics.lineTo(40, 46);
            graphics.moveTo(25, 54);
            graphics.lineTo(40, 54);
            break;
        case "00001932": //3'Overhang
              //<path d="M 10 46 L 40 46"/><path d="M 25 54 L 10 54"/>
              graphics.moveTo(10, 46);
              graphics.lineTo(40, 46);
              graphics.moveTo(25, 54);
              graphics.lineTo(10, 54);
              break;
        case "00001953": //Assembly Scar
             //<path d="M 13 46 L 37 46"/><path d="M 13 54 L 37 54"/>
             graphics.moveTo(13, 46);
             graphics.lineTo(17, 46);
             graphics.moveTo(13, 54);
             graphics.lineTo(37, 54);
             break;
        case "10000004": //Signature
             //<path d="M 5 45 L 5 20 L 45 20 L 45 45 Z" /><path d="M 10 27 L 20 37" /><path d="M 10 37 L 20 27" /><path d="M 24 39 L 40 39" />
              graphics.drawRect(5, 20, 40, 25);
              graphics.moveTo(10, 27);
              graphics.lineTo(20, 37);
              graphics.moveTo(10, 37);
              graphics.lineTo(20, 27);
              graphics.moveTo(24, 39);
              graphics.lineTo(40, 39);
              break;
        case "10000000": //User Defined
              graphics.drawRect(5, 20, 40, 25);
              break;
    }
    return graphics;
};
BioBLESS.IDdraw.Create = function(devices, w, h){
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
    that._SBOL = [];
    that.SBOL = [];
    for(var i = 0; i < devices.length; i++){
            that._SBOL[i] = this.drawElement(devices[i].icon);
            that.SBOL[i] = this.drawElement(devices[i].icon);
            that._SBOL[i].position.x = w - 195;
            that._SBOL[i].position.y = 140 + i * 100;  
            that.SBOL[i].position.x = w - 195;
            that.SBOL[i].position.y = 140 + i * 100;
            that.SBOL[i].interactive = true;
            that.SBOL[i].buttonMode = true;
            that.SBOL[i].Index = i;
            that.SBOL[i].on('mousedown', onDragStart)
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
