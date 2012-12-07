(function(App) {
    "use strict";

    var animationEnd = App.ANIMATION_END;

    App.views.MissionObstructionPopupView = Backbone.View.extend({
        events: {
            'click .close-popup': 'close'
        },

        render: function() {
            var tmpl = App.template('mission/obstruction');
            $(this.el).html(tmpl());
            return this;
        },

        show: function() {
            var self = this;
            self.$('.mission-popup')
                .one(animationEnd, function() {
                    self.$('.close-popup').show();
                })
                .addClass('mission-complete-popup-animation')
                .show()
            ;
        },

        close: function() {
            this.$('.mission-popup')
                .removeClass('mission-complete-popup-animation')
                .hide()
            ;
            this.$('.close-popup').hide();

            this.trigger('close', this);
        }
    });
}(App));
