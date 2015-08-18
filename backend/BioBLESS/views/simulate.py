# coding=utf-8
"""
This is the view to simulate a biosystem
URI:/simulate
method:POST
"""
__author__ = 'ctyi'
try:
    import BioBLESS.biosys.BioSystem as Biosystem
except BaseException as error:
    pass
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


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
            input_from_back = System.System(request.data)
            response_from_back = input_from_back.simulate()
        except BaseException as error:
            response = {}
            response["status"] = "failed"
            response["detail"] = error.message
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        assert isinstance(response_from_back, list)
        return response_from_back
