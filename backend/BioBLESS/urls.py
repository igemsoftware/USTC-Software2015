"""iGEM URL Configuration

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
from BioBLESS.views.views import aplusb
from BioBLESS.views.route import route_content, route_page, reg
from BioBLESS.views.cache import cache, cache_dict
from BioBLESS.views.pkgapi import api
from test_samples import test_reaction_system_sample, test_parts_system_sample


urlpatterns = [
    url(r'^$', include('home.urls')),
    url(r'^aplusb/(\d+)/(\d+)/$', aplusb),
    url(r'^admin/', include(admin.site.urls)),
    # Provide file/content
    url(r'^route/(?P<pkgname>.*)/(?P<subpath>.*)', route_content),
    # To show something HTML
    url(r'^page/(?P<pkgname>.*)/(?P<subpath>.*)', route_page),
    # Register
    url(r'^register/(?P<pkgname>.*)', reg),
    # Cache
    url(r'^cache/(?P<pkgname>.*)/(?P<key>.*)', cache),
    url(r'^cache_dict/(?P<pkgname>.*)/', cache_dict),

    # biosys
    url(r'^biosys/test-reaction-system-sample/$', test_reaction_system_sample),
    url(r'^biosys/test-parts-system-sample/$', test_parts_system_sample),

    url(r'^api/', api),
]





