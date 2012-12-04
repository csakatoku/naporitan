/*jshint sub:true */
(function(app) {
    app.views.CashView = Backbone.View.extend({
        el: '#content',

        events: {
            "click .cash_buy": "onBuy"
        },

        render: function() {
            var tmpl = app.template('cash/index');
            $(this.el).html(tmpl());
            return this;
        },

        onBuy: function(e) {
            var orderInfo = $(e.target).data('product-id');
            var params = {
                method: 'pay',
                order_info: [orderInfo],
                action: 'buy_item'
            };

            if (FB.UA.nativeApp()) {
                // Facebook Credits are not supported within iOS native apps.
                // https://developers.facebook.com/docs/credits/build/
                return false;
            }

            if (__DEBUG__) {
                params['dev_purchase_params'] = {
                    oscif: true
                };
            }

            FB.ui(params, function(data) {
                console.log(data);
            });

            return false;
        }
    });
}(App));
