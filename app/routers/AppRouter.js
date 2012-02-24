(function(app, undef) {
    "use strict";

    app.routers.AppRouter = Backbone.Router.extend({
        routes: {
            "/home"   : "home",
            "/mission": "missionList",
            "/mission/:id": "missionExecute",
            "/chapter": "chapter",
            "/gacha"  : "gacha",
            "/crew"   : "crew",
            "/"       : "top",
            ""        : "top"
        },

        home: function() {
            var view = new app.views.HomeView();
            view.render();
        },

        missionList: function() {
            var view = new app.views.MissionListView();
            view.render();
        },

        missionExecute: function() {
            var view = new app.views.MissionExecuteView();
            view.render();
        },

        chapter: function() {
            var view = new app.views.ChapterView();
            view.render();
        },

        gacha: function() {
            var view = new app.views.GachaView();
            view.render();
        },

        crew: function() {
            var view = new app.views.CrewView();
            view.render();
        },

        top: function() {
            //
        }
    });
}(App));
