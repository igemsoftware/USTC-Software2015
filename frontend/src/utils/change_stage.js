/**
 * @description change plugin
 * @param {plugin} the plugin you want to change to
 */ 
BioBLESS.change_stage = function(plugin) {
    var child_stage = BioBLESS.stage;
    if(!child_stage)
        return;
    BioBLESS.base_stage.removeChild(child_stage);
    BioBLESS.base_stage.addChild(plugin.stage);
    BioBLESS.base_stage.addChild(BioBLESS.navigation);
    BioBLESS.base_stage.addChild(BioBLESS.navigation_title);
    BioBLESS.stage = plugin.stage;
};