/** 
 * @description add animate hook
 * @param {function} animation function
 */ 
BioBLESS.add_animate_hook = function(hook_func) {
    if(hook_func)
        BioBLESS.animate_hook[BioBLESS.animate_hook.length] = hook_func;
};
/** 
 * @description delete animate hook
 * @param {function} animation function
 * @return {Bool} if succes to delete, return true, or return false
 */ 
BioBLESS.delete_animate_hook = function(hook_func) {
    for(i = 0; i < BioBLESS.animate_hook.length; i++) {
        if(BioBLESS.animate_hook[i] === hook_func){
            BioBLESS.animate_hook.splice(i, 1);
            return true;
        }
    }
    return false;
};
