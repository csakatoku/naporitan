(function(app, undef) {
    "use strict";

    app.views.MissionExecuteView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("mission/do"),

        events: {
            "click #mission-execute": "execute"
        },

        initialize: function(player, mission) {
            this.mission = mission;
            this.player = player;
            this.crew = player.getCrews().get(1);
        },

        render: function() {
            $(this.el).html(this.template({
                mission: this.mission,
                crew: this.crew
            }));
            return this;
        },

        execute: function(e) {
            this.player.executeMission(this.mission);
        }
    });
}(App));
