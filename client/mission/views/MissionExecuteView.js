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
                self.trigger('success', self, data);
            }).fail(function(data) {
                self.trigger('fail', self, {});
            });
        }
    });
}(App));
