__author__ = 'suquark'
from time import clock
sws = {}
def sw_alloc(st):
    t = clock()
    sws[st] = [t, t - t]

def sw_start(st):
    sws[st][0] = clock()

def sw_accmu(st):
    sws[st][1] += clock() - sws[st][0]

def sw_print(st):
    print "Timer <%s>: %ss" % (st, str(sws[st][1]))

