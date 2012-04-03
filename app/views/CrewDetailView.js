(function(app, undef) {
    "use strict";

    app.views.CrewDetailView = Backbone.View.extend({
        el: "#content",

        template: app.template('crew/detail'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({
                item: this.item
            }));
            return this;
        }
    });
}(App));
