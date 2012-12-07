(function(App) {
    "use strict";

    var animationEnd = App.ANIMATION_END;

    App.views.LevelupPopupView = Backbone.View.extend({
        events: {
            'click .close-popup': 'close'
        },

        render: function() {
            var tmpl = App.template('mission/levelup');
            this.$el.html(tmpl());
            return this;
        },

        show: function() {
            this.$('.mission-popup')
                .one(animationEnd, function() {
                    $('.mission-popup .close-popup').show();
                })
                .addClass('levelup-popup-animation')
                .show()
            ;
        },

        close: function() {
            this.$('.mission-popup')
                .removeClass('levelup-popup-animation')
                .hide()
            ;
            this.$('.close-popup').hide();

            this.trigger('close', this);
        }
    });
}(App));
