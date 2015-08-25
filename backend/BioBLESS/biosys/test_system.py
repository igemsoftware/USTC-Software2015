#!/usr/bin/env python
from django.test import TestCase

from data_test import system_data
from bio_system import bio_system


class TestSystem(TestCase):
    def test_system(self):
        A = bio_system(system_data)
