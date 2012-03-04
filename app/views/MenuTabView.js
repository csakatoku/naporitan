(function(app) {
    "use strict";

    app.views.MenuTabView = Backbone.View.extend({
        hide: function() {
            $(".menu_tab").hide();
        },

        show: function() {
            $(".menu_tab").show();
        },

        render: function() {
            var tmpl = app.template('_partial/menu_tab');
            var content = tmpl();
            $(".menu_tab").html(content);
            return this;
        }
    });
}(App));
