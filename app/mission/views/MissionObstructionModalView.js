(function(App) {
    "use strict";

    var animationEnd = App.ANIMATION_END;

    App.views.MissionObstructionModalView = Backbone.View.extend({
        events: {
            'click .modal': 'close'
        },

        initialize: function(options) {
            this.el = options.el;
        },

        render: function() {
            var tmpl = App.template('mission/obstruction');
            $(this.el).html(tmpl());
            return this;
        },

        show: function() {
            var self = this;
            $('#modal_overlay').show();
            self.$('.modal')
                .one(animationEnd, function() {
                    self.$('.close-popup').show();
                })
                .addClass('mission-complete-popup-animation')
                .show()
            ;
        },

        close: function() {
            $('#modal_overlay').hide();
            this.$('.modal')
                .removeClass('mission-complete-popup-animation')
                .hide()
            ;
            this.$('.close-popup').hide();

            this.trigger('close', this);
        }
    });
}(App));
