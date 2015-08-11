#!/usr/bin/env python
from parts_system import parts_system

A = parts_system(["a", "b", ["c", 10]], [[["a"], ["b"], 1, [[["c", 1]], []]]])
A.show_simulate([["a", 100]], 100, ["a", "b"])
B = parts_system([["a", 100], ["b", 100], ["c", 100], "ap", "bp", "cp"],
                 [[["b"], ["bp", "b"], 1, [[["cp", 10]], []]], [["a"], ["ap", "a"], 1, [[["bp", 10]], []]],
                  [["c"], ["cp", "c"], 1, [[["ap", 10]], []]], [["ap"], [], 1, [[], []]], [["bp"], [], 1, [[], []]],
                  [["cp"], [], 1, [[], []]]])
print "waiting"
B.show_simulate([], 100, ["ap", "bp", "cp"])
