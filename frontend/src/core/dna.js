/**
 * This js works as BioBLESS.dna's drawing function
 * @author USTC-software frontend
 * @author Ubrok
 * @since 2015-8-25
 */

/**
 * detail is a data structure of dna which communicate between frontend and backend
 */
BioBLESS.dna.detail = {
    "device": []
};

BioBLESS.dna.detail.device = [
    {
        "d" : ["tacccacaacccaattcgagaccggaactcgattgtatctgtagtgctttagtagtggagtttacactttatgcttccggctcgtataatgtgtggaattttgagcgctcaaaattggatccgg", "attaaagaggagaaa", "atgcagtttaaggtttacacctataaaagagagagccgttatcgtctgtttgtggatgtacagagtgatattattgacacgcccgggcgacggatggtgatccccctggccagtgcacgtctgctgtcagataaagtctcccgtgaactttacccggtggtgcatatcggggatgaaagctggcgcatgatgaccaccgatatggccagtgtgccggtctccgttatcggggaagaagtggctgatctcagccaccgcgaaaatgacatcaaaaacgccattaacctgatgttctggggaatataa","gaaatattattactgagtaaaggattgttaccgcactaagcgggcaaaacctgaaaaaaattgcttgattcacgtcaggccgtttttttcaggtttttttttggagttttgccgcaaagcggta"],
        "d_oppsite" : []
    }
];

/**
 * init is the function to init the dna feature 
 * @function
 */
BioBLESS.dna.init = function() {
    this.stage = BioBLESS.utils.init_stage();
    BioBLESS.dna.deoxyribonucleic_acid = BioBLESS.dna.make_dna_sequence();
    BioBLESS.dna.stage.addChild(BioBLESS.dna.deoxyribonucleic_acid);
};

/**
 * make_dna_sequence is the function to make dna sequence
 * @function
 * @return {deoxyribonucleic_acid} PIXI.Container
 */
