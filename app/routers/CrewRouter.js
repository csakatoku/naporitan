(function(app, undef) {
    "use strict";

    app.routers.CrewRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.CrewListView();
            view.render();
            app.rootView.showMenuTab();
        },

        mergeAction: function() {
            var view = new app.views.CrewMergeListView();
            view.render();
            app.rootView.showMenuTab();
        },

        mergeSelectAction: function() {
            var view = new app.views.CrewMergeSelectView();
            view.render();
            app.rootView.showMenuTab();
        },

        sellAction: function() {
            var view = new app.views.CrewSellListView();
            view.render();
            app.rootView.showMenuTab();
        },

        sellConfirmAction: function() {
            var view = new app.views.CrewSellView();
            view.render();
            app.rootView.showMenuTab();
        },

        detailAction: function() {
            var view = new app.views.CrewDetailView();
            view.render();
            app.rootView.showMenuTab();
        }
    });
}(App));
