__author__ = 'zsy95_000'

import os
import json as jso
from django.http import HttpResponse
from django.core.servers.basehttp import FileWrapper

def warp(path, content_type='application/octet-stream'):
    """
    Provider download for a large file
    :param path: The path of the local file
    :return: Download response
    """
    wrapper = FileWrapper(open(path, "rb"))  # YOU SHOULD NEVER USE file(filename)
    # make response with warpper
    response = HttpResponse(wrapper, content_type)
    # add some information
    response['Content-Disposition'] = 'attachment; filename=%s' % os.path.basename(path)
    # size of content
    response['Content-Length'] = os.path.getsize(path)
    return response


def text(path):
    """
    Provider download for a large file
    :param path: The path of the local file
    :return: Download response
    """
    with open(path, "rb") as f:
        data = f.read()
    return HttpResponse(data)


def json(data):
    """
    Send object as json
    :param data: The data to be converted to json
    :return: json-text
    """
    return HttpResponse(jso.dumps(data))
