# -*- coding: utf-8 -*-
import json
import time
from django.conf import settings
from django.core import urlresolvers
from django.http import *
from django.views.decorators.csrf import csrf_exempt

from naporitan import _facebook as facebook
from naporitan.storage import storage
from naporitan.models import Player, Mission

PRODUCTS = {
    'cash300': {
        'title': '邪悪なるコイン300',
        'price': 1,
        'description': "邪悪なるコインを買ってガチャにチャレンジ!",
        'image_url': 'http://www.facebook.com/images/gifts/740.png',
        'roduct_url': 'http://www.facebook.com/images/gifts/740.png'
        },

    'cash500': {
        'title': '邪悪なるコイン500',
        'price': 3,
        'description': "邪悪なるコインを買ってガチャにチャレンジ!",
        'image_url': 'http://www.facebook.com/images/gifts/740.png',
        'roduct_url': 'http://www.facebook.com/images/gifts/740.png'
        },

    'cash1000': {
        'title': '邪悪なるコイン1000',
        'price': 5,
        'description': "邪悪なるコインを買ってガチャにチャレンジ!",
        'image_url': 'http://www.facebook.com/images/gifts/740.png',
        'roduct_url': 'http://www.facebook.com/images/gifts/740.png'
        }
    }


@csrf_exempt
def facebook_credits(req):
    if not req.POST or 'signed_request' not in req.POST:
        return HttpResponseBadRequest()

    signed_request = facebook.parse_signed_request(
        req.POST.get('signed_request'), settings.FACEBOOK_API_SECRET)

    if not signed_request:
        return HttpResponseForbidden()

    status = req.POST.get('status')
    order_id = req.POST.get('order_id', '0')
    order_info = req.POST.get('order_info')

    if status == 'settled':
        result = {}

    elif status == 'placed':
        result = {
            'content': {
                'status'  : 'settled',
                'order_id': order_id,
                },
            'method': 'payments_status_update',
            }

    else:
        orders = json.loads(order_info)
        content = []
        for order in orders:
            product = PRODUCTS.get(order)
            if product:
                content.append(product)

        result = {
            'content': content,
            "method" : 'payments_get_items',
            }

    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res


def gacha_execute(req):
    import random

    multiple = req.GET.get('multiple') == 'true'
    gacha_id = req.GET.get('gacha_id')

    result_id = random.randint(1, 1 << 32)

    times = 10 if multiple else 1
    cards = []
    for x in xrange(0, times):
        character_id = random.randint(1, 300)
        cards.append(character_id)

    body = {
        'result_id': result_id,
        'multiple' : multiple,
        'cards'    : cards,
        }
    result = {
        'metadata': {
            'version': '1.0.0',
            },
        'body': body
        }
    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res


def mission_execute(req):
    uid = req.REQUEST.get('uid')
    if not uid:
        raise Http404

    mission_id = req.REQUEST.get('id')
    if not mission_id:
        raise Http404

    player = storage.get(Player, uid)
    player.coins += 10
    player.energy -= 1
    player.save()

    mission = storage.get(Mission, uid, mission_id)
    mission.progress += 10
    mission.save()

    player_data = {
        'level': player.level,
        'xp': player.coins,
        'energy': player.energy,
        'coins': player.coins,
        }

    mission_data = {
        'progress': min(mission.progress, 100),
        }

    if 0:
        actions = [
            {
                'type': 'levelup'
                },
            {
                'type': 'complete'
                },
            {
                'type': 'redirect',
                'url': 'mission/default'
                },
            ]
    else:
        actions = [
            {
                'type': 'levelup'
                },
            {
                'type': 'obstrcution'
                },
            ]

    result = {
        'metadata': {
            'version': '1.0.0',
            },
        'body': {
            'player' : player_data,
            'mission': mission_data,
            'actions': actions,
            }
        }
    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res


def init(req):
    now = time.time()

    protodb_names = [
        'chapter',
        'mission',
        'card_1',
        'card_2',
        'card_3',
        'card_4',
        'card_5',
        ]

    configs = []
    for name in protodb_names:
        url = urlresolvers.reverse('api_proto_database', kwargs={
                'name': name,
                })
        configs.append(url)

    configs.append('template.json?_=%d' % now)
    result = {
        'configs': configs
        }
    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res


def proto_database(req, name):
    import os

    path = os.path.join(settings.MEDIA_ROOT, 'asset', 'proto', '%s.json' % name)
    if not os.path.isfile(path):
        raise Http404

    proto = json.load(open(path))

    data = proto['data']
    tp = proto['type']
    version = '0.0.3'

    result = {
        'version': version,
        'data'   : data,
        'type'   : tp,
        }
    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res
