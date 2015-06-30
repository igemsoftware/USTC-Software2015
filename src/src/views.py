__author__ = 'ctyi'
from django import http
import simplejson

def aplusb(request, a, b):
    try:
        a=int(a)
        b=int(b)
    except ValueError:
        return http.HttpResponseForbidden()
    #if a==1 and b==2:
        #return http.HttpResponseForbidden()
        #return http.HttpResponse(simplejson.dumps({'answer': "I don't know"}), content_type="application/json")
    return http.HttpResponse(simplejson.dumps({'answer': a+b}), content_type="application/json")
