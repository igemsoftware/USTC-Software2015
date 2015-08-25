#!/usr/bin/env python
"""
This is a module to describe BioSystem.

There is a function named bio_system in this module.

Examples
--------------
Create some biosys and calculate their simulation

>>> A = bio_system(dict)
"""
__author__ = 'Trumpet'

from reaction_system import ReactionSystem
from gates_data import gates_data

class DeviceSystem(object):
    """
    device system
    """
    def __init__(self, logi, data):
        '''
            find sub needed : input,coding,sRNA
            trans(coding/sRNA)
            act,inh,lock,key,rep
        '''
        if logi["id"] == "INPUT":
            self.species = [[logi["parts"]["id"][0][0], data["device_parameter"]["initial"][0]]]
            self.reaction = []
            self.logi = logi
            self.data = data
        else:
            self.set_device(logi, data)
    def set_device(self, logi, data):
        #parts_type=logi["parts"]["type"].values()
        parts_type = [logi["parts"]["type"]["d"+str(i+1)] for i in range(len(logi["parts"]["type"]))]
        maps = logi["map"]
        def coding_find_last(tmp, str):
            while parts_type[tmp] != str:
                tmp -= 1
            return tmp + 1
        def select(list, str):
            ans = []
            tmp = 0
            flag = True
            while flag:
                try:
                    ans.append(list.index(str, tmp) + 1)
                    tmp = ans[-1]
                except:
                    flag = False
            return ans
        def get_species(list, str_list):
            list = map(str, list)
            return [i + j for i in str_list for j in list]
        def find_in_map(tmp=0, **kw):
            for single_map in range(tmp, len(maps)):
                try:
                    if maps[single_map][kw.keys()[0]] == kw.values()[0]:
                        return single_map
                except:
                    pass
            return -1
        protein = select(parts_type, "Coding")
        sRNA = select(parts_type, "sRNA")
        species = get_species(protein, ["d", "m", "r", "p"])+get_species(sRNA, ["d", "m", "r"])
        initial = data["device_parameter"]["initial"]
        for i in range(len(initial)):
            for j in logi["parts"]["id"][i]:
                if j[0] == "d":
                    try:
                        species[species.index(j)] = [j, initial[i]]
                    except:
                        pass
        species += logi["input"]
        reaction = []
        for single in protein+sRNA:
            ty = parts_type[single-1]
            st = str(single)
            parts_type[single]
            maper = find_in_map(id1="d"+st)
            single_data = data[maps[maper]["id"]]
            single_reaction = [
                [["d"+st], ["m"+st], single_data["trans1"]],
                [["m"+st], ["d"+st, "r"+st], single_data["trans1"]],
                [["r"+st], [], single_data["decay1"]],
                [["r"+st], ["r"+st, "p"+st], single_data["trans2"]],
                [["p"+st], [], single_data["decay2"]],
            ] if ty == "Coding" else [
                [["d"+st], ["m"+st], single_data["trans1"]],
                [["m"+st], ["d"+st, "r"+st], single_data["trans1"]],
                [["r"+st], [], single_data["decay1"]],
            ]
            for reg_sub in ["Promoter", "RBS"]:
                pro = coding_find_last(single, reg_sub)
                tmp = find_in_map(id2="d"+str(pro))
                while tmp != -1:
                    reg_data = data[maps[tmp]["id"]]
                    reg_pro = maps[tmp]["id1"]
                    if maps[tmp]["type"] == ("inh" if reg_sub == "Promoter" else "lock"):
                        single_reaction.append(
                            [[reg_pro, "m"+st], ["n"+st], reg_data["reg"]]
                        )
                        single_reaction.append(
                            [["n"+st], [reg_pro, "d"+st], reg_data["reg"]]
                        )
                        if not "n"+st in species:
                            species.append("n"+st)
                        if reg_sub == "Promoter":
                            temp = find_in_map(id2="e"+str(tmp))
                            while temp != -1:
                                rep_data = data[maps[temp]["id"]]
                                rep_pro = maps[tmp]["id1"]
                                single_reaction.append(
                                    [[rep_pro, "n"+st], ["m"+st, reg_pro, rep_pro], rep_data["reg"]]
                                )
                                temp = find_in_map(temp+1, id2="e"+str(tmp))
                    else:
                        single_reaction.append(
                            [[reg_pro, "d"+st], [reg_pro, "d"+st, "r"+st], reg_data["reg"]]
                        )
                    tmp = find_in_map(tmp+1, id2="d"+str(pro))
            reaction += single_reaction
        self.species = species
        self.reaction = reaction
        self.logi = logi
        self.data = data
    def get_reaction(self, ID, InPut, OutPut):
        """
        get reaction data
        """
        def add_str(li, ID):
            for sig in li:
                if isinstance(sig, list):
                    add_str(sig, ID)
            for sig in range(len(li)):
                if isinstance(li[sig], str):
                    li[sig] = ID+li[sig]
        def replace_str(li, st1, st2):
            for sig in li:
                if isinstance(sig, list):
                    replace_str(sig, st1, st2)
            for sig in range(len(li)):
                if li[sig] == st1:
                    li[sig] = st2
        species = self.species
        reaction = self.reaction
        logi = self.logi
        add_str(species, ID)
        add_str(reaction, ID)
        for i in range(len(InPut)): replace_str(species, ID+logi["input"][i], InPut[i])
        for i in range(len(OutPut)): replace_str(species, ID+logi["output"][i], OutPut[i])
        for i in range(len(InPut)): replace_str(reaction, ID+logi["input"][i], InPut[i])
        for i in range(len(OutPut)): replace_str(reaction, ID+logi["output"][i], OutPut[i])
        return ReactionSystem(reaction, species)

def bio_system(system_data):
    """
    Input a BioSystem, and output the reaction system with simulation.


    """
    time = system_data["system_parameter"]["time"]
    logi = {single_lizhi["id"]:single_lizhi for single_lizhi in lizhi}
    nodes = system_data["nodes"]
    devices = [DeviceSystem(
        logi[nodes[i]],
        system_data["simulation_parameters"][i]
    ).get_reaction(
        str(i),
        [str(j["from"]) for j in system_data["arcs"] if j["to"] == i],
        str(i)
    ) for i in range(len(nodes))]
    reaction = devices[0]
    for single_nodes in range(1, len(nodes)):
        reaction += devices[single_nodes]

    try:
        reaction.simulate([], time)
    except IndexError:
        pass
    #print reaction.species
    #reaction.show_reaction()
    reaction.show_record(map(str, range(len(nodes))))
    reaction.show_record()
    return reaction
