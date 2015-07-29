__author__ = 'zsy95_000'

"""
    This file provides common utils
"""
import os
from models.source import source

def osformat(path):
    """
    :param path: origin path
    :return: A well-formatted path (there may be better ways...)
    """
    return path.replace('\\', os.sep).replace('/', os.sep)


def path_link(parent, child):
    """
    Link the path
    :param parent:
    :param child:
    :return:
    """
    return osformat(parent + os.sep + child)


def path_source(filename):
    """
    Get local source
    :param filename:
    :return:
    """
    return path_link(source, filename)


def url_remove_header(url):
    """
    Convert /node/pkg/... to pkg/...
    :param url:
    :return:
    """
    return "/".join(url.split("/")[2:])