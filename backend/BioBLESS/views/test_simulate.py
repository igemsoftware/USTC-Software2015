# coding=utf-8
"""
This is the Unit test for parts API.
"""
__author__ = 'ctyi'
from django.test import TestCase
import simplejson
import shutil
import os
import time

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
        cold_time_start = time.time()
        response = self.client.post('/simulate/', simplejson.dumps(input_dict.system_data),
                                    content_type="application/json")
        cold_time_end = time.time()
        cold_time = cold_time_end - cold_time_start
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        hot_time_start = time.time()
        response = self.client.post('/simulate/', simplejson.dumps(input_dict.system_data),
                                    content_type="application/json")
        hot_time_end = time.time()
        hot_time = hot_time_end - hot_time_start
        self.assertGreater(cold_time, hot_time)
        self.assertEqual(response.status_code, 200)
        response_dict_cache = simplejson.loads(response.content)
        self.assertEqual(response_dict, response_dict_cache)
        # print response_dict
        assert isinstance(response_dict, list)

    def setUp(self):
        try:
            shutil.rmtree('../cache')
            os.mkdir('../cache')
        except OSError as e:
            pass

    def tearDown(self):
        try:
            shutil.rmtree('../cache')
            os.mkdir('../cache')
        except OSError as e:
            pass
