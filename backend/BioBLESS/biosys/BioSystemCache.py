__author__ = 'zsy95_000'

import json
import sys
import os

from test_data import system_data as biosystem_sample1


def debug_info(addinfo=None):
    if addinfo:
        return "%s [line %d] <%s>: " % (os.path.split(__file__)[-1], sys._getframe().f_lineno, addinfo)
    else:
        return "%s [line %d]: " % (os.path.split(__file__)[-1], sys._getframe().f_lineno)


def dump_ord(obj):
    """
    Dump the object with order
    :param obj:
    :return:
    """
    return json.dumps(obj, sort_keys=True, separators=(',', ':'))


def hash_dict(dict_to_hash):
    return hash(dump_ord(dict_to_hash))


def hash_string_list(strlist):
    """
        Helper function. Convert a list of string into a list of hash numbers,
    then it will be much easier to do the following works.
        The possibility that it causes a collision problem can be safely ignored,
    for our data is relatively small.

    :param strlist:
    :return: List of hash
    """
    return map(hash, strlist)


def compare_gates(biosystem1, biosystem2):
    return sorted(biosystem1['nodes']) == sorted(biosystem2['nodes'])


def compare_simulation(biosystem1, biosystem2):
    return dump_ord(biosystem1['simulation_parameters']) == dump_ord(biosystem2['simulation_parameters'])


def combine_gates_and_simulation(biosystem1):
    # Combine the information into a json string
    list1 = []
    for i in range(len(biosystem1['nodes'])):
        list1.append('"' + biosystem1['nodes'][i] + '":' + dump_ord(biosystem1['simulation_parameters'][i]))
    return list1


def hash_gates_and_simulation(biosystem1):
    list1 = []
    for i in range(len(biosystem1['nodes'])):
        list1.append(hash('"' + biosystem1['nodes'][i] + '":' + dump_ord(biosystem1['simulation_parameters'][i])))
    return list1


def compare_gates_and_simulation(biosystem1, biosystem2):
    list1, list2 = map(hash_gates_and_simulation, (biosystem1, biosystem2))
    if __debug__:
        print debug_info(), list1, list2
    return sorted(list1) == sorted(list2)


def compare_biosystem(biosystem1, biosystem2):
    return compare_gates_and_simulation(biosystem1, biosystem2)


if __name__ == "__main__":
    # This can be used as unittest, for if it failed on a certain python version, you cannot use the module safely.
    # --------------------------------------------------------
    # This shows True, for python will check the dict recurrently and ignore the order.
    dict1 = {"0": (3.1416, "0:T~1", {"0:T~2I0": 1, "b": 3.14}), "1": "c1"}
    dict2 = {"1": "c1", "0": (3.1416, "0:T~1", {"b": 3.14, "0:T~2I0": 1})}
    print dict1 == dict2
    # This shows False, for the order of items in the list are very important
    list1 = [1, 3]
    list2 = [3, 1]
    print list1 == list2
    # Set, ignore the order but may change the count. (True)
    print set(list1) == set(list2)
    # There never seems to be a hash for a dict (None). Nasty!
    print dict1.__hash__
    # Just dump it in order. Important.
    print dump_ord(biosystem_sample1)
    # Convert it into string. Fine.
    print combine_gates_and_simulation(biosystem_sample1)
    # Emm... So I only have to json-hash it, right?
    print hash_gates_and_simulation(biosystem_sample1)

    print compare_biosystem(biosystem_sample1, biosystem_sample1)
