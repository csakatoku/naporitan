(function(App) {
    "use strict";

    App.routers.Router = Backbone.Router.extend({
        initialize: function() {
            var self = this;
            this._views = {};

            this.initializeViews();

            _.values(this).forEach(function(view) {
                if (view instanceof Backbone.View) {
                    self._views[view.cid] = view;
                    view.active = function() {
                        self._activateView(view.cid);
                        return view;
                    };
                }
            });
        },

        initializeViews: function() {
            // override
        },

        _activateView: function(viewId) {
            _.values(this._views).forEach(function(view) {
                if (view.el !== undefined) {
                    if (view.cid === viewId) {
                        view.$el.show();
                    } else {
                        view.$el.hide();
                    }
                }
            });
        }
    });
}(App));
