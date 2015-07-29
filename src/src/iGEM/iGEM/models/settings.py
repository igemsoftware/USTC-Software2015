__author__ = 'zsy95_000'
import os

# TODO : Fill the source.
source = "http://127.0.0.1:8000"  # MUST HAVE HTTP!!!
# TODO : Fill the sbin.
sbin = "F:\\igem_test\\sbin"
# TODO : Fill the source.
host = "http://127.0.0.1:8080"  # MUST HAVE HTTP!!!
# TODO : Modify the setting path
setting_dir = "F:\\igem_test\\settings"
platform = 150


def osformat(path):
    return path.replace('\\', os.sep).replace('/', os.sep)


def route_settings_path():
    return osformat(setting_dir + "/route.json")
