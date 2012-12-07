(function(app, undef) {
    "use strict";

    app.routers.CashRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction'
        },

        defaultAction: function() {
            var view = new app.views.CashView();
            view.render();
        }
    });
}(App));
