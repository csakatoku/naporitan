(function(app, undef) {
    "use strict";

    app.routers.TopRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.TopView();
            view.render();
        }
    });
}(App));
