# -*- coding: utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url

urlpatterns = patterns(
    'naporitan.api.views',

    url(r'^facebook/credits', 'facebook_credits'),

    # Proto Database
    url(r'^protodb/(?P<name>.+)\.json$', 'proto_database', name='api_proto_database'),

    # Init user session
    url(r'^init$', 'init', name='api_init'),

    # gacha
    url(r'^gacha', 'gacha_execute'),

    # Mission
    url(r'^mission/execute', 'mission_execute'),
)
