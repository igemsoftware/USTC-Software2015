from django.conf.urls import include, url
from django.http import HttpResponse
from src.urls import urlpatterns
from task1 import test2


urlpatterns.append(url(r'^test2/$', test2))
