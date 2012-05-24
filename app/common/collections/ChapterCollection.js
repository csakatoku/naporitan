(function(app, undef) {
    "use strict";

    app.collections.ChapterCollection = Backbone.Collection.extend({
        model: app.models.Chapter,

        getLatestChapter: function() {
            var models = this.models;
            return models[models.length - 1];
        }
    });
}(App));
