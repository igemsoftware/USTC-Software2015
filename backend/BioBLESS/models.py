"""
This is the model for the parts table
"""
__author__ = 'ctyi'
from django.db import models


class Parts(models.Model):
    """
    This is the parts database
    """

    uid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=15, db_index=True)
    id = models.IntegerField(unique=True, db_index=True)
    type = models.CharField(max_length=25)
    description = models.CharField(max_length=150)
    nickname = models.CharField(max_length=15)
    rating = models.CharField(max_length=20)
    release_status = models.CharField(max_length=30)
    sample_status = models.CharField(max_length=30)
    entered_time = models.CharField(max_length=15)
    sequence = models.CharField(max_length=68000)
    author = models.CharField(max_length=300)

    def __unicode__(self):
        return self.name
