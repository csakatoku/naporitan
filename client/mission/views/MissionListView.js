(function(app, undef) {
    "use strict";

    app.views.MissionListView = Backbone.View.extend({
        render: function() {
            var tmpl = app.template("mission/index");
            var models = this.collection.where({ chapterId: this.chapterId });
            $(this.el).html(tmpl({
                missions: models
            }));
            return this;
        }
    });
}(App));
