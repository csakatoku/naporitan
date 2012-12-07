(function(app) {
    "use strict";

    app.views.MenuTabView = Backbone.View.extend({
        events: {
            'click .menu_tab_other': 'onTabOtherClicked'
        },

        onTabOtherClicked: function() {
            app.rootView.showMenu();
            return false;
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        },

        render: function() {
            var tmpl = app.template('_partial/menu_tab');
            $(this.el).html(tmpl());
            return this;
        }
    });
}(App));
