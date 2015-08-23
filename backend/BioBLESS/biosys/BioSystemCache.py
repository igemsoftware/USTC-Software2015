__author__ = 'zsy95_000'

import json
from BioSystemSamples import biosystem_sample1


def dump_ord(obj):
    """
    Dump the object with order
    :param obj:
    :return:
    """
    return json.dumps(obj, sort_keys=True, separators=(',', ':'))


def compare_gates(biosystem1, biosystem2):
    return sorted(biosystem1['nodes']) == sorted(biosystem2['nodes'])


def compare_simulation(biosystem1, biosystem2):
    return dump_ord(biosystem1['simulation_parameters']) == dump_ord(biosystem2['simulation_parameters'])


def compare_biosystem(biosystem1, biosystem2):
    if not compare_gates(biosystem1, biosystem2):
        return False
    if not compare_simulation(biosystem1, biosystem2):
        return False
    return True

if __name__ == "__main__":
    # This shows True, for python will check the dict recurrently and ignore the order.
    dict1 = {"0": (3.1416, "0:T~1", {"0:T~2I0": 1, "b": 3.14}), "1": "c1"}
    dict2 = {"1": "c1", "0": (3.1416, "0:T~1", {"b": 3.14, "0:T~2I0": 1})}
    print dict1 == dict2
    # This shows False, for the order of items in the list are very important
    list1 = [1, 3]
    list2 = [3, 1]
    print list1 == list2
    # Set, ignore the order but may change the count.
    print set(list1) == set(list2)
    # There never seems to be a hash. Nasty!
    print dict1.__hash__

    print json.dumps(biosystem_sample1, sort_keys=True, separators=(',', ':'))

    # Emm... So I only have to exchange something, right?
