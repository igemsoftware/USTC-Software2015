"""
Do something to init the filesystem
"""

from iGEM.models import settings
import sys
from iGEM.models.settings import sbin, setting_dir
import pkglocal, route
import os
from os.path import exists


def init_dir(path):
    if not exists(path):
        os.mkdir(path)


# TODO Bug-fix, runflow disaster
map(init_dir, [setting_dir, sbin])

# !! Very important for package load.
sys.path.append(sbin)
