(function(app, undef) {
    "use strict";

    app.views.CrewListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('crew/index'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
