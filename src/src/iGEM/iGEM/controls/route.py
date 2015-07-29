__author__ = 'zsy95_000'
import json
import recv
from os.path import exists
from iGEM.models.settings import route_settings_path


def open_route():
    # NOTE: Set routines, a database maybe better, but json is much readable.
    route_data = {}
    if exists(route_settings_path()):
        route_data = recv.json_local(route_settings_path())
    return route_data


def write_route(route_data):
    with open(route_settings_path(), 'w') as f:
        json.dump(route_data, f)  # write it immediately to avoid conflict. Thread lock should be better.
