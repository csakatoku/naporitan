(function(app, undef) {
    "use strict";

    app.views.GachaResultView = Backbone.View.extend({
        el: "#content",

        template: app.template('gacha/result'),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
