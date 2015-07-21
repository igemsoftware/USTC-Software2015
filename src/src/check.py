# -*- coding: utf-8 -*-
"""
Created on Mon Jul 20 11:04:55 2015

@author: run
"""

class ArcError(StandardError):
    pass

class OptionError(StandardError):
    pass

class SubstanceError(StandardError):
    pass

class Graph(object):
   
    def __init__(self,*args,**kwargs):
        self.node_neighbors = {}
        self.visited = {}

    def add_nodes(self,nodelist):

        for node in nodelist:
            self.add_node(node)

    def add_node(self,node):
        if not node in self.nodes():
            self.node_neighbors[node] = []

    def add_edge(self,edge):
        u,v = edge
        if(v not in self.node_neighbors[u]) and ( u not in self.node_neighbors[v]):
            self.node_neighbors[u].append(v)

            if(u!=v):
                self.node_neighbors[v].append(u)

    def nodes(self):
        return self.node_neighbors.keys()

    def breadth_first_check(self,root=None):
        queue = []
        order = []
        def bfs():
            Status=True
            while len(queue)> 0:
                node  = queue.pop(0)

                self.visited[node] = True
                for n in self.node_neighbors[node]:
                    if (not n in self.visited) and (not n in queue):
                        queue.append(n)
                        order.append(n)
                        for i in n['input']:
                            if not i in node['output']:
                                raise OptionError('OptionError: %s -> %s' % (node, n))
                                Status=False
            return Status
                                
        if root:
            queue.append(root)
            order.append(root)
            Status=bfs()

        for node in self.nodes():
            if not node in self.visited:
                queue.append(node)
                order.append(node)
                bfs()
        return Status

def walk(Graph, s, S=set()):
    P, Q = dict(), set()
    P[s] = None
    Q.add(s)
    while Q:
        u = Q.pop()
        for v in Graph[u].difference(P, S):
            Q.add(v)
            P[v] = u
    return P
     
def components(Graph):
    comp = []
    seen = set() 
    for u in Graph:
        if u in seen: continue
        C = walk(Graph, u)
        seen.update(C)
        comp.append(C)
    return comp

def checkarcs(Graph):
    Status=True
    
    for a in Graph.arc:
        if (a.keys()[1] in a.keys()[0]['output']) and (a.values()[1] in a.values()[0]['output']):
            Status=False
            raise ArcError('ArcError!(O2O): %s -> %s' % (a.keys()[1], a.values()[1]))
        if (a.keys()[1] in a.keys()[0]['input']) and (a.values()[1] in a.values()[0]['input']):
            Status=False            
            raise ArcError('ArcError!(I2I): %s -> %s' % (a.keys()[1], a.values()[1]))
        if (a.keys()[1] in a.keys()[0]['input']) and (a.values()[1] in a.values()[0]['output']):
            Status=False            
            raise ArcError('ArcError!(I2O): %s -> %s' % (a.keys()[1], a.values()[1]))
            
    for comp in components(Graph):
        if reduce(lambda x,y: x==y, map(lambda x:x.substance, comp)):
            raise SubstanceError('SubstanceError!: %s' % comp)
            Status=False
    
    return Status
    
def checkoptions(Graph, root=None):
    Status=True
    
    Status=Graph.breadth_first_check(root)
    
    return Status
