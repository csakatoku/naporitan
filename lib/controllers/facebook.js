exports.configure = function(app, settings) {
    "use strict";

    var PRODUCTS = {
        cash300: {
            title: '邪悪なるコイン300',
            price: 1,
            description: "邪悪なるコインを買ってガチャにチャレンジ!",
            image_url: 'http://www.facebook.com/images/gifts/740.png',
            roduct_url: 'http://www.facebook.com/images/gifts/740.png'
        },

        cash500: {
            title: '邪悪なるコイン500',
            price: 3,
            description: "邪悪なるコインを買ってガチャにチャレンジ!",
            image_url: 'http://www.facebook.com/images/gifts/740.png',
            roduct_url: 'http://www.facebook.com/images/gifts/740.png'
        },

        cash1000: {
            title: '邪悪なるコイン1000',
            price: 5,
            description: "邪悪なるコインを買ってガチャにチャレンジ!",
            image_url: 'http://www.facebook.com/images/gifts/740.png',
            roduct_url: 'http://www.facebook.com/images/gifts/740.png'
        }
    };

    app.post('/api/facebook/credits', function(req, res) {
        var status = req.param('status');
        var orderId = req.param('order_id');
        var orderInfo = req.param('order_info');
        var result;

        if (status === 'settled') {
            result = {};
        } else if (status === 'placed') {
            result = {
                content: {
                    status  : 'settled',
                    order_id: orderId
                },
                method: 'payments_status_update'
            };
        } else {
            var orders = JSON.parse(orderInfo);
            var content = [];
            orders.forEach(function(x) {
                var product = PRODUCTS[x];
                if (product) {
                    content.push(product);
                }
            });

            result = {
                content: content,
                method: 'payments_get_items'
            };
        }

        res.json(result);
    });
};
