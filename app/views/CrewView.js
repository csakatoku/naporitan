(function(app, undef) {
    "use strict";

    app.views.CrewView = Backbone.View.extend({
        el: $("#container"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html("<h1>Crew</h1>");
            return this;
        }
    });
}(App));
