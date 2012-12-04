(function(app, undef) {
    "use strict";

    app.routers.MissionRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/execute': 'executeAction',
            '!/chapter': 'chapterAction',
            '!/chapter/:id': 'defaultAction'
        },

        initialize: function() {
            this.missionCollection = new Backbone.Collection(null, {
                model: app.models.Mission
            });
            this.chapterCollection = new Backbone.Collection(null, {
                model: app.models.Chapter
            });

            this.executeView = new app.views.MissionExecuteView();
            this.executeView.on('execute', this.onExecute, this);
        },

        defaultAction: function(chapterId) {
            chapterId = chapterId ? chapterId : 1;

            this.listView = new app.views.MissionListView({
                el: '#content',
                collection: this.missionCollection
            });
            this.missionCollection.bind('all', this.listView.render, this.listView);
            this.missionCollection.fetch({
                url: '/api/users/1/missions'
            });

            app.rootView.showMenuTab();
        },

        chapterAction: function() {
            this.listView = new app.views.ChapterListView({
                el: '#content',
                collection: this.chapterCollection
            });

            this.chapterCollection.bind('all', this.listView.render, this.listView);
            this.chapterCollection.fetch({
                url: '/api/users/1/chapters'
            });
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
