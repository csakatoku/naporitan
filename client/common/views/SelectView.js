(function(App) {
    "use strict";

    var Klass = App.views.SelectView = Backbone.View.extend({
        tagName: 'select',

        events: {
            change: function() {
                this.trigger('change', this.value());
            }
        },

        render: function() {
            var self = this;
            var select = this.$el;

            this.options.forEach(function(pair) {
                var value = pair[0];
                var text = pair[1];
                var option = self.make('option', { value: value }, _.escape(text));
                select.append(option);
            });

            return this;
        },

        value: function() {
            return this.$el.val();
        }
    });

    Klass.create = function(options) {
        var view = new Klass();
        view.options = options;
        return view;
    };

}(App));
