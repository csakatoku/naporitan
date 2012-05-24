(function(app, undef) {
    "use strict";

    var gettext = app.utils._tr;

    app.models.Chapter = Backbone.Model.extend({
        initialize: function(args) {
            var id = args.id;
            this.set({
                name: gettext('<CHAPTER>chapter_name_' + id)
            });
        },

        getMissions: function() {
            var chapterId = this.get('id');
            var missions = app.missions.filter(function(x) {
                return x.get('chapterId') == chapterId;
            });
            return missions;
        },

        getProgress: function() {
            var missions = this.getMissions();
            return missions.map(function(x) {
                return x.get('progress');
            }).reduce(function(acc, value) {
                return acc + value;
            });
        },

        getMaxProgress: function() {
            var missions = this.getMissions();
            return missions.length * 100;
        },

        getPercent: function() {
            var missions = this.getMissions();
            var progress = this.getProgress();
            var maxProgress = this.getMaxProgress();
            return (progress / maxProgress) * 100;
        }
    });
}(App));
