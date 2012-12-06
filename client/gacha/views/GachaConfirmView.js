//load: client/common/views/BaseConfirmView.js
(function(App) {
    "use strict";

    var Klass = App.views.GachaConfirmView = App.views.BaseConfirmView.extend({
        templateName: 'gacha/confirm',

        show: function(options) {
            var message = App.utils.sprintf('ガチャ%sを%s回実行しますか？', [
                options.gachaId,
                options.times
            ]);
            this.$('.confirm-message').text(message);

            return Klass.__super__.show.call(this, options);
        }
    });
}(App));
