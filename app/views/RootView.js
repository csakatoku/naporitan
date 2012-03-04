(function(app) {
    "use strict";

    app.views.RootView = Backbone.View.extend({
        el: "#container",

        initialize: function(options) {
            this.menuTab = new app.views.MenuTabView();
        },

        hideMenuTab: function() {
            this.menuTab.hide();
        },

        showMenuTab: function() {
            this.menuTab.show();
        },

        render: function() {
            var tmpl = app.template('_root');
            $(this.el).html(tmpl());

            this.menuTab.render();

            return this;
        }
    });
}(App));
