(function(app, undef) {
    "use strict";

    app.routers.AppRouter = Backbone.Router.extend({
        routes: {
            "/home"   : "home",
            "/mission": "missionList",
            "/mission/:id": "missionExecute",
            "/chapter": "chapterList",
            "/gacha/result/:id"  : "gachaResult",
            "/gacha"  : "gachaList",
            "/crew/sell"   : "crewSell",
            "/crew/sell_confirm"   : "crewSellConfirm",
            "/crew/merge"  : "crewMerge",
            "/crew/merge_select"  : "crewMerge",
            "/crew/:id"    : "crewDetail",
            "/crew"   : "crew",
            "/"       : "top",
            ""        : "top"
        },

        reverse: function(name, args) {
            var buf = [];
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    buf.push(k + "=" + args[k]);
                }
            }
            if (buf.length) {
                return '#/' + name + "/" + (buf.join('&'));
            } else {
                return '#/' + name;
            }
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

        chapterList: function() {
            var view = new app.views.ChapterListView();
            view.render();
        },

        gachaList: function() {
            var view = new app.views.GachaListView();
            view.render();
        },

        gachaResult: function() {
            var view = new app.views.GachaResultView();
            view.render();
        },

        crew: function() {
            var view = new app.views.CrewListView();
            view.render();
        },

        crewMerge: function() {
            var view = new app.views.CrewMergeListView();
            view.render();
        },

        crewMergeSelect: function() {
            var view = new app.views.CrewMergeSelectView();
            view.render();
        },

        crewSell: function() {
            var view = new app.views.CrewSellListView();
            view.render();
        },

        crewSellConfirm: function() {
            var view = new app.views.CrewSellView();
            view.render();
        },

        crewDetail: function() {
            var view = new app.views.CrewDetailView();
            view.render();
        },

        top: function() {
            var view = new app.views.TopView();
            view.render();
        }
    });
}(App));
