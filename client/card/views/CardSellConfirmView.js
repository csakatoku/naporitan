//load: client/common/views/BaseConfirmView.js
(function(App, undefined) {
    "use strict";

    var Klass = App.views.CardSellConfirmView = App.views.BaseConfirmView.extend({
        templateName: 'card/sell_confirm',

        show: function(options) {
            return Klass.__super__.show.call(this, options);
        }
    });
}(App));
