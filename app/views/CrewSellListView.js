(function(app, undef) {
    "use strict";

    app.views.CrewSellListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('crew/sell'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
