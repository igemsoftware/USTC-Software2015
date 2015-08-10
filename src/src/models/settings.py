__author__ = 'zsy95_000'
import os


# TODO : Fill the sbin.
sbin = os.path.join("src", "modules")
# TODO : Fill the source.
host = "http://127.0.0.1:8000"  # MUST HAVE HTTP!!!


def osformat(path):
    return path.replace('\\', os.sep).replace('/', os.sep)
