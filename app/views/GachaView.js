(function(app, undef) {
    "use strict";

    app.views.GachaView = Backbone.View.extend({
        el: $("#container"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html("<h1>Gacha</h1>");
            return this;
        }
    });
}(App));
