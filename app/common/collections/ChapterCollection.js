(function(app, undef) {
    "use strict";

    app.collections.ChapterCollection = Backbone.Collection.extend({
        model: app.models.Chapter
    });
}(App));
