(function(app, undef) {
    "use strict";

    app.views.GachaResultView = Backbone.View.extend({
        events: {
            'click [data-action="reload"]': 'onReload'
        },

        setResult: function(items) {
            this.result = items;
        },

        render: function() {
            var result = this.result || [];
            var tmpl = app.template('gacha/result_many');
            $(this.el).html(tmpl({
                items: result
            }));
            return this;
        },

        onReload: function() {
            this.trigger('reload', this);
            return false;
        }
    });
}(App));
