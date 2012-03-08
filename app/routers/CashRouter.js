(function(app, undef) {
    "use strict";

    app.routers.CashRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.CashView();
            view.render();
            app.rootView.showMenuTab();
        }
    });
}(App));
