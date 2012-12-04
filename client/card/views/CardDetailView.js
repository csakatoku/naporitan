(function(app, undef) {
    "use strict";

    app.views.CrewDetailView = Backbone.View.extend({
        render: function() {
            var tmpl = app.template('crew/detail');
            $(this.el).html(tmpl({}));
            return this;
        },

        show: function(options) {
        }
    });
}(App));
