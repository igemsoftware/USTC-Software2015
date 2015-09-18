__author__ = 'suquark'
import json


def dump_ord(obj):
    """
    Dump the object with order
    """
    return json.dumps(obj, sort_keys=True, separators=(',', ':'))


def hash_dict(dict_to_hash):
    """
    Hash a dict into a hash
    """
    return hash(dump_ord(dict_to_hash))


def hash_list(list_to_hash):
    """
    Hash a list into a list of hash
    """
    return map(hash_dict, list_to_hash)


def hash_string_list(strlist):
    """
        Helper function. Convert a list of string into a list of hash numbers,
    then it will be much easier to do the following works.
        The possibility that it causes a collision problem can be safely ignored,
    for our data is relatively small.

    :param strlist The list of string:
    :return List of hash:
    """
    return map(hash, strlist)
