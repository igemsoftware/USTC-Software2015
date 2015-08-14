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


class PartsSerializer(serializers.Serializer):
    # id = serializers.IntegerField()
    description = serializers.CharField()
    # sequence = serializers.CharField()
    # type = serializers.CharField()
class PartsView(APIView):
    """This URI return frontend parts info in the database.

    Usage:
    """
    parser_classes = (JSONParser,)
    renderer_classes = (JSONRenderer, )
    def post(self,request,format=None):
        """
        deal with the POST method only
        """
        response_total = []
        for item in request.data:
            pre_filter = {}
            if "id" in item:
                pre_filter['id'] = item['id']
            for key in item:
                if key != "id":
                    pre_filter[key + "__contains"] = item[key]
            queryset = parts.objects.filter(**pre_filter)
            response_total.extend(queryset.values())
        response_dict = {}
        response_dict['status'] = "SUCCESS"
        response_dict['data'] = response_total
        return Response(response_dict)
