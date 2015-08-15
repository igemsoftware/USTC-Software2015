#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>'

import numpy as np
import networkx as nx


def matrix2array(m):
    a = eval('[' + m.replace('{', '[').replace('}', '],') + ']')
    limit1 = 3
    limit2 = 2
    for i in range(len(a)):
        for j in range(len(a[0])):
            if a[i][j] and i and j and i != len(a) - 1 and j != len(a[0]) - 1 and a[i-1][j] + a[i][j-1] + a[i+1][j] + a[i][j+1] < limit1 and a[i-1][j-1] + a[i-1][j+1] + a[i+1][j-1] + a[i+1][j+1] < limit2:
                a[i][j] = 0
    for i in range(len(a)):
        for j in range(len(a[0])):
            if a[i][j] and i and j and i != len(a) - 1 and j != len(a[0]) - 1 and a[i-1][j] + a[i][j-1] + a[i+1][j] + a[i][j+1] < limit1 and a[i-1][j-1] + a[i-1][j+1] + a[i+1][j-1] + a[i+1][j+1] < limit2:
                a[i][j] = 0
    a = np.array(a)
    return a


def array2graph(a):
    """convert an array to a graph
    not a adjacency matrix"""
    G = nx.Graph()
    for i in range(len(a) - 1):
        for j in range(len(a[0]) - 1):
            if a[i][j] == 1:
                G.add_node((i, j))
                if a[i+1][j] == 1:
                    G.add_edge((i, j), (i + 1, j))
                if a[i, j+1] == 1:
                    G.add_edge((i, j), (i, j + 1))
    for i in range(len(a) - 1):
        if a[i][-1] == 1:
            G.add_node((i, len(a[0]) - 1))
            if a[i+1][-1] == 1:
                G.add_edge((i, len(a[0]) - 1), (i + 1, len(a[0]) - 1))
    for j in range(len(a[0]) - 1):
        if a[-1][j] == 1:
            G.add_node((len(a) - 1, j))
            if a[-1][j+1] == 1:
                G.add_edge((len(a) - 1, j), ((len(a) - 1), j + 1))
    if a[-1][-1] == 1:
        G.add_node((len(a) - 1, (len(a[0]) - 1)))
    return G


def point2line(G, t):
    """return a list as a line"""
    H = nx.dfs_tree(G, t)
    return H.nodes()


def line_distance(l1, l2):
    """return the distence between two lines"""
    d_min = np.linalg.norm(np.array(l1[0]) - np.array(l2[0]))
    for i in l1:
        for j in l2:
            d = np.linalg.norm(np.array(i) - np.array(j))
            if d < d_min:
                d_min = d
    return d_min
