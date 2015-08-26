__author__ = 'suquark'
# !/usr/bin/env python
try:
    from django.test import TestCase
except ImportError:
    pass

from debug_tool import debug_info
from hash_tool import hash_list, hash_dict, hash_string_list


class TestReaction(TestCase):
    def test_reaction(self):
        print debug_info('Test self')
        print hash_list([{'a': 43.5}, {46: '77y'}, {65.6: 7}])
        hash_string_list(['zhang hao', 'cuitianyi', 'zhuangsiyuan'])
        self.assertEqual(hash_dict({1: 2, 3: 4}), hash_dict({3: 4, 1: 2}))
