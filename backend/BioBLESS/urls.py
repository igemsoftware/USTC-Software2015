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
import BioBLESS.views.parts
import BioBLESS.views.views
from BioBLESS.biosys.test_samples import test_reaction_system_sample, test_parts_system_sample


urlpatterns = [
    url(r'^$', include('home.urls')),
    url(r'^aplusb/(\d+)/(\d+)/$', BioBLESS.views.views.aplusb),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^parts/', BioBLESS.views.parts.PartsView.as_view()),
    # biosys
    url(r'^biosys/test-reaction-system-sample/$', test_reaction_system_sample),
    url(r'^biosys/test-parts-system-sample/$', test_parts_system_sample)
]