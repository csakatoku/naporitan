(function(app, undef) {
    "use strict";

    app.views.TopView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('top/index'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
