#!/usr/bin/env python
try:
    from django.test import TestCase
except:
    pass

from data_test import system_data
from bio_system import bio_system
from stopwatch import sw_alloc, sw_start, sw_accmu, sw_print


systems_data = [
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e5': {'reg': 0.5}, 'e4': {'reg': 0.5}, 'e6': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e1': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e3': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e2': {'reg': 0.5}}, {'device_parameter': {'initial': [10]}}], 'nodes': ['NOT3', 'INPUT'], 'system_parameter': {'time': 1000}, 'arcs': [{'to': 0, 'from': 1}]},
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e5': {'reg': 0.5}, 'e4': {'reg': 0.5}, 'e6': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e1': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e3': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e2': {'reg': 0.5}}, {'device_parameter': {'initial': [10]}}], 'nodes': ['NOT5', 'INPUT'], 'system_parameter': {'time': 1000}, 'arcs': [{'to': 0, 'from': 1}]},
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e9': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e8': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e5': {'reg': 0.5}, 'e4': {'reg': 0.5}, 'e7': {'reg': 0.5}, 'e6': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e1': {'decay1': 0.01, 'decay2': 0.01, 'trans1': 0.05, 'trans2': 0.05}, 'e3': {'reg': 0.5}, 'e2': {'reg': 0.5}}, {'device_parameter': {'initial': [10]}}, {'device_parameter': {'initial': [10]}}], 'nodes': ['OR1', 'INPUT', 'INPUT'], 'system_parameter': {'time': 1000}, 'arcs': [{'to': 0, 'from': 1}, {'to': 0, 'from': 2}]}]

if __name__ == "__main__":
    sw_alloc('s')
    sw_start('s')
    reaction = bio_system(system_data)
    reaction.simulation()
    sw_accmu('s')
    sw_print('s')
    reaction.show_record(map(lambda x:"S"+str(x), range(len(reaction.nodes)))) 
    exit()
else:
    class TestSystem(TestCase):
        def test_system(self):
            [bio_system(i) for i in systems_data]
