(function(app) {
    "use strict";

    app.views.GachaConfirmView = Backbone.View.extend({
        events: {
            "click [data-confirm='yes']": "onYes",
            "click [data-confirm='no']": "onNo"
        },

        render: function() {
            var tmpl = app.template('gacha/confirm');
            $(this.el).html(tmpl({}));
            this.$el.hide();
            return this;
        },

        show: function(options) {
            var message = app.utils.sprintf('ガチャ%sを%s回実行しますか？', [
                options.gachaId,
                options.times
            ]);
            this.$('.confirm-message').text(message);
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },

        onYes: function() {
            this.hide();
            this.trigger('yes');
        },

        onNo: function() {
            this.hide();
            this.trigger('no');
        }
    });
}(App));
