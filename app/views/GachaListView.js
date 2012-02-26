(function(app, undef) {
    "use strict";

    app.views.GachaListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('gacha/index'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
