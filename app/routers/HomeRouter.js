(function(app, undef) {
    "use strict";

    app.routers.HomeRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.HomeView();
            view.render();
        }
    });
}(App));
