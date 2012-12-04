(function(app, undef) {
    "use strict";

    app.views.GachaExecuteView = Backbone.View.extend({
        events: {
            'click [data-action="gacha-result"]': 'onResultClick',
            'click [data-action="gacha-reload"]': 'onReloadClick'
        },

        setResult: function(items) {
            this.result = items;
        },

        render: function() {
            var result = this.result || [];
            var tmpl = app.template('gacha/do_many');
            $(this.el).html(tmpl({
                items: result
            }));
            return this;
        },

        onResultClick: function() {
            var result = this.result || [];
            var tmpl = app.template('gacha/result_many');
            $(this.el).html(tmpl({
                items: result
            }));
            return false;
        },

        onReloadClick: function() {
            this.trigger('onGachaReload');
            return false;
        }
    });
}(App));
