(function(App) {
    "use strict";

    var animationEnd = App.ANIMATION_END;

    App.views.LevelupPopupView = Backbone.View.extend({
        events: {
            'click .close-popup': 'close'
        },

        initialize: function(options) {
            this.el = options.el;
        },

        render: function() {
            var tmpl = App.template('_popup/levelup');
            $(this.el).html(tmpl());
            return this;
        },

        show: function() {
            $('#modal_overlay').show();
            $('.levelup-popup')
                .one(animationEnd, function() {
                    $('.levelup-popup .close-popup').show();
                })
                .addClass('levelup-popup-animation')
                .show()
            ;
        },

        close: function() {
            $('#modal_overlay').hide();
            $('.levelup-popup')
                .removeClass('levelup-popup-animation')
                .hide()
            ;
            $('.close-popup').hide();
        }
    });
}(App));
