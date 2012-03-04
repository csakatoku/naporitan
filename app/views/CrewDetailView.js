(function(app, undef) {
    "use strict";

    app.views.CrewDetailView = Backbone.View.extend({
        el: "#content",

        template: app.template('crew/detail'),

        initialize: function() {
            var crews = app.getPlayer().getCrews();
            this.crew = crews.get(1);
        },

        render: function() {
            $(this.el).html(this.template({
                crew: this.crew
            }));
            return this;
        }
    });
}(App));
