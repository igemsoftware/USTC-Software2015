#!/usr/bin/env python
try:
    from django.test import TestCase
except ImportError:
    pass

from data_test import system_data
from bio_system import bio_system


if __name__ == "__main__":
    reaction = bio_system(system_data)
    print reaction.species
    reaction.show_reaction()
    reaction.simulation()
    reaction.show_record(map(str, range(len(reaction.nodes))))
    reaction.show_record()
else:
    class TestSystem(TestCase):
        def test_system(self):
            A = bio_system(system_data)

