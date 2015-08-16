__author__ = 'zsy95_000'
import numpy

size = 1001

comb = numpy.zeros((size, size))
for i in xrange(size):
    comb[i, 0] = 1
    comb[i, i] = 1
    for j in xrange(1, i):
        comb[i, j] = comb[i - 1, j - 1] + comb[i - 1, j]


def itemfreq(temp):
    if len(temp) == 0:
        return numpy.array([])
    else:
        items, inv = numpy.unique(temp, return_inverse=True)
        freq = numpy.bincount(inv)
        return numpy.array([items, freq]).T
