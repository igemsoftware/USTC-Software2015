"""
Return parts information to the frontend
 details are in doc/api-for-front/parts.txt
"""
__author__ = 'ctyi'
from django import http
import simplejson
from BioBLESS.models import parts
from rest_framework import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

class PartsView(APIView):
    """
    This function return frontend parts info.
    """
    parser_classes = (JSONParser,)
    renderer_classes = (JSONRenderer, )
    def post(self,request,format=None):
        """
        deal with the POST method only
        """
        ResopnseDict={}
        ResopnseDict["data"]=request.data
        ResopnseDict["status"]="SUCCESS"
        return Response(ResopnseDict)