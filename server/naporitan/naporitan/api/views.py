# -*- coding: utf-8 -*-
import json
from django.http import *

def default(req):
    raise Http404

