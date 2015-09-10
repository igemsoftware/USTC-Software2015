#!/usr/bin/env python
from django.test import TestCase
from reaction_system import ReactionSystem

if __name__ == "__main__":
    A = ReactionSystem([[["a"], ["b"], 1]], [["a", 100], "b"]) + ReactionSystem([[["b"], ["c"], 1]], [["b", 100], "c"])
    A.simulate(10)
    A.show_record(["a", "b", "c"])
    exit()
else:
    class TestReaction(TestCase):
        def test_reaction(self):
            A = ReactionSystem([[["a"], ["b"], 1]], [["a", 100], "b"])
            B = ReactionSystem([[["b"], ["c"], 1]], [["b", 100], "c"])
            C = A + B
            print C.species
            C.simulate(10)
            C.show_species()
            C.show_reaction()