BioBLESS.dna.make_dna_sequence = function(){
    var i,j,k;
    deoxyribonucleic_acid = new PIXI.Container();
    deoxyribonucleic_acid.line_width = 50;
    deoxyribonucleic_acid.line_num = 0;

    deoxyribonucleic_acid.dna_style_1 = {
        font : '40px Inconsolata,monospace',
        fill : 'red',
        lineHeight : 100
    };
    deoxyribonucleic_acid.dna_style_2 = {
        font : '40px Inconsolata,monospace',
        fill : 'blue',
        lineHeight : 100
    };
    deoxyribonucleic_acid.device_style = {
        font : '30px Inconsolata,monospace',
        fill : 'grey',
        lineHeight : 100
    };

    deoxyribonucleic_acid.device_name = {};
    deoxyribonucleic_acid.device_name.sequence = "";
    deoxyribonucleic_acid.dna_single_strand_1 = {};
    deoxyribonucleic_acid.dna_single_strand_1.sequence = "";
    var count;
    var num;
    for(i = 0; i < BioBLESS.dna.detail.device.length; i++){
        count = 0;
        for(j = 0; j < BioBLESS.dna.detail.device[i].d.length; j++){
            deoxyribonucleic_acid.device_name.sequence += ('|' + "device" + i.toString() + "_d" + j.toString());
            num = 9 + Math.ceil(i/10) + Math.ceil(j/10);
            for(k = 0; k < BioBLESS.dna.detail.device[i].d[j].length; k++){
                deoxyribonucleic_acid.dna_single_strand_1.sequence += BioBLESS.dna.detail.device[i].d[j][k];
                count++;
                if(k >= num){
                    deoxyribonucleic_acid.device_name.sequence += ' ';
                }
                if(count >= deoxyribonucleic_acid.line_width){
                    deoxyribonucleic_acid.dna_single_strand_1.sequence += '\n';
                    deoxyribonucleic_acid.device_name.sequence += '\n';
                    count -= deoxyribonucleic_acid.line_width;
                    deoxyribonucleic_acid.line_num ++;
                }
            }
        }
    }
    deoxyribonucleic_acid.dna_single_strand_1.dna_text = new PIXI.Text(deoxyribonucleic_acid.dna_single_strand_1.sequence, deoxyribonucleic_acid.dna_style_1);
    deoxyribonucleic_acid.dna_single_strand_1.dna_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.dna_single_strand_1.dna_text.y = 0.1 * BioBLESS.height;
    deoxyribonucleic_acid.device_name.device_text = new PIXI.Text(deoxyribonucleic_acid.device_name.sequence, deoxyribonucleic_acid.device_style);
    deoxyribonucleic_acid.device_name.device_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.device_name.device_text.y = 0.1 * BioBLESS.height - 18;

    BioBLESS.dna.dispose_oppsite_dna();

    deoxyribonucleic_acid.dna_single_strand_2 = {};
    deoxyribonucleic_acid.dna_single_strand_2.sequence = "";
    for(i = 0; i < BioBLESS.dna.detail.device.length; i++){
        count = 0;
        for(j = 0; j < BioBLESS.dna.detail.device[i].d_oppsite.length; j++){
            for(k = 0; k < BioBLESS.dna.detail.device[i].d_oppsite[j].length; k++){    
                deoxyribonucleic_acid.dna_single_strand_2.sequence += BioBLESS.dna.detail.device[i].d_oppsite[j][k];
                count++;
                if(count >= deoxyribonucleic_acid.line_width){
                    deoxyribonucleic_acid.dna_single_strand_2.sequence += '\n';
                    count -= deoxyribonucleic_acid.line_width;
                }
            }
        }
    }
    deoxyribonucleic_acid.dna_single_strand_2.dna_text = new PIXI.Text(deoxyribonucleic_acid.dna_single_strand_2.sequence, deoxyribonucleic_acid.dna_style_2);
    deoxyribonucleic_acid.dna_single_strand_2.dna_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.dna_single_strand_2.dna_text.y = 0.1 * BioBLESS.height + 40;

    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.dna_single_strand_1.dna_text);
    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.dna_single_strand_2.dna_text);
    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.device_name.device_text);

    deoxyribonucleic_acid.interactive = true;
    deoxyribonucleic_acid.buttonMode = true;
    deoxyribonucleic_acid.select_line = new PIXI.Graphics();
    deoxyribonucleic_acid.select_line.alpha = 0.5;    
    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.select_line);

    deoxyribonucleic_acid.on('mousedown', BioBLESS.dna.dna_select_start)
                         .on('touchstar', BioBLESS.dna.dna_select_start)
                         .on('mousemove', BioBLESS.dna.dna_select_move)
                         .on('touchmove', BioBLESS.dna.dna_select_move)
                         .on('mouseup', BioBLESS.dna.dna_select_end)
                         .on('mouseupoutside', BioBLESS.dna.dna_select_end)
                         .on('touchend', BioBLESS.dna.dna_select_end)
                         .on('touchendoutside', BioBLESS.dna.dna_select_end);

    // deoxyribonucleic_acid.test = new PIXI.Text('T', deoxyribonucleic_acid.dna_style_1);
    // alert(deoxyribonucleic_acid.test.width);
    return deoxyribonucleic_acid;
};

/**
 * dispose_oppsite_dna is the function to make the other dna strand according to the dna
 * @function
 */
BioBLESS.dna.dispose_oppsite_dna = function(){
    var i,j,k;
    for(i = 0; i < BioBLESS.dna.detail.device.length; i++){
        for(j = 0; j < BioBLESS.dna.detail.device[i].d.length; j++){
            BioBLESS.dna.detail.device[i].d_oppsite[BioBLESS.dna.detail.device[i].d_oppsite.length] = "";
            for(k = 0; k < BioBLESS.dna.detail.device[i].d[j].length; k++){
                switch(BioBLESS.dna.detail.device[i].d[j][k]){
                    case 'a':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'a';
                        break;
                    case 't':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 't';
                        break;
                    case 'c':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'g';
                        break;
                    case 'g':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'c';
                        break;
                    default:
                        alert("Error dna is wrong!");
                        break;
                }
            }
        }
    }
};

BioBLESS.dna.moving = false;
BioBLESS.dna.draw_enabled = false;

/**
 * dna_select_start is the function to start select the dna which you want
 * @function
 * @param  {event} caused by users
 */
