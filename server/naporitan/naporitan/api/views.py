# -*- coding: utf-8 -*-
import json
from django.http import *
from django.views.decorators.csrf import csrf_exempt

from naporitan import _facebook as facebook

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

    result_id = random.randint(1, 1 << 32)

    cards = []
    for x in xrange(0, 10):
        character_id = random.randint(1, 300)
        cards.append(character_id)

    result = {
        'result_id': result_id,
        'multiple' : True,
        'cards'    : cards,
        }
    res = HttpResponse(json.dumps(result), content_type='application/json')
    return res
