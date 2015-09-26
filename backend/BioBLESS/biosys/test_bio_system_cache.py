__author__ = 'suquark'
from bio_system_cache import hash_gates_and_simulation, compare_biosystem
from data_test import system_data as biosystem_sample1, system_data_mixed as biosystem_sample2
from debug_tool import debug_info
from hash_tool import dump_ord
from django.test import TestCase


if __name__ == "__main__":
    # This can be used as unittest, for if it failed on a certain python version, you cannot use the module safely.
    # --------------------------------------------------------
    # This shows True, for python will check the dict recurrently and ignore the order.
    #dict1 = {"0": (3.1416, "0:T~1", {"0:T~2I0": 1, "b": 3.14}), "1": "c1"}
    #dict2 = {"1": "c1", "0": (3.1416, "0:T~1", {"b": 3.14, "0:T~2I0": 1})}
    #print dict1 == dict2
    # This shows False, for the order of items in the list are very important
    #list1 = [1, 3]
    #list2 = [3, 1]
    #print list1 == list2
    # Set, ignore the order but may change the count. (True)
    #print set(list1) == set(list2)
    # There never seems to be a hash for a dict (None). Nasty!
    #print dict1.__hash__
    # Just dump it in order. Important.
    #print dump_ord(biosystem_sample1)
    # Emm... So I only have to json-hash it, right?
    #print hash_gates_and_simulation(biosystem_sample1)

    #print compare_biosystem(biosystem_sample1, biosystem_sample2)
else:
    class TestReaction(TestCase):
        def test(self):
            self.assertEqual(compare_biosystem(biosystem_sample1, biosystem_sample2), True)
