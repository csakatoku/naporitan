(function(app, undef) {
    "use strict";

    app.views.MissionListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("mission/index"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
