(function(app) {
    "use strict";

    app.views.MenuTabView = Backbone.View.extend({
        events: {
            'click .menu_tab_other': 'onTabOtherClicked'
        },

        initialize: function(options) {
            this.el = options.el;
        },

        onTabOtherClicked: function() {
            app.rootView.showMenuDial();
            return false;
        },

        hide: function() {
            $(".menu_tab").hide();
        },

        show: function() {
            $(".menu_tab").show();
        },

        render: function() {
            var tmpl = app.template('_partial/menu_tab');
            $(this.el).html(tmpl());
            return this;
        }
    });
}(App));
