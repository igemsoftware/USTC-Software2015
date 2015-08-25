# coding=utf-8
"""
This is the view to convert a true/false string to a circuit.
URI:/biocircuit/string
method:get
"""
__author__ = 'ctyi'

from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework import status


import BioBLESS.biocircuit.biocircuit as biocircuit
import BioBLESS.biocircuit.biogate as biogate


class BiocircuitView(APIView):
    """This URI return a series of circuit with score.

    Usage:
    """
    parser_classes = (JSONParser,)
    renderer_classes = (JSONRenderer,)

    def get(self, request, expr, format=None):
        """
        request: GET /biocircuit/ID
        response: json api_circuit
        """
        digit_count = 0
        for char1 in range(0, len(expr)):
            if expr[char1] == '0' or expr[char1] == '1':
                digit_count += 1
        if digit_count < 2:
            raise ParseError(detail="At least two digits are required.")
        expr_from_back = biocircuit.string2expr(expr)
        circuit_from_back = biocircuit.create_circuit(expr_from_back)
        scores_from_back = biocircuit.circuit_score(circuit_from_back, biogate.d_gate)
        response_dict = biocircuit.api_circuit(circuit_from_back, scores_from_back)
        return Response(response_dict)


class ScoreView(APIView):
    """This API could calc the score of a circuit

    """
    parser_classes = (JSONParser,)
    renderer_classes = (JSONRenderer,)

    def post(self, request, format=None):
        """
        request: POST /biocircuit/score/
        Response: json
                {
                    status:"SUCCESS"
                    score: float
                }
        """
        try:
            response_from_back = biocircuit.get_score_from_front(request.data, biogate.d_gate)
            response = {}
            response["status"] = "SUCCESS"
            response["score"] = response_from_back
            return Response(response)
        except BaseException as error:
            # raise
            response = {}
            response["status"] = "failed"
            response["detail"] = error.message
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
