#!/usr/bin/env python
from reaction_system import ReactionSystem
A=ReactionSystem([[["a"],["b"],1]],[["a",100],"b"])
B=ReactionSystem([[["b"],["c"],1]],[["b",100],"c"])
C=A+B
print C.species
C.show_simulate([],10,["a","b","c"])
