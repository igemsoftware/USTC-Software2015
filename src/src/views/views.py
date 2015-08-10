__author__ = 'zsy95_000, ctyi'

from django.shortcuts import render_to_response
from django.http import HttpResponse
from datetime import datetime
from django import http
import json


def aplusb(request, a, b):
    try:
        a=int(a)
        b=int(b)
    except ValueError:
        return http.HttpResponseForbidden()
    #if a==1 and b==2:
        #return http.HttpResponseForbidden()
        #return http.HttpResponse(simplejson.dumps({'answer': "I don't know"}), content_type="application/json")
    return http.HttpResponse(json.dumps({'answer': a+b}), content_type="application/json")


def hello(request):
    str1 = ""
    for i in range(100):
        str1 += "<button onclick=\"alert('Yes.');\">USTC</button>\n"
    return HttpResponse(str1+"Hello world")


def current_datetime(request):
    current_date = datetime.datetime.now()
    return render_to_response('current_datetime.html', locals())
