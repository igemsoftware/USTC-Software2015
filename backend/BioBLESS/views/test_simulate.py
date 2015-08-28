# coding=utf-8
"""
This is the Unit test for parts API.
"""
__author__ = 'ctyi'
from django.test import TestCase
import simplejson
import shutil
import os

import BioBLESS.biosys.data_test as input_dict


class TestSimulate(TestCase):
    """A test for /parts/ API.
    """

    def test_without_cache(self):
        response = self.client.post('/simulate/', simplejson.dumps(input_dict.system_data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        # print response_dict
        assert isinstance(response_dict, list)

    def test_with_cache(self):
        response = self.client.post('/simulate/', simplejson.dumps(input_dict.system_data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        response = self.client.post('/simulate/', simplejson.dumps(input_dict.system_data),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        # print response_dict
        assert isinstance(response_dict, list)

    def setUp(self):
        shutil.rmtree('../cache')
        os.mkdir('../cache')

    def tearDown(self):
        shutil.rmtree('../cache')
        os.mkdir('../cache')
