/*global alert:true */
(function(App) {
    "use strict";

    App.views.MissionExecuteView = Backbone.View.extend({
        events: {
            "click [data-action='execute']": "execute"
        },

        render: function() {
            var tmpl = App.template("mission/do");
            var player = App.getPlayer();
            var cards = player.cards.models;
            var card = cards.length ? cards[0] : null;
            var mission = this.collection.get(this.missionId);

            this.$el.html(tmpl({
                player: player,
                card: card,
                mission: mission
            }));

            return this;
        },

        execute: function(evt) {
            var self = this;
            var player = App.getPlayer();
            var mission = this.collection.get(this.missionId);

            App.net.post('/api/users/1/missions/1', {
                id: mission.id
            }).done(function(data) {
                var view;
                view = new App.views.MissionObstructionPopupView({
                    el: '#mission-popup'
                });
                App.popupQueue.push(view);

                view = new App.views.MissionCompletePopupView({
                    el: '#mission-popup'
                });
                App.popupQueue.push(view);

                view = new App.views.LevelupPopupView({
                    el: '#mission-popup'
                });
                App.popupQueue.push(view);

                App.rootView.showOverlay();
                App.popupQueue
                    .start()
                    .done(function() {
                        App.rootView.hideOverlay();
                    });

            }).fail(function(data) {
                alert("大変です！ミッションに失敗しました!");
            });
        }
    });
}(App));
