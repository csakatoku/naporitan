(function(app, undef) {
    "use strict";

    app.routers.MissionRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.MissionListView();
            view.render();
        },

        executeAction: function() {
            var view = new app.views.MissionExecuteView();
            view.render();
        }
    });
}(App));
