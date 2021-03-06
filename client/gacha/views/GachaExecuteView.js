(function(app, undef) {
    "use strict";

    app.views.GachaExecuteView = Backbone.View.extend({
        events: {
            'click [data-action="next"]': 'onNext'
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

        onNext: function() {
            this.trigger('next', this);
            return false;
        }
    });
}(App));
