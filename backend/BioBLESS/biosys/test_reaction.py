#!/usr/bin/env python
try:
    from django.test import TestCase
except ImportError:
    pass

from reaction_system import ReactionSystem

if __name__ == "__main__":
    A = ReactionSystem([[["a"], ["b"], 1]], [["a", 100], "b"])
    A.show_simulate([], 10,["a", "b"])
    B = ReactionSystem([[["b"], ["c"], 1]], [["b", 100], "c"])
    C = A + B
    print C.species
    C.show_simulate([], 10, ["a", "b", "c"])
else:
    class TestReaction(TestCase):
        def test_reaction(self):
            A = ReactionSystem([[["a"], ["b"], 1]], [["a", 100], "b"])
            B = ReactionSystem([[["b"], ["c"], 1]], [["b", 100], "c"])
            C = A + B
            print C.species
            C.simulate([], 10)
            C.show_species()
            C.show_reaction()
