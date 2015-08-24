# coding=utf-8
"""
This is the Unit test for parts API.
"""
__author__ = 'ctyi'
from django.test import TestCase
import simplejson
import BioBLESS.biosys.BioSystemSamples as input_dict

class TestSimulate(TestCase):
    """A test for /parts/ API.
    """
    def test_simple_dict(self):

        response = self.client.post('/simulate/', simplejson.dumps(input_dict.biosystem_sample1), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        assert isinstance(response_dict, list)
