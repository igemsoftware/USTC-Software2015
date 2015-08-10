#!/usr/bin/env python3

__author__ = 'E-Neo <e-neo@qq.com>'

# Maybe pyeda is better in the future, but pyeda contains some
# bugs by far(0.28.0). Espresso Algorithm is better than Q-M
# Algorithm
import qm
import networkx as nx

def string2truthtable(string):
    '''convert string to truthtable'''
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
    '''convert string to Boolean expression'''
    f_tt = string2truthtable(string)
    return qm.qm(f_tt[0], f_tt[1], f_tt[2])

def get_gate_not(expr):
    '''get the index of not gates'''
    not_list = []
    for i in range(len(expr)):
        for j in expr:
            if j[i] == '0':
                not_list.append(i)
                break
    return not_list

def get_node_num(expr):
    '''get the number of nodes
    return a tuple: (var_num, not_num, and_num, or_num)'''
    var_num = len(expr[0])
    not_num = len(get_gate_not(expr))
    and_num = 0
    for i in expr:
        and_num += len(i.replace('X', '')) - 1
    or_num = len(expr) - 1
    return var_num, not_num, and_num, or_num

def create_circuit(expr):
    '''create a logic circuit from a Boolean expression
    return a networkx.DiGraph'''
    circuit = nx.DiGraph()
    not_list = get_gate_not(expr)
    edges = []
    andx = 0
    for i in not_list:
        edges.append(('v%d' % i, 'not%d' %i))
    for i in expr:
        for j in range(len(i)):
            if i[j] == '1':
                edges.append(('v%d' % j, 'and%d' % andx))
            elif i[j] == '0':
                edges.append(('not%d' % j, 'and%d' % andx))
            else:
                pass
        andx += 1
    for i in range(andx):
        edges.append(('and%d' % i, 'or'))
    edges.append(('or', 'out'))
    circuit.add_edges_from(edges)
    return circuit
