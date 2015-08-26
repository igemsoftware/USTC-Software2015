
BioBLESS.dna.detail = {
    "device": []
};

BioBLESS.dna.detail.device = [
    {
        "d" : ["ATTTCCGATTTCCGATTTCCGATTTCCG", "CTTCACGCTTCACGCTTCACGCTTCACG", "CGGATAACGGATAACGGATAACGGATAA"],
        "d_oppsite" : []
    }
];

BioBLESS.dna.init = function() {
    this.stage = BioBLESS.utils.init_stage();
    BioBLESS.dna.deoxyribonucleic_acid = BioBLESS.dna.make_dna_sequence();
    BioBLESS.dna.stage.addChild(BioBLESS.dna.deoxyribonucleic_acid);
};

BioBLESS.dna.make_dna_sequence = function(){
	var i,j,k;
    deoxyribonucleic_acid = new PIXI.Container();
    deoxyribonucleic_acid.dna_style = {
        font : 'bold 40px "Courier New"',
        fill : 'black',
        lineHeight : 100
    };
    deoxyribonucleic_acid.device_style = {
        font : 'bold 40px "Courier New"',
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
                if(count > 100){
                    deoxyribonucleic_acid.dna_single_strand_1.sequence += '\n';
                    deoxyribonucleic_acid.device_name.sequence += '\n';
                    count -= 100;
                }
            }
        }
    }
    deoxyribonucleic_acid.dna_single_strand_1.dna_text = new PIXI.Text(deoxyribonucleic_acid.dna_single_strand_1.sequence, deoxyribonucleic_acid.dna_style);
    deoxyribonucleic_acid.dna_single_strand_1.dna_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.dna_single_strand_1.dna_text.y = 0.10 * BioBLESS.height;
    deoxyribonucleic_acid.device_name.device_text = new PIXI.Text(deoxyribonucleic_acid.device_name.sequence, deoxyribonucleic_acid.device_style);
    deoxyribonucleic_acid.device_name.device_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.device_name.device_text.y = 0.06 * BioBLESS.height;

    BioBLESS.dna.dispose_oppsite_dna();

    deoxyribonucleic_acid.dna_single_strand_2 = {};
    deoxyribonucleic_acid.dna_single_strand_2.sequence = "";
    for(i = 0; i < BioBLESS.dna.detail.device.length; i++){
    	count = 0;
        for(j = 0; j < BioBLESS.dna.detail.device[i].d_oppsite.length; j++){
            for(k = 0; k < BioBLESS.dna.detail.device[i].d_oppsite[j].length; k++){    
                deoxyribonucleic_acid.dna_single_strand_2.sequence += BioBLESS.dna.detail.device[i].d_oppsite[j][k];
                count++;
                if(count > 100){
                    deoxyribonucleic_acid.dna_single_strand_2.sequence += '\n';
                    count -= 100;
                }
            }
        }
    }
    deoxyribonucleic_acid.dna_single_strand_2.dna_text = new PIXI.Text(deoxyribonucleic_acid.dna_single_strand_2.sequence, deoxyribonucleic_acid.dna_style);
    deoxyribonucleic_acid.dna_single_strand_2.dna_text.x = 0.1 * BioBLESS.width;
    deoxyribonucleic_acid.dna_single_strand_2.dna_text.y = 0.14 * BioBLESS.height;

    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.dna_single_strand_1.dna_text);
    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.dna_single_strand_2.dna_text);
    deoxyribonucleic_acid.addChild(deoxyribonucleic_acid.device_name.device_text);

    deoxyribonucleic_acid.interactive = true;
    deoxyribonucleic_acid.buttonMode = true;
    deoxyribonucleic_acid.on('click', BioBLESS.dna.dna_copy_work);
    return deoxyribonucleic_acid;
};

BioBLESS.dna.dispose_oppsite_dna = function(){
    var i,j,k;
    for(i = 0; i < BioBLESS.dna.detail.device.length; i++){
        for(j = 0; j < BioBLESS.dna.detail.device[i].d.length; j++){
            BioBLESS.dna.detail.device[i].d_oppsite[BioBLESS.dna.detail.device[i].d_oppsite.length] = "";
            for(k = 0; k < BioBLESS.dna.detail.device[i].d[j].length; k++){
                switch(BioBLESS.dna.detail.device[i].d[j][k]){
                    case 'A':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'T';
                        break;
                    case 'T':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'A';
                        break;
                    case 'C':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'G';
                        break;
                    case 'G':
                        BioBLESS.dna.detail.device[i].d_oppsite[j] += 'C';
                        break;
                    default:
                        alert("Error dna is wrong!");
                        break;
                }
            }
        }
    }
};

var waitforclickstar = true;
BioBLESS.dna.dna_copy_work = function(event){
    var starPosition;
    var endPosition;
    waitforclickstar = !waitforclickstar;

    if(waitforclickstar){
        starPosition = event.data.getLocalPosition(this);
        alert("select star");
    }
    else{
        endPosition = event.data.getLocalPosition(this);
        alert("select end");
    }
    
};