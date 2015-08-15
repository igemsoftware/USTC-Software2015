__author__ = 'zsy95_000'

import datetime
import numpy

print 'Create array'
t = datetime.datetime.now()
arr2 = range(10000000)
print str(datetime.datetime.now() - t)


t = datetime.datetime.now()
print 'Lambda: Data length ', len(map(lambda x: x * 2.8, arr2))
print str(datetime.datetime.now() - t)


t = datetime.datetime.now()
print 'List Expression: Data length ', len([x * 2.8 for x in arr2])
print str(datetime.datetime.now() - t)


print 'Create narray...'
t = datetime.datetime.now()
arr3 = numpy.array(arr2)
print str(datetime.datetime.now() - t)


t = datetime.datetime.now()
print 'Numpy array: Data length ', len(arr3 * 2.8)
print str(datetime.datetime.now() - t)
