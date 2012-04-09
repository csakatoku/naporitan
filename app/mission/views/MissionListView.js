(function(app, undef) {
    "use strict";

    app.views.MissionListView = Backbone.View.extend({
        el: "#content",

        template: app.template("mission/index"),

        initialize: function() {
            var chapterId = 1;
            this.chapter = app.chapters.get(chapterId);
            this.missions = app.missions.filter(function(x) {
                return x.get("chapterId") === chapterId;
            });
        },

        render: function() {
            $(this.el).html(this.template({
                chapter : this.chapter,
                missions: this.missions
            }));
            return this;
        }
    });
}(App));