BioBLESS.dna.dna_select_start = function(event) {
    BioBLESS.dna.starPosition = event.data.getLocalPosition(this);
    var star_control_y = (BioBLESS.dna.starPosition.y - 0.1 * BioBLESS.height)%100;
    var star_count_y = Math.floor((BioBLESS.dna.starPosition.y - 0.1 * BioBLESS.height)/100);
    var star_control_x = (BioBLESS.dna.starPosition.x - 0.1 * BioBLESS.width);
    var star_count_x = Math.floor((BioBLESS.dna.starPosition.x - 0.1 * BioBLESS.width)/24.2);
    if(star_control_y >= 0 && star_control_y <= 40 && star_control_x >= 0 && star_control_x <= (BioBLESS.dna.deoxyribonucleic_acid.line_width * 24)){
        BioBLESS.dna.starPosition.x = star_count_x * 24.2 + 0.1 * BioBLESS.width;
        BioBLESS.dna.starPosition.y = star_count_y * 100 + 0.1 * BioBLESS.height; 
        BioBLESS.dna.moving = true;
        BioBLESS.dna.draw_enabled = true;
    }
    BioBLESS.dna.deoxyribonucleic_acid.select_line.clear();
};

/**
 * dna_select_move is the function to keep selecting when mouse moving
 * @function
 * @param  {event} caused by user
 */
BioBLESS.dna.dna_select_move = function(event) {
    if(BioBLESS.dna.moving){
        BioBLESS.dna.endPosition = event.data.getLocalPosition(this);
        var end_control_y = BioBLESS.dna.endPosition.y - BioBLESS.dna.starPosition.y;
        var end_count_y = Math.floor(end_control_y/100);
        var end_control_x = BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width;
        var check_count_y = BioBLESS.dna.deoxyribonucleic_acid.line_num - Math.ceil((BioBLESS.dna.starPosition.y - 0.1 * BioBLESS.height)/100);
        
        if(end_count_y > check_count_y){
            end_count_y = check_count_y;
        }

        var last_line_draw = BioBLESS.dna.deoxyribonucleic_acid.dna_single_strand_1.sequence.length - BioBLESS.dna.deoxyribonucleic_acid.line_num * (BioBLESS.dna.deoxyribonucleic_acid.line_width + 1);
        var i;
        BioBLESS.dna.deoxyribonucleic_acid.select_line.clear();
        BioBLESS.dna.deoxyribonucleic_acid.select_line.beginFill(0xF7EDCA, 1);
        if((BioBLESS.dna.endPosition.y - BioBLESS.dna.starPosition.y) > 0){
            if(end_count_y === 0){
                if(BioBLESS.dna.endPosition.x < (0.1 * BioBLESS.width + BioBLESS.dna.deoxyribonucleic_acid.line_width * 24)){
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.endPosition.x - BioBLESS.dna.starPosition.x, 40);
                }
                else{
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.deoxyribonucleic_acid.line_width * 24.2 + 0.1 * BioBLESS.width - BioBLESS.dna.starPosition.x, 40);
                }
            }
            else{
                BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.deoxyribonucleic_acid.line_width * 24 + 0.1 * BioBLESS.width - BioBLESS.dna.starPosition.x, 40);
                if(end_count_y === check_count_y){
                    if(end_control_x < (last_line_draw * 24.2)){
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width, 40);
                    }
                    else{
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, last_line_draw * 24.2, 40);
                    }
                }
                else{
                    if(end_control_x < (BioBLESS.dna.deoxyribonucleic_acid.line_width *24)){
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width, 40);
                    }
                    else{
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.deoxyribonucleic_acid.line_width *24, 40);
                    }
                }
                for(i = 1; i < end_count_y; i++){
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + i * 100, BioBLESS.dna.deoxyribonucleic_acid.line_width * 24, 40);
                }
            }
            BioBLESS.dna.deoxyribonucleic_acid.select_line.endFill();
        }
    }
};

/**
 * dna_select_end is the function to select end the dna
 * @function
 * @param  {event} caused by user
 */
