__author__ = 'zsy95_000'
import numpy

comb = numpy.zeros((1000, 1000))
for i in xrange(1000):
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
