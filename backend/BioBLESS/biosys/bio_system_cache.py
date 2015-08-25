__author__ = 'zsy95_000'
import json
from test_data import system_data as biosystem_sample1
from debug_tool import debug_info
from hash_tool import dump_ord, hash_list
import copy



def hash_gates_and_simulation(biosystem):
    hash_list = []
    for i in range(len(biosystem['nodes'])):
        hash_str = dump_ord(biosystem['simulation_parameters'][i])
        hash_list.append(hash('"%s":%s' % (biosystem['nodes'][i], hash_str)))
    return hash_list


class BioSystemNetwork(object):

    def __init__(self, biosystem):
        self.vertex = self.reconstruct_arcs(biosystem)
        if __debug__:
            print debug_info('reconstructed_arcs'), self.vertex
        self.reaction_lines = []
        self.resolve_biosystem_net(self.vertex)
        if __debug__:
            print debug_info('BioNetwork_lines'), self.reaction_lines
        self.reaction_lines_hash = hash_list(self.reaction_lines)
        if __debug__:
            print debug_info('BioNetwork_lines_hash'), self.reaction_lines_hash

    @staticmethod
    def reconstruct_arcs(biosystem):
            """
            Change the shape of the data of the connection of the net
            :param biosystem:
            :return:
            """
            hash_list = hash_gates_and_simulation(biosystem)
            vertex = []
            for node in range(len(biosystem['nodes'])):
                vertex.append(dict({'in': [], 'out': [], 'hash': hash_list[node]}))
            for edge in biosystem['arcs']:
                vertex[edge['from']]['out'].append(edge['to'])
                vertex[edge['to']]['in'].append(edge['from'])
            return vertex

    def _resolve_biosystem_net_recurrent(self, vertex, index, reaction_line):
        reaction_line.append(vertex[index]['hash'])
        if len(vertex[index]['out']) == 0:
            self.reaction_lines.append(reaction_line)
        else:
            for v in vertex[index]['out']:
                self._resolve_biosystem_net_recurrent(vertex, v, copy.deepcopy(reaction_line))

    def resolve_biosystem_net(self, vertex):
        """
        :param vertex:
        """
        for item in vertex:
            if len(item['in']) == 0:
                self._resolve_biosystem_net_recurrent(vertex, vertex.index(item), [])


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


def compare_gates_and_simulation(biosystem1, biosystem2):
    list1, list2 = map(hash_gates_and_simulation, (biosystem1, biosystem2))
    if __debug__:
        print debug_info(), list1, list2
    return sorted(list1) == sorted(list2)


def compare_biosystem(biosystem1, biosystem2):
    list1, list2 = map(hash_gates_and_simulation, (biosystem1, biosystem2))
    if __debug__:
        print debug_info(), list1, list2
    if sorted(list1) != sorted(list2):
        return False
    net1, net2 = map(BioSystemNetwork, (biosystem1, biosystem2))
    return sorted(net1.reaction_lines_hash) == sorted(net2.reaction_lines_hash)


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
