__author__ = 'zsy95_000'
import os


# TODO : Fill the sbin.
sbin = os.path.join("src", "modules")
# TODO : Fill the source.
hostURL = "http://127.0.0.1:8000"  # MUST HAVE HTTP!!!


# if request.META.has_key('HTTP_X_FORWARDED_FOR'):
#     ip =  request.META['HTTP_X_FORWARDED_FOR']
# else:
#     ip = request.META['REMOTE_ADDR']


def osformat(path):
    return path.replace('\\', os.sep).replace('/', os.sep)
