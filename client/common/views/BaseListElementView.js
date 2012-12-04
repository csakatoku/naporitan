(function(App) {
    "use strict";

    App.views.BaseListElementView = Backbone.View.extend({
        tagName: 'li',

        render: function() {
            var model = this.options.model;
            this.$el.html(this.template({
                model: model
            }));
            return this;
        }
    });
}(App));
