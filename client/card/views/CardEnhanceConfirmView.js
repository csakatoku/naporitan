//load: client/common/views/BaseConfirmView.js
(function(App, undefined) {
    "use strict";

    var Klass = App.views.CardEnhanceConfirmView = App.views.BaseConfirmView.extend({
        templateName: 'card/enhance_confirm',

        show: function(options) {
            return Klass.__super__.show.call(this, options);
        }
    });
}(App));
