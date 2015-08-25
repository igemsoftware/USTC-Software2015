"""Functions to create circuit and calculate scores.

There are 4 most useful functions: string2expr(), create_circuit(),
circuit_score(), api_circuit()

Examples
--------
Create some biocircuits and calculate their scores

>>> expr = string2expr('10110101')
>>> circuit = create_circuit(expr)
>>> import biocircuit.biogate as gate
>>> scores = circuit_score(circuit, gate.d_gate)
>>> api_for_front = api_circuit(circuit, scores)
"""
__author__ = 'E-Neo <e-neo@qq.com>'

# Maybe pyeda is better in the future, but pyeda contains some
# bugs by far(0.28.0). Espresso Algorithm is better than Q-M
# Algorithm
import BioBLESS.biocircuit.qm

import numpy as np
import networkx as nx
import simplejson


def string2truthtable(string):
    """Convert string to truthtable which qm can recognize.

    Parameters
    ----------
    string : string
        A string of zeros and ones representing a truthtable.

    Returns
    -------
    ones : list
        Iterable of integer minterms.

    zeros : list
        Iterable of integer maxterms.

    dc : list
        Iterable of integers specifying don't-care terms

    Examples
    --------
    A truthtable:
    |---+---+---+-----|------+-------+----|
    | A | B | C | out | ones | zeros | dc |
    |---+---+---+-----|------+-------+----|
    | 0 | 0 | 0 |  1  |  0   |       |    |
    | 0 | 0 | 1 |  0  |      |   1   |    |
    | 0 | 1 | 0 |  1  |  2   |       |    |
    | 0 | 1 | 1 |  1  |  3   |       |    |
    | 1 | 0 | 0 |  0  |      |   4   |    |
    | 1 | 0 | 1 |  1  |  5   |       |    |
    | 1 | 1 | 0 |  0  |      |   6   |    |
    | 1 | 1 | 1 |  -  |      |       | 7  |
    |---+---+---+-----|------+-------+----|
    string = '1011010-'
    ones = [0, 2, 3, 5]
    zeros = [1, 4, 6]
    dc = [7]
    """
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
    """Compute minimal two-level sum-of-products form.

    Parameters
    ----------
    string : string
        A string of zeros and ones representing a truthtable.

    Returns
    -------
    expr : list
        Minimal two-level SOP form.
    """
    f_tt = string2truthtable(string)
    expr = BioBLESS.biocircuit.qm.qm(f_tt[0], f_tt[1], f_tt[2])
    return expr


def get_gate_not(expr):
    """Get the index of not gates.

    Parameters
    ----------
    expr : list
        Minimal two-level SOP form.

    Returns
    -------
    not_list : list
        Index of the not gates in the Boolean expression.
    """
    not_list = []
    for i in range(len(expr[0])):
        for j in expr:
            if j[i] == '0':
                not_list.append(i)
                break
    return not_list


def get_node_num(expr):
    """Get the number of nodes.

    Parameters
    ----------
    expr : list
        Minimal two-level SOP form.

    Returns
    -------
    var_num : int
        Number of input variables.

    not_num : int
        Number of not gates.

    and_num : int
        Number of and gates.

    or_num : int
        Number of or gates.
    """
    var_num = len(expr[0])
    not_num = len(get_gate_not(expr))
    and_num = 0
    for i in expr:
        and_num += len(i.replace('X', '')) - 1
    or_num = len(expr) - 1
    return var_num, not_num, and_num, or_num


def create_circuit(expr):
    """Create a logic circuit from a Boolean expression.

    Parameters
    ----------
    expr : list
        Minimal two-level SOP form.

    Returns
    -------
    circuit : DiGraph
        inputs: v1, v2, v3, ...
        not: not0, not1, ...
        and: and0, and1, ...
        or: or0, or1, ...
        output: out
    """
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
        or_input.append(and_input[0])
    orx = 0
    while len(or_input) > 1:
        edges.append((or_input.pop(), 'or%d' % orx))
        edges.append((or_input.pop(), 'or%d' % orx))
        or_input.append('or%d' % orx)
        orx += 1
    edges.append((or_input[0], 'out'))
    circuit.add_edges_from(edges)
    return circuit


def calc_score(l_gate, d_gate):
    """Return a score.

    Parameters
    ----------
    l_gate : list
        A list of the nodes of the biocircuit.

    d_gate : dict
        A dict of biogates and their 4 parameters. It should be
        stored in the file biogate.py. It looks like:
        {'not': {'NOT0': (0, 3, 0, 1), 'NOT1': (1, 2, 1, 0), ...}, ...}

    Returns
    -------
    score : float
        The score of the biocircuit.
    """
    para = np.array([0, 0, 0, 0])
    tmp = (0, 0, 0, 0)
    for i in l_gate:
        if i[0] == 'N':
            tmp = d_gate['not'][i]
        elif i[0] == 'A':
            tmp = d_gate['and'][i]
        elif i[0] == 'O':
            tmp = d_gate['or'][i]
        para += np.array(tmp)
    score = 2**(para[0]-1) + 2**(para[1]-1) + para[2] + para[3]
    return score


