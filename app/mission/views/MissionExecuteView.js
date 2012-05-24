(function(app, undef) {
    "use strict";

    app.views.MissionExecuteView = Backbone.View.extend({
        el: "#content",

        events: {
            "click #mission-execute": "execute"
        },

        initialize: function(options) {
            this.queue = [];
            this.on('mission.progress', this.onMissionProgress, this);
        },

        consume: function() {
            var action = this.queue.shift();
            if (action === undef) {
                return;
            }

            switch (action.type) {
              case 'complete':
                this._missionCompleteView.show();
                break;
              case 'levelup':
                this._levelupView.show();
                break;
              case 'obstrcution':
                this._obstructionView.show();
                break;
              case 'redirect':
                app.redirect(action.url);
                break;
            }
        },

        render: function() {
            var tmpl = app.template("mission/execute");
            $(this.el).html(tmpl(this.data));

            this._levelupView = new app.views.LevelupPopupView({
                el: '#levelup-popup'
            });
            this._levelupView.render();
            this._levelupView.on('close', this.onDialogClosed ,this);

            this._missionCompleteView = new app.views.MissionCompletePopupView({
                el: '#mission-complete-popup'
            });
            this._missionCompleteView.render();
            this._missionCompleteView.on('close', this.onDialogClosed ,this);

            this._obstructionView = new app.views.MissionObstructionModalView({
                el: '#obstrcution-popup'
            });
            this._obstructionView.render();
            this._obstructionView.on('close', this.onDialogClosed ,this);

            return this;
        },

        execute: function(e) {
            var self = this;
            var player = this.data.player;
            var mission = this.data.mission;

            app.net.post('/api/mission/execute', {
                id: mission.id
            }).done(function(data) {
                player.set(data.player);
                mission.set(data.mission);
                self.trigger('mission.progress', data);
            }).fail(function(data) {
                alert("大変です！ミッションに失敗しました!");
            });
        },

        dataBind: function(data) {
            this.data = data;
        },

        onDialogClosed: function() {
            this.consume();
            return false;
        },

        onMissionProgress: function(data) {
            var self = this;
            var player = this.data.player;
            var mission = this.data.mission;
            var actions = data.actions || [];

            $('#mission-energy-value').text(player.escape('energy'));
            $('#mission-energy-max-value').text(player.escape('maxEnergy'));
            $('#mission-progress-value').text(mission.escape('progress'));

            actions.forEach(function(a) {
                self.queue.push(a);
            });

            if (self.queue.length > 0) {
                self.consume();
            }
        }
    });
}(App));
