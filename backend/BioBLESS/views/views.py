"""
A test case for basic django check
"""
__author__ = 'zsy95_000, ctyi'

# from django.shortcuts import render_to_response
# from django.http import HttpResponse
# from datetime import datetime
import time

from django import http


def sleep(request):
    time.sleep(300)
    return http.HttpResponse("<html></html>")


def gates(request):
    fp = open("./BioBLESS/fixtures/gates_lizhi.json")
    data = fp.read()
    fp.close()
    return http.HttpResponse(data)
