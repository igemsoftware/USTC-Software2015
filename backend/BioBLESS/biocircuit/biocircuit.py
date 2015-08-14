#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>'

# Maybe pyeda is better in the future, but pyeda contains some
# bugs by far(0.28.0). Espresso Algorithm is better than Q-M
# Algorithm
import qm
import numpy as np
import networkx as nx


def string2truthtable(string):
    """convert string to truthtable"""
    ones = []
    zeros = []
    dc = []
    for i in range(len(string)):
        if string[i] == '1':
            ones.append(i)
        elif string[i] == '0':
            zeros.append(i)
        else:
            dc.append(i)
    return ones, zeros, dc


def string2expr(string):
    """convert string to Boolean expression"""
    f_tt = string2truthtable(string)
    return qm.qm(f_tt[0], f_tt[1], f_tt[2])


def get_gate_not(expr):
    """get the index of not gates"""
    not_list = []
    for i in range(len(expr)):
        for j in expr:
            if j[i] == '0':
                not_list.append(i)
                break
    return not_list


def get_node_num(expr):
    """get the number of nodes
    return a tuple: (var_num, not_num, and_num, or_num)"""
    var_num = len(expr[0])
    not_num = len(get_gate_not(expr))
    and_num = 0
    for i in expr:
        and_num += len(i.replace('X', '')) - 1
    or_num = len(expr) - 1
    return var_num, not_num, and_num, or_num


def create_circuit(expr):
    """create a logic circuit from a Boolean expression
    return a networkx.DiGraph"""
    circuit = nx.DiGraph()
    not_list = get_gate_not(expr)
    edges = []
    node_num = get_node_num(expr)
    for i in not_list:
        edges.append(('v%d' % i, 'not%d' %i))
    or_input = []
    andx = 0
    for i in expr:
        and_input = []
        for j in range(node_num[0]):
            if i[j] == '0':
                and_input.append('not%d' % j)
            elif i[j] == '1':
                and_input.append('v%d' % j)
        while len(and_input) > 1:
            edges.append((and_input.pop(), 'and%d' % andx))
            edges.append((and_input.pop(), 'and%d' % andx))
            and_input.append('and%d' % andx)
            andx += 1
        else:
            or_input.append(and_input[0])
    orx = 0
    while len(or_input) > 1:
        edges.append((or_input.pop(), 'or%d' % orx))
        edges.append((or_input.pop(), 'or%d' % orx))
        or_input.append('or%d' % orx)
        orx += 1
    else:
        edges.append((or_input[0], 'out'))
    circuit.add_edges_from(edges)
    return circuit


def calc_score(l_gate, d_gate):
    """return a score"""
    para = np.array([0, 0, 0, 0])
    for i in l_gate:
        if i[0] == 'N':
            t = d_gate['not'][i]
        elif i[0] == 'A':
            t = d_gate['and'][i]
        elif i[0] == 'O':
            t = d_gate['or'][i]
        para += np.array(t)
    s = 2**(para[0]-1) + 2**(para[1]-1) + para[2] + para[3]
    return s


# d_gate = {'not': {'NOT0': (0, 3, 0, 1), 'NOT1': (1, 2, 1, 0), ...}, ...}
def circuit_score(G, d_gate):
    """return scores of the circuit"""
    n_gate = G.nodes()
    n_gate.pop(n_gate.index('out'))
    for i in n_gate:
        if i[0] == 'v':
            n_gate.pop(n_gate.index(i))
    bio_not = list(d_gate['not'].keys())
    bio_and = list(d_gate['and'].keys())
    bio_or  = list(d_gate['or'].keys())
    result = []
    if n_gate[0][0] == 'n':
        result = bio_not
    elif n_gate[0][0] == 'a':
        result = bio_and
    elif n_gate[0][0] == 'o':
        result = bio_or
    for n in range(1, len(n_gate)):
        if  n_gate[n][0] == 'n':
            result = [[i, j] for i in result for j in bio_not]
        elif n_gate[n][0] == 'a':
            result = [[i, j] for i in result for j in bio_and]
        elif n_gate[n][0] == 'o':
            result = [[i, j] for i in result for j in bio_or]
    flat = lambda L: sum(map(flat, L), []) if isinstance(L, list) else [L]
    gate = []
    for i in range(len(result)):
        result[i] = flat(result[i])
        score = calc_score(result[i], d_gate)
        gate.append({'score': score, 'gate': dict(zip(n_gate, result[i]))})
    return gate


def api_circuit(G, gate):
    l_node = G.nodes()
    l_node.pop(l_node.index('out'))
    no_such_list = []
    for i in l_node:
        if i[0] == 'v':
            no_such_list.append(l_node.pop(l_node.index(i)))
    graph = []
    l = [i for i in no_such_list]
    l.append('out')
    l.extend([i for i in l_node])
    for i in gate:
        arcs = []
        nodes = [i.replace('v', 'INPUT') for i in no_such_list]
        nodes.append('OUT')
        for j in range(len(l_node)):
            nodes.append(i['gate'][l_node[j]])
        for j in G.edges():
            arcs.append({'from': l.index(j[0]), 'to': l.index(j[1])})
        graph.append({'nodes': nodes, 'arcs': arcs, 'score': i['score']})
    return graph
