__author__ = 'zsy95_000'

import os.path
import sys
from os.path import exists
import json
from iGEM.common import path_sbin, url_remove_header, osformat
from iGEM.controls import send, route
from iGEM.models.settings import sbin
from django.http import HttpResponse


def redirect(request):
    """
    The package name will be replace by a table(by inherit)
    :param request: Request like /route/package_name/folder/.../filename
    :return: The redirected string (with package name)
    """
    org_path = url_remove_header(request.path)
    pkgname = org_path.split("/")[0]
    route_data = route.open_route()
    return osformat(route_data[pkgname] + "/" + "/".join(org_path.split("/")[1:]))


def route_path(request):
    """
    Return the path by package name.
    WARNING: The path is with the format of local system
    :param request: Request like /route/package_name/folder/.../filename
    :return: path with package name
    """
    return path_sbin(redirect(request))


def route_content(request):
    """
    Return the package as download response.
    If not found, you'll get a null file
    :param request: Request like /route/package_name/folder/.../filename
    :return: Download content
    """
    full_path = route_path(request).replace("/route/", "")
    return send.warp(full_path) if exists(full_path) else HttpResponse("", content_type='application/octet-stream')


def route_text(request):
    """
    Return the package as text response
    If not found, you'll get an empty page.
    :param request: Request like /route/package_name/folder/.../filename
    :return: Download text
    """
    full_path = route_path(request)
    return send.text(full_path) if exists(full_path) else HttpResponse("Page not found: " + full_path)


def route_page(request, pkgname, content_path):
    """
    If content_path is empty, set index.html as default
    :param request: Request like /page/package_name[/folder/.../filename]
    :param content_path: The content under the
    :return: The page
    """
    # Ahhhhhhhhhhhhhhh!!!
    if content_path == "":
        full_path = os.path.join(route_path(request), "index.html")
        return send.text(full_path) if exists(full_path) else HttpResponse("This package do not have a main page")
    else:
        return route_text(request)


def register(pkgname):
    """
    Start init.
    :param pkgname:
    :return:
    """
    fn = os.path.join(sbin, pkgname, "__init__.py")
    if exists(fn):
        __import__(pkgname)
