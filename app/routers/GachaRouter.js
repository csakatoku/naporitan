(function(app, undef) {
    "use strict";

    app.routers.GachaRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.GachaListView();
            view.render();
            app.rootView.showMenuTab();
        },

        resultAction: function() {
            var view = new app.views.GachaResultView();
            view.render();
            app.rootView.showMenuTab();
        }
    });
}(App));
