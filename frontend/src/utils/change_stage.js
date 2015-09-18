/**
 * @description change plugin
 * @param {plugin} the plugin you want to change to
 */ 
BioBLESS.change_stage = function(plugin) {
    var child_stage = BioBLESS.stage;
    if(!child_stage)
        return;
    BioBLESS.now_plugin = plugin;
    BioBLESS.base_stage.removeChild(child_stage);
    BioBLESS.base_stage.addChild(plugin.stage);
    BioBLESS.base_stage.addChild(BioBLESS.navigation);
    BioBLESS.stage = plugin.stage;
	BioBLESS.navigation.tag.y = BioBLESS.navigation.button[plugin.tag_index].y;
    if(plugin.onchange)
        plugin.onchange();
};
