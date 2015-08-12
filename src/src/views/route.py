"""
This module provide universal interfaces for frontend and backend

"""

__author__ = 'zsy95_000'

from uuid import uuid4
import os
from os import path
from os.path import exists
import importlib
from src.common import path_sbin
from src.controls import send
from src.models.settings import sbin, hostURL

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Template, Context


def route_path_sbin(pkgname, subpath):
    """
    Return the path by package name.
    WARNING: The path is with the format of local system
    :param request: Request like /route/package_name/folder/.../filename
    :return: path with package name
    """
    return path_sbin(os.path.join(pkgname, subpath))


def route_content(request, pkgname, subpath):
    """
    Return the package as download response.
    If not found, you'll get a null file
    :param request:
    :param pkgname:
    :param subpath:
    :return:Download content
    """

    full_path = route_path_sbin(pkgname, subpath)
    return send.warp(full_path) if exists(full_path) else HttpResponse("", content_type='application/octet-stream')


def render_to_response_local(path, args):
    """
    Render local template file
    :param path: File path
    :param args: Parameters
    :return: Rendered HttpResponse
    """
    with open(path) as f:
        data = f.read()
    return HttpResponse(Template(data).render(Context(args)))


def route_page(request, pkgname, subpath, params={}):
    """
    Render a page with get/post parameters
    If content_path is empty, set index.html as default
    Make page unique with GUID, {{uuid}} targeted.
    :param request: Request like r'^page/(?P<pkgname>.*)/(?P<subpath>.*)'
    :param content_path: The content under the
    :param params: The dictionary contains route data.
    :return: The page
    """
    full_path = route_path_sbin(pkgname, subpath)
    params.update(request.GET.__dict__)
    params.update(request.POST)
    params['uuid'] = uuid4()
    params['host'] = hostURL
    if subpath == "":
        full_path = path.join(full_path, "index.html")
        return render_to_response_local(full_path, params) \
            if exists(full_path) \
            else HttpResponse("This package do not have a main page")
    else:
        return render_to_response_local(full_path, params) \
            if exists(full_path) \
            else HttpResponse("Page not found: " + full_path)


def reg(request, pkgname):
    """
    Load the specified package
    * means all.
    :param request:
    :param pkgname: Name
    :return:
    """
    if pkgname == "*":
        register_all()
    else:
        register(pkgname)
    return HttpResponse("Done.")


def register_all():
    """
    Start init all packages.
    NOTE : Cannot be used in __init__
    :param pkgname: package name
    :return: None
    """
    map(register, [i for i in os.listdir(sbin) if path.isdir(path.join(sbin, i))])


def register(pkgname):
    """
    Start init a package.
    NOTE : Cannot be used in __init__
    :param pkgname: package name
    :return: None
    """
    fn = path.join(sbin, pkgname, "__init__.py")
    if exists(fn):
        __import__(pkgname)
