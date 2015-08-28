# coding=utf-8
"""
This is the view to simulate a biosystem
URI:/simulate
method:POST
"""
__author__ = 'ctyi'
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import BioBLESS.biosys.bio_system as biosystem
import BioBLESS.biosys.bio_system_cache as cache

class SimulateView(APIView):
    """URI /simulate return the simulate result of a biological circuit

    Usage:
    """
    parser_classes = (JSONParser,)
    renderer_classes = (JSONRenderer,)

    def post(self, request, format=None):
        """Only accept application/json type.

        """
        try:
            system_data = biosystem.bio_system(request.data)
            cache_data = cache.biosystem_cache(request.data)
            if (cache_data != None):
                response_from_back = cache_data
            else:
                system_data.simulation()
                response_from_back = system_data.record_list
                cache.biosystem_update_cache(request.data, response_from_back)
        except BaseException as error:
            raise
            response = {}
            response["status"] = "failed"
            response["detail"] = error.message
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        # assert isinstance(response_from_back, list)
        return Response(response_from_back)
