# coding=utf-8
"""
This is the Unit test for parts API.
"""
__author__ = 'ctyi'
from django.test import TestCase
import simplejson


class TestParts(TestCase):
    """A test for /parts/ API.
    """
    fixtures = ["parts.json"]

    def test_multi_id(self):
        response = self.client.post('/parts/', '[{"id": "11988"}, {"id": "11984"}]', content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        self.assertIn("status", response_dict)
        self.assertEqual(response_dict["status"], "SUCCESS")
        self.assertIn("data", response_dict)
        assert isinstance(response_dict['data'], list)
        self.assertEqual(response_dict["data"][0]["id"], 11988)
        self.assertEqual(response_dict['data'][1]["id"], 11984)

    def test_name(self):
        response = self.client.post('/parts/', '[{"name": "k103015"}]', content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        self.assertIn("status", response_dict)
        self.assertEqual(response_dict["status"], "SUCCESS")
        self.assertIn("data", response_dict)
        assert isinstance(response_dict['data'], list)
        self.assertEqual(response_dict["data"][0]["id"], 11988)
