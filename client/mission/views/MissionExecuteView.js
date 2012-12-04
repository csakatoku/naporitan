/*global alert:true */
(function(app, undef) {
    "use strict";

    // TODO
    // レベルアップとミッション完了を表示するためにとりあえず追加
    var count = 0;

    app.views.MissionExecuteView = Backbone.View.extend({
        el: "#content",

        template: app.template("mission/do"),

        events: {
            "click #mission-execute": "execute"
        },

        render: function() {
            $(this.el).html(this.template(this.data));

            this._levelupView = new app.views.LevelupPopupView({
                el: '#levelup-popup'
            });
            this._levelupView.render();

            this._missionCompleteView = new app.views.MissionCompletePopupView({
                el: '#mission-complete-popup'
            });
            this._missionCompleteView.render();
            this._missionCompleteView.on('close', this.onMissionCompleteViewClosed ,this);

            return this;
        },

        execute: function(e) {
            var self = this;
            var player = this.data.player;
            var mission = this.data.mission;

            app.net.post('/api/mission/execute', {
                id: mission.id
            }).done(function(data) {
                player.executeMission(mission);
                count += 1;

                if (count % 6 === 0) {
                    self._missionCompleteView.show();
                } else if (count % 3 === 0) {
                    self._levelupView.show();
                }

            }).fail(function(data) {
                alert("大変です！ミッションに失敗しました!");
            });
        },

        dataBind: function(data) {
            this.data = data;
        },

        onMissionCompleteViewClosed: function() {
            app.redirect('mission/default');
            return false;
        }
    });
}(App));
