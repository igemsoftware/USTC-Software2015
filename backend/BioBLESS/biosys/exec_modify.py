#!/usr/bin/env python
import simplejson
from bio_system import bio_system


null=None
gate_file = open("../../../doc/devices/gates_lizhi.json", "r")
gate_data_source = gate_file.read()
gates_data = simplejson.loads(gate_data_source)
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

print "Input which gate you want to simualte(NOT6,OR0,...):"
gate_name = raw_input()

input_num = len(gates_data[gate_name]["input"])

print "Input the initial number of DNA in the gate:"
gate_dna_number = input()

print "Input the intitial of input species ( %d ):" % input_num
initial = [input() for i in range(input_num)]

print "Input simulation time:"
time_to = input()

graph = {
    "nodes": [gate_name]+["INPUT"]*input_num, 
    "arcs": [{"from" :i, "to": 0} for i in range(1,input_num+1)], 
    "system_parameter":{"time": time_to},
    "simulation_parameters":[
        dict(
            {"device_parameter":{"initial":[gate_dna_number]*len(gates_data[gate_name]["parts"]["id"])}}.items()+
            {i["id"]:i["params"] for i in gates_data[gate_name]["map"]}.items()
        )
    ]+[{"device_parameter":{"initial":[initial[i]]}} for i in range(input_num)]
}

reaction = bio_system(graph)

reaction.show_record()
try:
    while(True):
        print "What do you want to show(1,2,3,):"
        reaction.show_record(map(str, input()))
except:
    pass

