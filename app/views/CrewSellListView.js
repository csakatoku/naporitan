(function(app, undef) {
    "use strict";

    app.views.CrewSellListView = Backbone.View.extend({
        el: "#content",

        template: app.template('crew/sell'),

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
