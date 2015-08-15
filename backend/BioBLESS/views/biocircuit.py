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
        print expr
        expr_from_back = biocircuit.string2expr(expr)
        circuit_from_back = biocircuit.create_circuit(expr_from_back)
        scores_from_back = biocircuit.circuit_score(circuit_from_back, biogate.d_gate)
        response_dict = biocircuit.api_circuit(circuit_from_back, scores_from_back)
        return Response(response_dict)
