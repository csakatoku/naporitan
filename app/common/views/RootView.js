(function(app) {
    "use strict";

    app.views.RootView = Backbone.View.extend({
        el: "#container",

        events: {
            'click #menu_dial': 'onMenuDialClicked',
            'click #menu_dial .menu_dial_element': 'onMenuDialClicked'
        },

        initialize: function(options) {
            //
        },

        scrollToTop: function() {
            setTimeout(function() {
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
            this.menuTab.hide();
        },

        showMenuTab: function() {
            this.menuTab.show();
        },

        showMenuDial: function() {
            $('#modal_overlay').show();
            $('#menu_dial').show();
        },

        hideMenuDial: function() {
            $('#modal_overlay').hide();
            $('#menu_dial').hide();
        },

        onMenuDialClicked: function(e) {
            var href = $(e.target).attr('href');
            this.hideMenuDial();
            return (href && href.length) ? true : false;
        },

        render: function() {
            var tmpl = app.template('_root');
            $(this.el).html(tmpl());

            this.menuTab = new app.views.MenuTabView({
                el: '.menu_tab'
            });
            this.menuTab.render();

            return this;
        }
    });
}(App));