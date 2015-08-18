"""
A test case for basic django check
"""
__author__ = 'zsy95_000, ctyi'

# from django.shortcuts import render_to_response
# from django.http import HttpResponse
# from datetime import datetime
from django import http
import json
import time

def aplusb(request, a, b):
    """
    It is a test case
    :param request: request
    :param a: int
    :param b: int
    :return: a + b
    """
    try:
        a = int(a)
        b = int(b)
    except ValueError:
        return http.HttpResponseForbidden()
        # if a==1 and b==2:
        # return http.HttpResponseForbidden()
        # return http.HttpResponse(simplejson.dumps({'answer': "I don't know"}), content_type="application/json")
    return http.HttpResponse(json.dumps({'answer': a + b}), content_type="application/json")


def sleep(request):
    time.sleep(300)
    return http.HttpResponse("<html></html>")
