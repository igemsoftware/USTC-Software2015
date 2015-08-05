#!/usr/bin/env python
from reaction_system import reaction_system
A=parts_system([[["a"],["b"],1],[["b"],["c"],1]],["a","b","c"])
A.show_simulate([1000,0,0],10,["a","b","c"])
A.show_species
A.del_species_name("c")
A.show_species
A.del_reaction([["b"],["c"],1])
A.show_reaction
A.show_simulate([1000,0],10,["a","b"])
A.add_species_name("d")
A.add_reaction([["a"],["d"],1])
A.show_simulate([1000,0,0],10,["a","b","d"])
A.reaction_number
A.species_number
A.show_record(["a"])
