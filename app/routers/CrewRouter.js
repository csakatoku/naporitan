(function(app, undef) {
    "use strict";

    app.routers.CrewRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.CrewListView();
            view.render();
        },

        mergeAction: function() {
            var view = new app.views.CrewMergeListView();
            view.render();
        },

        mergeSelectAction: function() {
            var view = new app.views.CrewMergeSelectView();
            view.render();
        },

        sellAction: function() {
            var view = new app.views.CrewSellListView();
            view.render();
        },

        sellConfirmAction: function() {
            var view = new app.views.CrewSellView();
            view.render();
        },

        detailAction: function() {
            var view = new app.views.CrewDetailView();
            view.render();
        }
    });
}(App));
