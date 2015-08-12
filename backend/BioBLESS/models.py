__author__ = 'ctyi'
"""
This is the model for the parts table
"""
from django.db import models
class parts(models.Model):
    name = models.CharField(max_length=15)
    type = models.CharField(max_length=25)
    description = models.CharField(max_length=150)
    sequence = models.CharField(max_length=68000)