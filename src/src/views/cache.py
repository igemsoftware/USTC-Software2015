"""
This file provide data cache for frontend and backend to communicate

"""

__author__ = 'zsy95_000'
from django.http import HttpResponse
import json

# Global data
data = {}

data_uuid = {}


def cache(request, pkgname, key):
    """
    Cache data
    :param request: r'^cache/(?P<pkgname>.*)/(?P<key>.*)'
    :param pkgname:
    :param key:
    :return:
    """
    pkgdata = data.setdefault(pkgname, {})
    content = request.GET.get(key)
    if content:
        pkgdata[key] = content
        return HttpResponse('Done')
    else:
        return HttpResponse(str(pkgdata.get(key)))


def cache_dict(request, pkgname):
    """
    Get/Set dictionary with json
    :param request: r'^cache_dict/(?P<pkgname>.*)/'
    :param pkgname: Package name
    :return:
    """
    pkgdata = data.setdefault(pkgname, {})
    content = request.GET.get('data')
    if content:
        data[pkgname] = json.loads(content)
        return HttpResponse('Done')
    else:
        return HttpResponse(json.dumps(pkgdata))