def circuit_score(circuit, d_gate):
    """Return scores of the circuit.

    Parameters
    ----------
    circuit : DiGraph
        inputs: v1, v2, v3, ...
        not: not0, not1, ...
        and: and0, and1, ...
        or: or0, or1, ...
        output: out

    d_gate : dict
        A dict of biogates and their 4 parameters. It should be
        stored in the file biogate.py.

    Returns
    -------
    gate : list
        It looks like:
        [{'score': 2.5, 'gate': {'not0': 'NOT1', ...}}, ...]
    """
    n_gate = circuit.nodes()
    n_gate.remove('out')
    tmp = []
    for i in n_gate:
        if i[0] == 'v':
            tmp.append(i)
    for i in tmp:
        n_gate.remove(i)
    result = []
    if len(n_gate) == 1:
        if n_gate[0][0] == 'n':
            result = [[i] for i in d_gate['not'].keys()]
        elif n_gate[0][0] == 'a':
            result = [[i] for i in d_gate['and'].keys()]
        elif n_gate[0][0] == 'o':
            result = [[i] for i in d_gate['or'].keys()]
    else:
        result.append(['NOT0' if i[0] == 'n' else 'OR1' if i[0] == 'o' else 'AND2' for i in n_gate])
        result.append(['NOT3' if i[0] == 'n' else 'OR0' if i[0] == 'o' else 'AND4' for i in n_gate])
        result.append(['NOT6' if i[0] == 'n' else 'OR0' if i[0] == 'o' else 'AND0' for i in n_gate])
    gate = []
    for i in range(len(result)):
        score = calc_score(result[i], d_gate)
        gate.append({'score': score, 'gate': dict(zip(n_gate, result[i]))})
    return gate


def api_circuit(circuit, gate):
    """API for front.

    Parameters
    ----------
    circuit : graph
        inputs: v1, v2, v3, ...
        not: not0, not1, ...
        and: and0, and1, ...
        or: or0, or1, ...
        output: out

    gate : list
        It looks like:
        [{'score': 2.5, 'gate': {'not0': 'NOT1', ...}}, ...]

    Returns
    -------
    graph : list
        A list of dicts, each dicts looks like:
        {'nodes': [], 'arcs': {'from': 0, 'to': 1}, 'score': 2.5}
    """
    l_node = circuit.nodes()
    edges = [i for i in circuit.edges() if i[1] != 'out']
    l_node.pop(l_node.index('out'))
    no_such_list = []
    for i in l_node:
        if i[0] == 'v':
            no_such_list.append(i)
    for i in no_such_list:
        l_node.remove(i)
    graph = []
    l_dic = [i for i in no_such_list]
    l_dic.extend([i for i in l_node])
    for i in gate:
        arcs = []
        nodes = [x[0].replace('v', 'INPUT') for x in no_such_list]
        for j in range(len(l_node)):
            nodes.append(i['gate'][l_node[j]])
        for j in edges:
            arcs.append({'from': l_dic.index(j[0]), 'to': l_dic.index(j[1])})
        graph.append({'nodes': nodes, 'arcs': arcs, 'score': i['score']})
    graph = sorted(graph, key=lambda x: x['score'])
    if len(graph) > 10:
        tmp = []
        for i in range(0, len(graph), len(graph) // 10):
            tmp.append(graph[i])
        graph = tmp
    return graph


def get_score_from_front(d_json, d_gate):
    """Calculate score of circuit from front end.

    Parameters
    ----------
    d_json : dict
        dict include information of nodes and something else

    d_gate : dict
        A dict of biogates and their 4 parameters. It should be
        stored in the file biogate.py.

    Returns
    -------
    score : float
        The score of the biocircuit.
    """
    score = calc_score(d_json['nodes'], d_gate)
    return score


def garbage(graph, d_lizhi):
    """Add some parameters for simulation.

    Parameters
    ----------
    graph : list
        A list of dicts, each dicts looks like:
        {'nodes': [], 'arcs': {'from': 0, 'to': 1}, 'score': 2.5}

    d_lizhi : dict
        A dict converted from the json in devices.
        key: 'NOT0', ...

    Returns
    -------
    l_zh : list
        A list of dicts for simulation.
    """
    l_zh = []
    for i in graph:
        i['system_parameter'] = {'time': 100}
        i['simulation_parameters'] = []
        for j in i['nodes']:
            chain = len(d_lizhi[j]['parts']['id'])
            d_map = {}
            for k in d_lizhi[j]['map']:
                d_map[k['id']] = k['params']
            d_map['device_parameter'] = {'initial': [20 for x in range(chain)]}
            i['simulation_parameters'].append(d_map)
        l_zh.append(i)
    return l_zh
