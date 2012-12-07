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

            this.executeView = new App.views.MissionExecuteView({
                el: '#mission-execute',
                collection: this.missionCollection
            });
            this.missionCollection.bind('all', this.executeView.render, this.executeView);
        },

        defaultAction: function(chapterId) {
            this.missionListView.active();
            this.missionListView.chapterId = ~~(chapterId || 1);
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
            this.executeView.active();
            this.executeView.missionId = ~~(id || 1);
            this.missionCollection.fetch({
                url: '/api/users/1/missions'
            });
        }
    });
}(App));
