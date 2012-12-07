(function(app) {
    "use strict";

    app.views.MenuView = Backbone.View.extend({
        events: {
            'click [data-action="close"]': 'onClose'
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        },

        render: function() {
            var tmpl = app.template('_partial/menu');
            this.$el.html(tmpl());
            this.$el.hide();
            return this;
        },

        onClose: function() {
            this.trigger('close', this);
        }
    });
}(App));
