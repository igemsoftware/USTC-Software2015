__author__ = 'zsy95_000'

import os
import urllib
import urllib2

import tempfile
import zipfile
import shutil
import json
import datetime
from iGEM.common import osformat, path_sbin, normal_date
from iGEM.models.settings import source, sbin
from iGEM.views import pkglocal, route

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf.urls import include, url

def api(request):
    """
    :param pkgname:
    :return:
    """

    for pkgname in pkglocal.package_list():
        route.register(pkgname)
    # from iGEM.urls import urlpatterns
    # urlpatterns.append(url(r'^api2/$', api2))
    return HttpResponse("")

