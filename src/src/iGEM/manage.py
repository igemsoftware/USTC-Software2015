#!/usr/bin/env python
import os
import sys
from django.http import HttpResponse, HttpRequest
# import iGEM  # KEEP IT. IT WILL RUN __init__.py

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "iGEM.settings")

    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)

