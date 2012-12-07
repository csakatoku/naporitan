(function(App) {
    "use strict";

    App.routers.MissionRouter = App.routers.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/execute/:id': 'executeAction',
            '!/chapter': 'chapterAction',
            '!/chapter/:id': 'defaultAction'
        },

        initializeViews: function() {
            this.missionCollection = new Backbone.Collection(null, {
                model: App.models.Mission
            });
            this.chapterCollection = new Backbone.Collection(null, {
                model: App.models.Chapter
            });

            this.missionListView = new App.views.MissionListView({
                el: '#mission-list',
                collection: this.missionCollection
            });
            this.missionCollection.bind('all', this.missionListView.render, this.missionListView);

            this.chapterListView = new App.views.ChapterListView({
                el: '#chapter-list',
                collection: this.chapterCollection
            });
            this.chapterCollection.bind('all', this.chapterListView.render, this.chapterListView);

            this.executeView = new App.views.MissionExecuteView();
            this.executeView.on('execute', this.onExecute, this);
        },

        defaultAction: function(chapterId) {
            chapterId = chapterId ? chapterId : 1;
            this.missionListView.active();
            this.missionCollection.fetch({
                url: '/api/users/1/missions'
            });
        },

        chapterAction: function() {
            this.chapterListView.active();
            this.chapterCollection.fetch({
                url: '/api/users/1/chapters'
            });
        },

        executeAction: function(id) {
            var missionId = ~~(id || 1);
            var mission = App.missions.get(missionId);
            var player = App.getPlayer();
            var cards = player.getCrews();
            var card = cards.length ? cards[0] : null;

            this.executeView.dataBind({
                player: player,
                mission: mission,
                card: card
            });
            this.executeView.render();
        }
    });
}(App));
