__author__ = 'zsy95_000'
import os
import tempfile
import zipfile
from django.core.servers.basehttp import FileWrapper
from django.shortcuts import render_to_response
from django.http import HttpResponse
from datetime import datetime


def hello(request):
    str1 = ""
    for i in range(100):
        str1 += "<button onclick=\"alert('Yes.');\">USTC</button>\n"
    return HttpResponse(str1+"Hello world")


def current_datetime(request):
    current_date = datetime.datetime.now()
    return render_to_response('current_datetime.html', locals())