#!/usr/bin/env python
try:
    from django.test import TestCase
except ImportError:
    pass

from data_test import system_data
from bio_system import bio_system
from stopwatch import *

systems_data = [
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e5': {'reg': 20}, 'e4': {'reg': 20}, 'e6': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e1': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e3': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e2': {'reg': 20}}, {'device_parameter': {'initial': [0]}}], 'nodes': ['NOT3', 'INPUT'], 'system_parameter': {'time': 100}, 'arcs': [{'to': 0, 'from': 1}]},
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e5': {'reg': 20}, 'e4': {'reg': 20}, 'e6': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e1': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e3': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e2': {'reg': 20}}, {'device_parameter': {'initial': [0]}}], 'nodes': ['NOT5', 'INPUT'], 'system_parameter': {'time': 100}, 'arcs': [{'to': 0, 'from': 1}]},
    {'simulation_parameters': [{'device_parameter': {'initial': [10, 10, 10]}, 'e8': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e5': {'reg': 20}, 'e4': {'reg': 20}, 'e7': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e6': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e1': {'decay1': 0.1, 'decay2': 0.05, 'trans1': 0.01, 'trans2': 0.5}, 'e3': {'reg': 20}, 'e2': {'reg': 20}}, {'device_parameter': {'initial': [0]}}, {'device_parameter': {'initial': [10]}}], 'nodes': ['OR1', 'INPUT', 'INPUT'], 'system_parameter': {'time': 100}, 'arcs': [{'to': 0, 'from': 1}, {'to': 0, 'from': 2}]}]

if __name__ == "__main__":
    reaction = bio_system(system_data)
    reaction.simulation()
    reaction.show_record(map(lambda x:"S"+str(x), range(len(reaction.nodes))))
else:
    class TestSystem(TestCase):
        def test_system(self):
            [bio_system(i) for i in systems_data]
