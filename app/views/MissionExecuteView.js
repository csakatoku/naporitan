(function(app, undef) {
    "use strict";

    app.views.MissionExecuteView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("mission/do"),

        events: {
            "click #mission-execute": "execute"
        },

        initialize: function() {
            var missionId = 1;
            this.mission = app.missions.get(missionId);
            this.crew = app.getPlayer().getCrews().get(1);
        },

        render: function() {
            $(this.el).html(this.template({
                mission: this.mission,
                crew: this.crew
            }));
            return this;
        },

        execute: function(e) {
            app.getPlayer().executeMission(this.mission);
        }
    });
}(App));
