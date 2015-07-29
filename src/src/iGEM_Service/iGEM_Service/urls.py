"""iGEM_Service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

from iGEM_Service.views.packages import send_file, package_list
from iGEM_Service.views.pkginfo import get_pkginfo
from iGEM_Service.views.home import homepage

urlpatterns = [
    url(r'^$', homepage),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^packages/', send_file),
    url(r'^pkglist', package_list),
    url(r'^pkginfo/', get_pkginfo),
]