BioBLESS.dna.dna_select_end = function(event) {
    BioBLESS.dna.moving = false;
    if(BioBLESS.dna.draw_enabled){
        BioBLESS.dna.endPosition = event.data.getLocalPosition(this);
        var end_control_x = BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width;
        var end_count_x = Math.floor((BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width)/24.2);
        var end_control_y = BioBLESS.dna.endPosition.y - BioBLESS.dna.starPosition.y;
        var end_count_y = Math.floor(end_control_y/100);
        var check_count_y = BioBLESS.dna.deoxyribonucleic_acid.line_num - Math.ceil((BioBLESS.dna.starPosition.y - 0.1 * BioBLESS.height)/100);

        BioBLESS.dna.endPosition.x = end_count_x * 24.2 + 0.1 * BioBLESS.width;

        if(end_count_y > check_count_y){
            end_count_y = check_count_y;
        }

        var last_line_draw = BioBLESS.dna.deoxyribonucleic_acid.dna_single_strand_1.sequence.length - BioBLESS.dna.deoxyribonucleic_acid.line_num * (BioBLESS.dna.deoxyribonucleic_acid.line_width + 1);
        var i;
        BioBLESS.dna.deoxyribonucleic_acid.select_line.clear();
        BioBLESS.dna.deoxyribonucleic_acid.select_line.beginFill(0xF7EDCA, 1);
        if((BioBLESS.dna.endPosition.y - BioBLESS.dna.starPosition.y) > 0){
            if(end_count_y === 0){
                if(BioBLESS.dna.endPosition.x < (0.1 * BioBLESS.width + BioBLESS.dna.deoxyribonucleic_acid.line_width * 25)){
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.endPosition.x - BioBLESS.dna.starPosition.x, 40);
                }
                else{
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.deoxyribonucleic_acid.line_width * 25 + 0.1 * BioBLESS.width - BioBLESS.dna.starPosition.x, 40);
                }
            }
            else{
                BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(BioBLESS.dna.starPosition.x, BioBLESS.dna.starPosition.y, BioBLESS.dna.deoxyribonucleic_acid.line_width * 24 + 0.1 * BioBLESS.width - BioBLESS.dna.starPosition.x, 40);
                if(end_count_y === check_count_y ){
                    if(end_control_x < (last_line_draw * 24.2)){
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width, 40);
                    }
                    else{
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, last_line_draw * 24.2, 40);
                    }
                }
                else{
                    if(end_control_x < (BioBLESS.dna.deoxyribonucleic_acid.line_width *24)){
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width, 40);
                    }
                    else{
                        BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + end_count_y * 100, BioBLESS.dna.deoxyribonucleic_acid.line_width *24, 40);
                    }
                }
                for(i = 1; i < end_count_y; i++){
                    BioBLESS.dna.deoxyribonucleic_acid.select_line.drawRect(0.1 * BioBLESS.width, BioBLESS.dna.starPosition.y + i * 100, BioBLESS.dna.deoxyribonucleic_acid.line_width *24, 40);
                }
            }
            BioBLESS.dna.deoxyribonucleic_acid.select_line.endFill();
        }
        BioBLESS.dna.draw_enabled = false;
        BioBLESS.dna.dna_copy_work();
    }
};

/**
 * dna_copy_work is the function to complete the dna copy work 
 * @function
 */
BioBLESS.dna.dna_copy_work = function() {
    var starpoint = Math.floor((BioBLESS.dna.starPosition.y - 0.1 * BioBLESS.height)/100) * BioBLESS.dna.deoxyribonucleic_acid.line_width + Math.floor((BioBLESS.dna.starPosition.x - 0.1 * BioBLESS.width)/25);
    var endpoint = Math.floor((BioBLESS.dna.endPosition.y - 0.1 * BioBLESS.height)/100) * BioBLESS.dna.deoxyribonucleic_acid.line_width + Math.floor((BioBLESS.dna.endPosition.x - 0.1 * BioBLESS.width)/25);
    var string = BioBLESS.dna.deoxyribonucleic_acid.dna_single_strand_1.sequence.substring(starpoint, endpoint - starpoint);
    BioBLESS.copy_to_clipboard(string);

};

/**
 * copy_to_clipboard is the function to copy target to clipboard
 * this function should be browser compatibility
 * @param  {target}
 */
BioBLESS.copy_to_clipboard = function(target) {    
    if(window.clipboardData){
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", target);
        alert("Copy completed.");
    }
    else if(navigator.userAgent.indexOf("Opera") != -1){
        window.location = target;
    }
    else if(window.netscape){
        try{
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch(e){ 
            alert("Rejected by the browser,\nplease check in 'about:config',\nand set 'signed.applets.codebase_principal_support' to be 'true'"); 
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if(!clip){ 
            return;
        }
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans){
            return;
        }
        trans.addDataFlavor('text/unicode');
        var len = {};
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = target;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if(!clip){
            return false; 
        }
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("copy completed.");
    }
};
