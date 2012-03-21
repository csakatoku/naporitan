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
            $(this.el).html(this.template({
                mission: this.mission,
                crew: this.crew
            }));

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
            this.player.executeMission(this.mission);
            count += 1;
            console.log(count);

            if (count % 6 === 0) {
                this._missionCompleteView.show();
            } else if (count % 3 === 0) {
                this._levelupView.show();
            }

        },

        onMissionCompleteViewClosed: function() {
            app.redirect('mission/default');
            return false;
        }
    });
}(App));
