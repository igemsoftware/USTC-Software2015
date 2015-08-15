#!/usr/bin/env python

__author__ = 'E-Neo <e-neo@qq.com>'

d_gate = {'not': {'NOT0': (0, 3, 0, 1),
                  'NOT1': (1, 2, 1, 0),
                  'NOT2': (1, 1, 1, 0),
                  'NOT3': (1, 0, 2, 0),
                  'NOT4': (3, 0, 0, 0),
                  'NOT5': (2, 0, 0, 1),
                  'NOT6': (1, 0, 0, 1),
                  'NOT7': (0, 1, 0, 2)},
          'and': {'AND0': (0, 0, 2, 0),
                  'AND1': (3, 0, 0, 0),
                  'AND2': (2, 0, 0, 0)},
          'or' : {'OR0' : (2, 0, 0, 0)}}