(function(app, undef) {
    "use strict";

    app.views.TopView = Backbone.View.extend({
        events: {
            'click .facebook-login': 'onFacebookLogin'
        },

        render: function() {
            var tmpl = app.template('top/index');
            $(this.el).html(tmpl({
                uid: app.uid
            }));
            return this;
        },

        onFacebookLogin: function() {
            var self = this;
            FB.login(function(response) {
                app.uid = FB.getUserID();
                self.render();
            });
        }
    });
}(App));
