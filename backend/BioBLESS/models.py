"""
This is the model for the parts table
"""
__auther__ = 'ctyi'
from django.db import models
class parts(models.Model):
    """
    This is the parts database
    """
    name = models.CharField(max_length=15)
    type = models.CharField(max_length=25)
    description = models.CharField(max_length=150)
    sequence = models.CharField(max_length=68000)
    uid = models.AutoField(primary_key=True)
    id = models.IntegerField(unique=True)

    def __unicode__(self):
        return self.name
