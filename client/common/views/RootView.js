/*global window:true */
(function(app) {
    "use strict";

    app.views.RootView = Backbone.View.extend({
        initialize: function(options) {
            this.menuTabFooter = new app.views.MenuTabView({
                el: '#menu-tab-footer'
            });

            this.menu = new app.views.MenuView({
                el: '#menu'
            });

            this.menu.on('close', function(view) {
                this.hideMenu();
            }, this);
        },

        scrollToTop: function() {
            window.setTimeout(function() {
                window.scroll(0, 1);
            }, 0);
        },

        startIndicator: function() {
            $('#loading-indicator').addClass('on');
        },

        stopIndicator: function() {
            $('#loading-indicator').removeClass('on');
        },

        hideMenuTab: function() {
            this.menuTabFooter.hide();
        },

        showMenuTab: function() {
            this.menuTabFooter.show();
        },

        showMenu: function() {
            $('#modal-overlay').show();
            this.menu.show();
        },

        hideMenu: function() {
            $('#modal-overlay').hide();
            this.menu.hide();
        },

        render: function() {
            this.menuTabFooter.render();
            this.menu.render();
            return this;
        }
    });
}(App));
