__author__ = 'zsy95_000'

from django.shortcuts import render_to_response
from iGEM_Service.models.source import websource


def homepage(request):
    return render_to_response('community.html', {"source": websource})
