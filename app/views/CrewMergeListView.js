(function(app, undef) {
    "use strict";

    app.views.CrewMergeListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('crew/merge'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
