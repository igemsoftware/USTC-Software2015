__author__ = 'zsy95_000'

"""
    NOTE : This file is to deal with content of pkginfo.json
    Format (example):
    {
        "name" : "S-Simulator",
        "author" : "Hao Z.",
        "description" : "This simulator helps you to gain knowledge of the evolution of substances.",
        "dependency" : ["Maths","Chemicals"],
        "version" : "1.0.0.6",
        "updatetime" : "2015-07-19",
        "inherit" : "Simulator",
        "lowest_platform_version" : "105",
        "highest_platform_version" : "434"
    }
"""

import json
# import django.core.serializers.json


def load_pkg(pkginfo):
    """
    :param pkginfo:
    :return: a dict with expected format
    """
    if pkginfo is unicode:
        pass
    return json.loads(pkginfo)


def save_pkg(pkginfo):
    """
    :param pkginfo:
    :return: a string
    """
    return json.dumps(pkginfo)

# Test
if __name__ == "__main__":
    a = load_pkg('''
    {
        "name" : "S-Simulator",
        "author" : "Hao Z.",
        "description" : "This simulator helps you to gain knowledge of the evolution of substances.",
        "dependency" : ["Maths","Chemicals"],
        "version" : "1.0.0.6",
        "updatetime" : "2015-07-19",
        "inherit" : ["Simulator"],
        "lowest_platform_version" : "105",
        "highest_platform_version" : "434"
    }

    ''')
    print a['name']
    for item in a['dependency']:
        print item

