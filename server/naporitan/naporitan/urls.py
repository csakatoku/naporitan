# -*- coding: utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url

urlpatterns = patterns(
    '',

    url(r'^api/', include('naporitan.api.urls')),

    url(r'^(?P<path>.+)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
            }),

    url(r'^$', 'naporitan.bootstrap.views.default'),
)
