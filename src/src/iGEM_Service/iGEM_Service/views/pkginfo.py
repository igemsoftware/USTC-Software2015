__author__ = 'zsy95_000'

import os
from django.http import HttpResponse
from django.shortcuts import render_to_response
from iGEM_Service.common import osformat, path_source
from iGEM_Service.models.source import source

"""
    This file is used to allow user to get package-info
    from the source provider

    # NOTICE: Since request contains /pkginfo/, (then) source only
"""


def get_pkginfo(request):
    """
    :param request: request routine
    :return: data or error
    """
    filename = osformat(source + request.path.replace("/pkginfo/", "/packages/")) + ".json"
    if not os.path.exists(filename):
        # TODO: A better template
        return render_to_response('no_package.html', {'pkg': request.path.replace("/pkginfo/", "")})
    f = open(filename, 'rb')
    data = f.read()
    f.close()
    return HttpResponse(data)
