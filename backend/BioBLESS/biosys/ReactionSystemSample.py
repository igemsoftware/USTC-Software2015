#!/usr/bin/env python
from ReactionSystem import ReactionSystem
A=ReactionSystem([[["a"],["b"],1],[["b"],["c"],1]],[["a",1000],"b","c"])
A.show_simulate([],10,["a","b","c"])
A.show_species()
A.del_species_name("c")
A.show_species()
A.del_reaction([["b"],["c"],1])
A.show_reaction()
A.show_simulate([["a",1000]],10,["a","b"])
A.add_species_name("d")
A.add_reaction([["a"],["d"],1])
A.show_simulate([["a",1000]],10,["a","b","d"])
A.reaction_number
A.species_number
A.show_record(["a"])
