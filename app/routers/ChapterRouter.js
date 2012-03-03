(function(app, undef) {
    "use strict";

    app.routers.ChapterRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.ChapterListView();
            view.render();
        }
    });
}(App));
