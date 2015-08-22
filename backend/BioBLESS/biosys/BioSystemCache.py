__author__ = 'zsy95_000'

import json
from BioSystemSamples import biosystem_sample1

if __name__ == "__main__":
    # This shows True, for python will check the dict recurrently and ignore the order.
    dict1 = {"0": (3.1416, "0:T~1", {"0:T~2I0": 1, "b": 3.14}), "1": "c1"}
    dict2 = {"1": "c1", "0": (3.1416, "0:T~2", {"b": 3.14, "0:T~2I0": 1})}
    print dict1 == dict2
    # This shows False, for the order of items in the list are very important
    list1 = [1, 3]
    list2 = [3, 1]
    print list1 == list2
    # There never seems to be a hash. Nasty!
    print dict1.__hash__

    print json.dumps(biosystem_sample1)
    
    # Emm... So I only have to exchange something, right?

