BioBLESS.utils.init_stage = function() {
/** 
 * @description {PIXI.Container} the stage of the home page
 */ 
stage = new PIXI.Container();
/** 
 * @description {PIXI.Container} the movable stage
 */ 
stage.movable_stage = new PIXI.Container();
/** 
 * @description {Num} used for controling stage scale in scale animation
 */ 
stage.movable_stage._scale = 1;
return stage;
};
