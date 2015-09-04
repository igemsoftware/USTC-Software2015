from django.test import TestCase

import biogate

class TestGate(TestCase):
    def test_gate(self):
        biogate.get_d_gate(biogate.gate_data_source)
