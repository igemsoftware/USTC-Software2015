#!/usr/bin/env python
"""
This is a module to describe BioSystem.

There is a function named bio_system in this module.
The format to input is in doc/api-for-front/gates_specification.txt 

Examples
--------------
Create some biosys to calculate their simulation

>>> test = bio_system(data)
>>> test.simulation()

"""
__author__ = 'Trumpet'

import os
try:
    import simplejson
except:
    import json as simplejson

from reaction_system import ReactionSystem


GATE_FILE = None
real_path = os.path.split(os.path.realpath(__file__))[0]+"/"
try:
    GATE_FILE = open(real_path+"../../../doc/devices/gates_lizhi.json", "r")
except IOError:
    GATE_FILE = open(real_path+"../doc/devices/gates_lizhi.json", "r")
gate_data_source = GATE_FILE.read()
gates_data = simplejson.loads(gate_data_source)
gates_data = list(gates_data)
gates_data.append({
    "id": "INPUT",
    "input": [],
    "output": ["d1"],
    "parts": {
        "id": [["d1"]],
        "type": {"d1": "Input"}
    },
    "map": [],
    "type": {}
})


def dev_system(gates, data, nodes_id, input_sub, output_sub):
    """
        To build a reaction system from the data of a device.
        
        Input gates data(from doc/devices/gates_lizi.json),
        and data(format is the same with the system data),
        nodes_id,input_sub and output_sub(str)
        Then return a reaction system.
        This reaction system will be sumerize in bio_system
    """
    if gates["id"] == "INPUT":
        species = [[gates["parts"]["id"][0][0], data["device_parameter"]["initial"][0]]]
        reaction = []
    else:
        def coding_find_last(tmp, string):
            while parts_type[tmp] != string:
                tmp -= 1
            return tmp + 1

        def select(list_from, string):
            ans = []
            tmp = 0
            flag = True
            while flag:
                try:
                    ans.append(list_from.index(string, tmp) + 1)
                    tmp = ans[-1]
                except ValueError:
                    flag = False
            return ans

        def get_species(list_from, str_list):
            list_from = map(str, list_from)
            return [i + j for i in str_list for j in list_from]

        def find_in_map(tmp=0, **kw):
            for single_map in range(tmp, len(maps)):
                try:
                    if maps[single_map][kw.keys()[0]] == kw.values()[0]:
                        return single_map#
                except KeyError:
                    pass
            return -1

        parts_type = [gates["parts"]["type"]["d" + str(i + 1)] for i in range(len(gates["parts"]["type"]))]
        maps = gates["map"]
        protein = select(parts_type, "Coding")
        s_rna = select(parts_type, "sRNA")
        species = get_species(protein, ["d", "m", "r", "l", "p"]) + get_species(s_rna, ["d", "m", "r"])
        initial = data["device_parameter"]["initial"]
        for i in range(len(initial)):
            for j in gates["parts"]["id"][i]:
                if j[0] == "d":
                    try:
                        species[species.index(j)] = [j, initial[i]]
                    except ValueError:
                        pass
        species += gates["input"]

        reaction = []
        for single in protein + s_rna:
            part_type = parts_type[single - 1]
            part_id = str(single)
            maper = find_in_map(id1="d" + part_id)
            single_data = data[maps[maper]["id"]]
            single_reaction = [
                [["d" + part_id], ["m" + part_id], single_data["trans1"]],
                [["m" + part_id], ["d" + part_id, "r" + part_id], single_data["trans1"]],
                [["r" + part_id], [], single_data["decay1"]],
                [["r" + part_id], ["l" + part_id], single_data["trans2"]],
                [["l" + part_id], ["r" + part_id, "p" + part_id], single_data["trans2"]],
                [["p" + part_id], [], single_data["decay2"]],
            ] if part_type == "Coding" else [
                [["d" + part_id], ["m" + part_id], single_data["trans1"]],
                [["m" + part_id], ["d" + part_id, "r" + part_id], single_data["trans1"]],
                [["r" + part_id], [], single_data["decay1"]],
            ]
            for reg_sub in ["Promoter", "RBS"]:
                #print reg_sub+","+str(single)#
                if reg_sub == "Promoter":
                    pro = coding_find_last(single, reg_sub)
                    tmp = find_in_map(id2="d" + str(pro))
                else:
                    rbs = coding_find_last(single, reg_sub)
                    if rbs > pro:
                        pro = rbs
                        tmp = find_in_map(id2="d" + str(pro))
                    else:
                        tmp = -1
                while tmp != -1:
                    reg_data = data[maps[tmp]["id"]]
                    reg_pro = maps[tmp]["id1"]

                    #print str(maps[tmp]["id"])+","+str(reg_data)#
                    """
                    d    ->    r    ->    p
                          m          l
                      n            i
                    """

                    if maps[tmp]["type"] == "inh":
                        single_reaction.append(
                            [[reg_pro, "m" + part_id], ["n" + part_id], reg_data["reg"] * single_data["trans1"]]
                        )
                        single_reaction.append(
                            [["n" + part_id], [reg_pro, "d" + part_id], reg_data["reg"] * single_data["trans1"]]
                        )
                        if not "n" + part_id in species:
                            species.append("n" + part_id)
                        temp = find_in_map(id2="e" + str(tmp+1))
                        while temp != -1:
                            rep_data = data[maps[temp]["id"]]
                            rep_pro = maps[temp]["id1"]
                            single_reaction.append(
                                [[rep_pro, "n" + part_id], ["m" + part_id, reg_pro, rep_pro],
                                 rep_data["reg"] * reg_data["reg"] * single_data["trans1"]]
                            )
                            temp = find_in_map(temp + 1, id2="e" + str(tmp+1))

                    if maps[tmp]["type"] == "lock":
                        single_reaction.append(
                            [[reg_pro, "l" + part_id], ["i" + part_id], reg_data["reg"] * single_data["trans2"]]
                        )
                        single_reaction.append(
                            [["i" + part_id], [reg_pro, "r" + part_id], reg_data["reg"] * single_data["trans2"]]
                        )
                        if not "i" + part_id in species:
                            species.append("i" + part_id)

                    if maps[tmp]["type"] == "act":
                        single_reaction.append(
                            [[reg_pro, "d" + part_id], [reg_pro, "d" + part_id, "r" + part_id],
                             reg_data["reg"] * single_data["trans1"]]
                        )

                    if maps[tmp]["type"] == "key":
                        single_reaction.append(
                            [[reg_pro, "r" + part_id], [reg_pro, "p" + part_id, "r" + part_id],
                             reg_data["reg"] * single_data["trans2"]]
                        )

                    tmp = find_in_map(tmp + 1, id2="d" + str(pro))
            reaction += single_reaction

    def add_str(list_from, nodes_id):
        for sig in list_from:
            if isinstance(sig, list):
                add_str(sig, nodes_id)
        for sig in range(len(list_from)):
            if isinstance(list_from[sig], str) or isinstance(list_from[sig], unicode):
                list_from[sig] = nodes_id + list_from[sig]

    def replace_str(list_from, st1, st2):
        for sig in list_from:
            if isinstance(sig, list):
                replace_str(sig, st1, st2)
        for sig in range(len(list_from)):
            if list_from[sig] == st1:
                list_from[sig] = st2

    #"""
    add_str(species, "S"+nodes_id)
    add_str(reaction, "S"+nodes_id)
    tmp = [replace_str(species, "S"+nodes_id + gates["input"][i], "S"+input_sub[i]) for i in range(len(input_sub))]
    tmp = [replace_str(species, "S"+nodes_id + gates["output"][i], "S"+output_sub[i]) for i in range(len(output_sub))]
    tmp = [replace_str(reaction, "S"+nodes_id + gates["input"][i], "S"+input_sub[i]) for i in range(len(input_sub))]
    tmp = [replace_str(reaction, "S"+nodes_id + gates["output"][i], "S"+output_sub[i]) for i in range(len(output_sub))]
    """
    add_str(species, nodes_id)
    add_str(reaction, nodes_id)
    tmp = [replace_str(species, nodes_id + gates["input"][i], input_sub[i]) for i in range(len(input_sub))]
    tmp = [replace_str(species, nodes_id + gates["output"][i], output_sub[i]) for i in range(len(output_sub))]
    tmp = [replace_str(reaction, nodes_id + gates["input"][i], input_sub[i]) for i in range(len(input_sub))]
    tmp = [replace_str(reaction, nodes_id + gates["output"][i], output_sub[i]) for i in range(len(output_sub))]
    """
    return ReactionSystem(reaction, species)


def bio_system(system_data):
    """
    Input a BioSystem, and output the reaction system with simulation.
    
    The format to input is in doc/api-for-front/gates_specification.txt 
    Input it,and return a reaction system which you can use simulation() and record_list
    """
    time = system_data["system_parameter"]["time"]
    gates = {single_gate["id"]: single_gate for single_gate in gates_data}
    nodes = system_data["nodes"]
    devices = [dev_system(
        gates[nodes[i]],
        system_data["simulation_parameters"][i],
        str(i),
        [str(j["from"]) for j in system_data["arcs"] if j["to"] == i],
        [str(i)]
    ) for i in range(len(nodes))]
    reaction = devices[0]
    for single_nodes in range(1, len(nodes)):
        reaction += devices[single_nodes]

    reaction.time = time
    reaction.nodes = nodes
    return reaction

def json_to_json(string):
    system = bio_system(simplejson.loads(string))
    system.simulation()
    return simplejson.dumps(system.record)

if __name__ == "__main__":
    reader = raw_input()
    print json_to_json(reader)
