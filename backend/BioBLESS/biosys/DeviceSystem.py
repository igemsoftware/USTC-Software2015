#!/usr/bin/env python
class DeviceSystem(object):
    def __init__(self,logi, data):
        '''
            find sub needed : input,coding,sRNA
            trans(coding/sRNA)
            act,inh,lock,key,rep

            |-coding
            | |-trans
            | | |-act
            | | |-inh
            | | | |-rep
                |-key
                |-lock

        '''
        parts_type=logi["parts"]["type"].values()
        maps=logi["map"]
        def coding_find_last(tmp, str):
            while(parts_type[tmp]!=str):
                tmp-=1
            return tmp
        def select(list,str):
            ans=[]
            tmp=0
            flag=True
            while(flag):
                try:
                    ans.append(list.index(str,tmp))
                    tmp=ans[-1]
                except:
                    flag=False
            return ans
        def get_species(list, str_list):
            list=map(str,list)
            return [i+j for i in str_list for j in list]
        def find_in_map(tmp = 0, **kw):
            for single_map in range(tmp,len(map)):
                try:
                    if map[single_map][kw.keys[0]]==kw.values[0]:
                        return single_map
                except:
                    pass
            return -1
        protein=select(parts_type,"Promoter")
        sRNA=select(parts_type,"sRNA")
        species=get_species(protein,["d","r","p"])+get_species(sRNA,["d","r"])
        reaction=[]
        for single in protein+sRNA :
            ty=parts_type[single]
            st=str(single_p)
            parts_type[single]
            maper=find_in_map(id1="d"+st)
            single_data=data[maps[maper]["id"]]
            single_reaction=[
                [["d"+st],["m"+st],single_data["trans1"]],
                [["m"+st],["d"+st,"r"+st],single_data["trans1"]],
                [["r"+st],[],single_data["decay1"]],
                [["r"+st],["r"+st,"p"+st],single_data["trans2"]],
                [["p"+st],[],single_data["decay2"]],

            ] if ty=="coding" else [
                [["d"+st],["m"+st],single_data["trans1"]],
                [["m"+st],["d"+st,"r"+st],single_data["trans1"]],
                [["r"+st],[],single_data["decay1"]],
            ]
            for reg_sub in ["Promoter","RBS"]:
                pro=coding_find_last(single_p, reg_sub)
                tmp=find_in_map(id2="d"+str(pro))
                while(tmp!=-1):
                    reg_data=data[maps[tmp]["id"]]
                    reg_pro=maps[tmp]["id1"]
                    if maps[tmp]["type"]==("inh" if reg_sub=="Promoter" else "lock"):
                        single_reaction.append(
                            [[reg_pro,"m"+st],["n"+st],reg_data["reg"]]
                        )
                        single_reaction.append(
                            [["n"+st],[reg_data,"d"+st],reg_data["reg"]]
                        )
                        if reg_sub=="Promoter":
                            temp=find_in_map(id2="e"+str(tmp))
                            while(temp!=-1):
                                rep_data=data[maps[temp]["id"]]
                                rep_pro=maps[tmp]["id1"]
                                single_reaction.append(
                                    [[rep_pro,"n"+st],["m"+st,reg_pro,rep_pro],rep_data["reg"]]
                                )
                                temp=find_in_map(temp+1,id2="e"+str(tmp))
                    else:
                        single_reaction.append(
                            [[reg_pro,"d"+st],[reg_pro,"d"+st,"r"+st],reg_data["reg"]]
                        )
                    tmp=find_in_map(tmp+1,id2="d"+str(pro))
            reaction+=single_reaction
        self.species=species
        self.reaction=reaction
    def get_reaction(self,ID,InPut,OutPut):
        def add_str(list,ID):
            for sig in list:
                if isinstance(sig,list):
                    add_str(sig,ID)
            for sig in range(len(list)):
                if isisntance(list[sig],str):
                    list[sig]=ID+list[sig]
        def replace_str(list,st1,st2):
            for sig in list:
                if isinstance(sig,list):
                    add_str(sig,st1,st2)
            for sig in range(len(list)):
                if list[sig]==st1:
                    list[sig]=st2
        species=self.species
        reaction=self.reaction
        add_str(species,ID)
        add_str(reaction,ID)
        [replace_str(spcies,ID+logi["input"][i],InPut[i]) for i in range(len(InPut))]
        [replace_str(spcies,ID+logi["output"][i],OutPut[i]) for i in range(len(InPut))]
        return ReactionSystem(species,reaction)
