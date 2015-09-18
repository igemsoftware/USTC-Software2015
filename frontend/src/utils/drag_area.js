BioBLESS.utils.new_drag_area = function() {    
var drag_start_func = function(event) {
        this.data = event.data;
        this.dragging = true;
        var startPosition = this.data.getLocalPosition(this.parent);
        this.startX = startPosition.x;
        this.startY = startPosition.y;
        BioBLESS.stage.movable_stage.startX = BioBLESS.stage.movable_stage.position.x;
        BioBLESS.stage.movable_stage.startY = BioBLESS.stage.movable_stage.position.y;
    };
    var drag_end_func = function() {
        this.dragging = false;
        this.data = null;
    };
    var drag_move_func = function(event) {
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            BioBLESS.stage.movable_stage.position.x = newPosition.x - this.startX + BioBLESS.stage.movable_stage.startX;
            BioBLESS.stage.movable_stage.position.y = newPosition.y - this.startY + BioBLESS.stage.movable_stage.startY;
        }
        BioBLESS.stage.movable_stage.inPosition = event.data.getLocalPosition(BioBLESS.stage.movable_stage);
    };
    var dragArea = new PIXI.Graphics();
        dragArea.beginFill(0x000000, 1);
        dragArea.drawRect(0, 0, 6000, 6000);
        dragArea.interactive = true;
        dragArea.on('mousedown', drag_start_func)
                .on('touchstart', drag_start_func)
                .on('mouseup', drag_end_func)
                .on('mouseupoutside', drag_end_func)
                .on('touchend', drag_end_func)
                .on('touchendoutside', drag_end_func)
                .on('mousemove', drag_move_func)
                .on('touchmove', drag_move_func)
                .on('mouseover', function(){
                    BioBLESS.scroll_function = BioBLESS.zoom_function;
                });
        return dragArea;
};
