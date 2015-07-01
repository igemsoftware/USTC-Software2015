# coding=utf-8
from django.test import TestCase
import simplejson

class TestAplusB(TestCase):
    """This is a Unit test for aplusb.

    这是一个测试a+b的单元测试。"""
    def test_aplusb(self):
        response = self.client.get('/aplusb/1/2/')
        self.assertEqual(response.status_code, 200, "Server doesn't return 200")
        response = simplejson.loads(response.content)
        self.assertEqual(response['answer'],int(3), "Wrong A + B Answer!")