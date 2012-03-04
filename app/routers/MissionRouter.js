(function(app, undef) {
    "use strict";

    app.routers.MissionRouter = Backbone.Router.extend({
        defaultAction: function(args) {
            var view = new app.views.MissionListView();
            view.render();
            app.rootView.showMenuTab();
        },

        executeAction: function(args) {
            var missionId = ~~(args.id || 1);
            var mission = app.missions.get(missionId);
            var player = app.getPlayer();
            var view = new app.views.MissionExecuteView(player, mission);
            view.render();
            app.rootView.showMenuTab();
        }
    });
}(App));
