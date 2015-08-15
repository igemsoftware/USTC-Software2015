__author__ = 'zsy95_000'


#from src.views import pkglocal, route

from django.http import HttpResponse


def api(request):
    """
    :param pkgname:
    :return:
    """

    #for pkgname in pkglocal.package_list():
    #    route.register(pkgname)

    # from iGEM.urls import urlpatterns
    # urlpatterns.append(url(r'^api2/$', api2))
    return HttpResponse("")

