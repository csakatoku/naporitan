# -*- coding: utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url

urlpatterns = patterns(
    'naporitan.api.views',

    url('facebook/credits', 'facebook_credits'),

    # gacha
    url('gacha', 'gacha_execute'),
)
