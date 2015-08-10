__author__ = 'zsy95_000'

"""

WARNING : do not import json from this file, it may be confused with lib 'json'
"""

import urllib2
import json as jso


def json(url):
    f = urllib2.urlopen(url)
    data = f.read()
    f.close()
    return jso.loads(data)


def json_local(path):
    with open(path) as f:
        data = jso.load(f)
    return data
