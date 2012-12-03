(function(app, undef) {
    "use strict";

    app.routers.TopRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction'
        },

        defaultAction: function() {
            var view = new app.views.TopView();
            view.render();
            app.rootView.hideMenuTab();
        }
    });
}(App));
