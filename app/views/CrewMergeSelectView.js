(function(app, undef) {
    "use strict";

    app.views.CrewMergeListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('crew/merge_select'),

        initialize: function() {
            this.crews = app.getPlayer().getCrews();
        },

        render: function() {
            $(this.el).html(this.template({
                crews: this.crews
            }));
            return this;
        }
    });
}(App));
