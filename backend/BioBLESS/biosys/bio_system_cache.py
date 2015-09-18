"""
This module do something about biosystem cache.
It will accelerate the simulation process.
"""
__author__ = 'suquark'
import os
from BioBLESS.settings import DEBUG as DEBUG
import json
from debug_tool import debug_info
from hash_tool import dump_ord, hash_list
import copy


def hash_gates_and_simulation(biosystem):
    """
    Hash gates and simulation
    """
    hash_lst = []
    for i in range(len(biosystem['nodes'])):
        hash_str = dump_ord(biosystem['simulation_parameters'][i])
        hash_lst.append(hash('"%s":%s' % (biosystem['nodes'][i], hash_str)))
    return hash_lst


class BioSystemNetwork(object):
    def __init__(self, biosystem):
        self.vertex = self.reconstruct_arcs(biosystem)
        if DEBUG:
            print debug_info('reconstructed_arcs'), self.vertex
        self.reaction_lines = []
        self.resolve_biosystem_net(self.vertex)
        if DEBUG:
            print debug_info('BioNetwork_lines'), self.reaction_lines
        self.reaction_lines_hash = hash_list(self.reaction_lines)
        if DEBUG:
            print debug_info('BioNetwork_lines_hash'), self.reaction_lines_hash
        self.network_hash = hash(dump_ord(sorted(self.reaction_lines_hash))) + biosystem['system_parameter']['time']
        if DEBUG:
            print debug_info('BioNetwork_hash'), self.network_hash

    @staticmethod
    def reconstruct_arcs(biosystem):
        """
        Change the shape of the data of the connection of the net
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
        This function will change the graph into reaction lines
        """
        for item in vertex:
            if len(item['in']) == 0:
                self._resolve_biosystem_net_recurrent(vertex, vertex.index(item), [])


def biosystem_cache(biosystem):
    """
    Try to cache a biosystem. If not found, return None.
    """
    if not os.path.exists("../cache"):
        os.mkdir("../cache")
    network_hash = BioSystemNetwork(biosystem).network_hash
    f_name = '../cache/%d.json' % network_hash
    if os.path.exists(f_name):
        fp = open(f_name, 'r')
        data = fp.read()
        fp.close()
        return json.loads(data)
    else:
        return None


def biosystem_update_cache(biosystem, record):
    """
    This function will check and update the biosystem
    :param record - The record of simulation  :
    """
    # Auto cache size control.
    if not os.path.exists("../cache"):
        os.mkdir("../cache")
    # There may be IO-async Error, rare but once happened
    try:
        cache_files = os.listdir('../cache')
        dir_size = sum(map(os.path.getsize, cache_files))
        cache_files_size = map(os.path.getsize, cache_files)
        sdict = dict([[cache_files[i], cache_files_size[i]] for i in range(len(cache_files))])
        if DEBUG:
            print debug_info('size of cache'), dir_size
        cache_files.sort(cache_files, key=lambda x:sdict[x])
        while dir_size > 100 * 1000 * 1000:
            os.remove(cache_files[0])
            del cache_files[0]
    except OSError:
        pass
    # our algorithm
    network_hash = BioSystemNetwork(biosystem).network_hash
    f_name = '../cache/%d.json' % network_hash
    if not os.path.exists(f_name):
        fp = open(f_name, 'w+')
        json.dump(record, fp)
        fp.close()


def compare_biosystem(biosystem1, biosystem2):
    """
    Compare two biosystem. If same return True otherwise False
    """
    if biosystem1['system_parameter']['time'] != biosystem2['system_parameter']['time']:
        return False
    list1, list2 = map(hash_gates_and_simulation, (biosystem1, biosystem2))
    if DEBUG:
        print debug_info(), list1, list2
    if sorted(list1) != sorted(list2):
        return False
    net1, net2 = map(BioSystemNetwork, (biosystem1, biosystem2))
    return sorted(net1.reaction_lines_hash) == sorted(net2.reaction_lines_hash)
