__author__ = 'zsy95_000'

import os
import os.path
from os.path import isfile, exists, join
import json
from iGEM.common import path_sbin
from iGEM.controls import recv
from iGEM.models.settings import sbin


def package_exist(pkgname):
    """
    :param pkgname: Name of the package
    :return: Whether a package exists or not
    """
    return exists(path_sbin(pkgname + ".json"))


def package_info(pkgname):
    """
    :param pkgname: Name of the package
    :return: Information of a package. It was saved when being installed.
    """
    return recv.json_local(path_sbin(pkgname + ".json"))


def package_list():
    """
    Return the list of packages with json-format-text
    :param request: /pkglist
    :return: The list of packages with json-format-text
    """
    pkglist = []
    for fn in os.listdir(sbin):
        if isfile(join(sbin, fn)) and fn.endswith('.json'):
            yield fn.replace('.json', '')
