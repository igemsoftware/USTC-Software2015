__author__ = 'zsy95_000'

import os
from os.path import exists
import urllib
import urllib2
import tempfile
import zipfile
import shutil
import json
import datetime
from iGEM.common import osformat, path_sbin, normal_date, url_remove_header
import iGEM.models.settings
from iGEM.models.settings import source, sbin, host
from iGEM.views import pkglocal, route as vroute
from iGEM.controls import recv
from iGEM.controls.route import open_route, write_route
from django.http import HttpResponse
from django.shortcuts import render_to_response


def get_quest_package(pkgname):
    """
    :param pkgname: Name of the package
    :return: List or dict
    """
    return recv.json(source + "/pkginfo/" + pkgname)


def quest_package(request, pkgname):
    """
    :param request: request from /pkgquest/
    :return: A webpage about the package
    """
    if pkgname == "":
        pkgnames = recv.json(source + "/pkglist")
        pkginstall = host + "/pkgquest"
        return render_to_response("all_packages.html", locals())
    else:
        # Get page of package info.
        return render_to_response("pkginfo.html", get_quest_package(pkgname))


def receive_file(pkgname):
    """
    it download target file from the source and then release it
    :param pkgname: The name of the package
    :return: none
    """
    pkg_path = osformat(sbin + "/" + pkgname)
    tempfile = pkg_path + '.zip'
    urllib.urlretrieve(source + "/packages/" + pkgname, tempfile)
    """
    f = urllib2.urlopen(source + "/packages/" + pkgname)
    data = f.read()
    f.close()
    with open(tempfile, "wb") as code:
        code.write(data)
    """
    # need to remove it first
    if exists(pkg_path):
        shutil.rmtree(pkg_path)
    # extra the package
    with zipfile.ZipFile(tempfile, 'r') as file_zip:
        file_zip.extractall(osformat(sbin + "/"))
    # remove tempfile
    os.remove(tempfile)


def install_by_name(pkgname):
    """
    Install by package name. Recursion function.
    :param pkgname: Package name
    :return: None
    """
    # Get package info from web
    pkgdata = get_quest_package(pkgname)
    # Have installed it?
    if pkglocal.package_exist(pkgname):
        # Get package info from local
        localdata = pkglocal.package_info(pkgname)
        # If we have got a older version, then replace it
        if normal_date(localdata["updatetime"]) >= normal_date(pkgdata["updatetime"]):
            return
    # NOTICE : Since the package works well with its dependencies,
    # we do not need to update dependencies.
    for dpkg in pkgdata["dependency"]:
        install_by_name(dpkg)
    with open(path_sbin(pkgname + ".json"), "w") as f:
        json.dump(pkgdata, f)
    receive_file(pkgname)
    vroute.register(pkgname)


# TODO: Add package_info-not-exist error handler
def install(request, pkgname):
    """
    :param request: request from /pkginst/
    :return:
    """
    install_by_name(pkgname)
    # Deal with routines
    pkgdata = get_quest_package(pkgname)

    # NOTE: Set routines, a database maybe better, but json is much readable.
    route_data = open_route()
    route_data[pkgdata['name']] = pkgdata['name']
    for dep in pkgdata['inherit']:
        route_data[dep] = pkgdata['name']
    write_route(route_data)

    # TODO: User-friendly page.
    host = iGEM.models.settings.host
    return render_to_response("package_install_done.html", locals())
