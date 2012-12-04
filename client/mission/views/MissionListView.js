(function(app, undef) {
    "use strict";

    app.views.MissionListView = Backbone.View.extend({
        render: function() {
            var tmpl = app.template("mission/index");
            $(this.el).html(tmpl({
                missions: this.collection.models
            }));
            return this;
        }
    });
}(App));
