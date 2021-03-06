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
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic.base import RedirectView

import BioBLESS.views.parts
import BioBLESS.views.biocircuit
import BioBLESS.views.simulate
import BioBLESS.views.views

urlpatterns = [
    url(r'^$', RedirectView.as_view(url='/BioBLESS/')),
    #url(r'^admin/', include(admin.site.urls)),
    url(r'^parts/', BioBLESS.views.parts.PartsView.as_view()),
    # biosys
    url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^biocircuit/(.+)/$', BioBLESS.views.biocircuit.BiocircuitView.as_view()),
    url(r'^sleep/$', BioBLESS.views.views.sleep),
    url(r'^gates/$', BioBLESS.views.views.gates),
    url(r'^score/$', BioBLESS.views.biocircuit.ScoreView.as_view()),
    url(r'^simulate/$', BioBLESS.views.simulate.SimulateView.as_view()),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
