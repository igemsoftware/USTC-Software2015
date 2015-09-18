__author__ = 'suquark'
from time import clock
sws = {}
def sw_alloc(st):
    """
    Register a stopwotch
    """
    t = clock()
    sws[st] = [t, t - t]

def sw_start(st):
    """
    Start a stopwotch
    """
    sws[st][0] = clock()

def sw_accmu(st):
    """
    Accumulate the timespan
    """
    sws[st][1] += clock() - sws[st][0]

def sw_print(st):
    """
    Show result
    """
    print "Timer <%s>: %ss" % (st, str(sws[st][1]))

