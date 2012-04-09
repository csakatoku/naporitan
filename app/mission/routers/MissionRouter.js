(function(app, undef) {
    "use strict";

    app.routers.MissionRouter = Backbone.Router.extend({
        initialize: function() {
            this.listView = new app.views.MissionListView();
            this.executeView = new app.views.MissionExecuteView();
        },

        defaultAction: function(args) {
            this.listView.render();
            app.rootView.showMenuTab();
        },

        executeAction: function(args) {
            var missionId = ~~(args.id || 1);
            var mission = app.missions.get(missionId);
            var player = app.getPlayer();

            this.executeView.player = player;
            this.executeView.mission = mission;
            this.executeView.crew = player.getCrews().get(1);
            this.executeView.render();

            app.rootView.showMenuTab();
        }
    });
}(App));
