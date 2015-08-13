#!/usr/bin/env python
from parts_system import parts_system
#A=parts_system(["a","b",["c",10]],[[["a"],["b"],1,[[["c",1]],[]]]])
#A.show_simulate([["a",100]],100,["a","b"])
B=parts_system([["a",100],["b",100],["c",100],"ap","bp","cp"],[[["b"],["bp","b"],0.01,[[["cp",10]],[]]],[["a"],["ap","a"],0.01,[[["bp",10]],[]]],[["c"],["cp","c"],0.01,[[["ap",10]],[]]],[["ap"],[],0.01,[[],[]]],[["bp"],[],0.01,[[],[]]],[["cp"],[],0.01,[[],[]]]])
print "waiting"
B.show_simulate([],2000,["ap","bp","cp"])
