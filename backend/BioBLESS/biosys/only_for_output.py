#!/usr/bin/env python
"""
TEST for LIZHI
"""

__author__ = "LiZhi"
from output_data import output_data
from bio_system import bio_system

reaction = bio_system(output_data)
print reaction.species
reaction.show_reaction()
reaction.show_record(["1"])
reaction.show_record()
