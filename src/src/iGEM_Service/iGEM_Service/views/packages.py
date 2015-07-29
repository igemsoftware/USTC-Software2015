#!/usr/bin/python
# coding: utf-8

__author__ = 'zsy95_000'

'''
    This file is used to allow user to download zipped(.zip) packages
    from the source provider

    # NOTICE: Since request contains /packages/, (then) source only
'''


import os
from django.shortcuts import render_to_response
from iGEM_Service.common import osformat
from iGEM_Service.models.source import source
from iGEM_Service.controls import send


def package_list(request):
    """
    Return the list of packages with json-format-text
    :param request: /pkglist
    :return: The list of packages with json-format-text
    """
    pkglist = []
    for root, dir, fns in os.walk(osformat(source + '/packages')):
        for fn in fns:
            if fn.endswith('.json'):
                pkglist.append(fn.replace('.json', ''))
    return send.json(pkglist)


def send_file(request):
    """
    Send a file through Django without loading the whole file into
    memory at once. The FileWrapper will turn the file object into an
    iterator for chunks of 8KB.
    Very fast in test.
    """
    filename = osformat(source + request.path) + ".zip"  # Select your file here. Damn it! Windows uses '\'
    if not os.path.exists(filename):
        # TODO: A better template
        return render_to_response('no_package.html', {'pkg': request.path.replace("/packages/", "")})
    return send.warp(filename)
