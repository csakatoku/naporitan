(function(app, undef) {
    "use strict";

    app.routers.HomeRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/': 'defaultAction'
        },

        defaultAction: function() {
            var view = new app.views.HomeView({
                el: '#content'
            });
            view.render();
        }
    });
}(App));
