(function(App) {
    "use strict";

    var animationEnd = App.ANIMATION_END;

    App.views.MissionCompletePopupView = Backbone.View.extend({
        events: {
            'click .close-popup': 'close'
        },

        initialize: function(options) {
            this.el = options.el;
        },

        render: function() {
            var tmpl = App.template('_popup/mission_complete');
            $(this.el).html(tmpl());
            return this;
        },

        show: function() {
            $('#modal_overlay').show();
            $('.mission-complete-popup')
                .one(animationEnd, function() {
                    $('.mission-complete-popup .close-popup').show();
                })
                .addClass('mission-complete-popup-animation')
                .show()
            ;
        },

        close: function() {
            $('#modal_overlay').hide();
            $('.mission-complete-popup')
                .removeClass('mission-complete-popup-animation')
                .hide()
            ;
            $('.close-popup').hide();

            this.trigger('close');
        }
    });
}(App));
