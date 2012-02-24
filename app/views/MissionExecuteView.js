(function(app, undef) {
    "use strict";

    app.views.MissionExecuteView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("mission/do"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
