#!/usr/bin/env python
from django.test import TestCase

from test_data import system_data
from bio_system import bio_system


class TestSystem(TestCase):
    def test_system(self):
        A = bio_system(system_data)
