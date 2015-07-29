__author__ = 'zsy95_000'
"""
    This file provides common utils
"""
import os
import datetime
from models.settings import sbin, source


def osformat(path):
    return path.replace('\\', os.sep).replace('/', os.sep)


def path_link(parent, child):
    return osformat(parent + os.sep + child)


def path_sbin(filename):
    return path_link(sbin, filename)


def path_source(filename):
    return source + "/" + filename


def normal_date(datestr):
    """
    For package. Get the updatetime as datetime
    :param datestr: The string in the package info ("YYYY-MM-DD")
    :return: datetime
    """
    return datetime.datetime.strptime(datestr, "%Y-%m-%d")


def url_remove_header(url):
    """
    Convert /node/pkg/... to pkg/...
    :param url:
    :return:
    """
    return "/".join(url.split("/")[2:])

