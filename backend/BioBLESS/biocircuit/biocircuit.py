#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>'

# Maybe pyeda is better in the future, but pyeda contains some
# bugs by far(0.28.0). Espresso Algorithm is better than Q-M
# Algorithm
import qm
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
            else:
                pass
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


# d_gate = ('not': {'NOT0': (0, 3, 0, 1), ...}, ...)
def circuit_score(G, d_gate):
    """return scores of the circuit"""
    gate = G.node()
    gate.pop(gate.index('out'))
    for i in gate:
        if i[0] == 'v':
            gate.pop(gate.index(i))

    return
