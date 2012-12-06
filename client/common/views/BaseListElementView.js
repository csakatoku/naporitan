(function(App) {
    "use strict";

    App.views.BaseListElementView = Backbone.View.extend({
        tagName: 'li',

        templateContext: function(params) {
            return params;
        },

        render: function() {
            var model = this.options.model;
            var context = {
                model: model
            };
            this.$el.html(this.template(this.templateContext(context)));
            return this;
        }
    });
}(App));
