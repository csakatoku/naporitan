(function(app, undef) {
    "use strict";

    app.routers.MissionRouter = Backbone.Router.extend({
        initialize: function() {
            this.listView = new app.views.MissionListView();

            this.executeView = new app.views.MissionExecuteView();
            this.executeView.on('execute', this.onExecute, this);
        },

        defaultAction: function(args) {
            var chapterId = ~~(args.id || 1);

            this.listView.dataBind({
                chapter: app.chapters.get(chapterId),
                missions: app.missions.filter(function(x) {
                    return x.get("chapterId") === chapterId;
                })
            });
            this.listView.render();

            app.rootView.showMenuTab();
        },

        executeAction: function(args) {
            var missionId = ~~(args.id || 1);
            var mission = app.missions.get(missionId);
            var player = app.getPlayer();
            var cards = player.getCrews();
            var card = cards.length ? cards[0] : null;

            this.executeView.dataBind({
                player: player,
                mission: mission,
                card: card
            });
            this.executeView.render();

            app.rootView.showMenuTab();
        }
    });
}(App));
