#!/usr/bin/env python

import sys
import simplejson
try :
    sys.path.append('../backend/BioBLESS/biosys')
except:
    pass
from bio_system import bio_system

null = None
gate_file = open("../doc/devices/gates_lizhi.json", "r")
gate_data_source = gate_file.read()
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
gates_data = {single_gate["id"]:single_gate for single_gate in gates_data}

def do_test(gate_name, time_to, initial):

    input_num = len(gates_data[gate_name]["input"])

    gate_dna_number = 10

    graph = {
        "nodes": [gate_name]+["INPUT"]*input_num, 
        "arcs": [{"from" :i, "to": 0} for i in range(1,input_num+1)], 
        "system_parameter":{"time": time_to},
        "simulation_parameters":[
            dict(
                [("device_parameter", {"initial":[gate_dna_number]*len(gates_data[gate_name]["parts"]["id"])})]+
                [(i["id"], i["params"]) for i in gates_data[gate_name]["map"]]
            )
        ]+[{"device_parameter":{"initial":[initial[i]]}} for i in range(input_num)]
    }

    #print "Simulating..."
    if '-d' in sys.argv:
        print "This bio-system is:"
        print graph

    reaction = bio_system(graph)
    if '-d' in sys.argv:
        print reaction.species
        reaction.show_reaction()
    reaction.simulation()

    record = reaction.record_list
    length = len(record["t"])
    record = dict([[i[0],sum(i[1])/length] for i in record.items()])
    return record

if __name__ == "__main__":
    gate_name = sys.argv[sys.argv.index('-g')+1]
    time_to = int(sys.argv[sys.argv.index('-t')+1])
    input_num = len(gates_data[gate_name]["input"])
    starter = sys.argv.index('-i')
    initial = map(int, sys.argv[starter+1:starter+input_num+1])
    record = do_test(gate_name, time_to, initial)
    print record["S0"]
    try:
        while True:
            print "What else do you want to show(S0,S1,S0d3,S0p5):"
            string = raw_input()
            strings = string.split(",")
            reaction.show_record(strings)
    except:
        pass