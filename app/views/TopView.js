(function(app, undef) {
    "use strict";

    app.views.TopView = Backbone.View.extend({
        el: "#content",

        template: app.template('top/index'),

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
