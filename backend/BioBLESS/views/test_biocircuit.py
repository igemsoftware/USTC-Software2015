# coding=utf-8
"""
This is a unit test to test the T/F table to a circuit
"""
__author__ = 'ctyi'

from django.test import TestCase
import simplejson


class TestParts(TestCase):
    """A test for /biocircuit/ API.
    """

    def test_biocircuit(self):
        response = self.client.get('/biocircuit/10110101/')
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        assert isinstance(response_dict, list)
        self.assertIn("nodes", response_dict[0])
        self.assertIn("score", response_dict[0])
        # print response_dict[0]["score"]
        assert isinstance(response_dict[0]["score"], (int, float, long))
        self.assertLessEqual(response_dict[0]["score"], response_dict[len(response_dict) - 1]["score"])

        response = self.client.get('/biocircuit/10/')
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        assert isinstance(response_dict, list)
        self.assertIn("nodes", response_dict[0])
        self.assertIn("score", response_dict[0])
        assert isinstance(response_dict[0]["score"], (float, int, long))
        # print response_dict[0]["score"]
        self.assertLessEqual(response_dict[0]["score"], response_dict[len(response_dict) - 1]["score"])

    def test_name(self):
        response = self.client.get('/biocircuit/abcd12/')
        self.assertEqual(response.status_code, 400)

    def test_getscore(self):
        request = {}
        request["nodes"] = ["INPUT", "NOT0"]
        response = self.client.post('/score/', simplejson.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response_dict = simplejson.loads(response.content)
        assert isinstance(response_dict["score"], float)
        self.assertAlmostEqual(response_dict["score"], 5.5)
