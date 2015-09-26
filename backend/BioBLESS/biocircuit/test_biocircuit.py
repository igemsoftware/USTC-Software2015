__author__ = 'suquark'

#!/usr/bin/env python
from django.test import TestCase

from biocircuit import *

class TestSystem(TestCase):
    def test_system(self):
        a = string2expr("1011010-")
        print a
        print get_gate_not(a)
        print get_node_num(a)
        print create_circuit(a)