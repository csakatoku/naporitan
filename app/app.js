(function(globals, undef) {
    "use strict";

    var compiledTemplates = {};

    globals.App = {
        _player: undef,

        uid: 0,

        utils: {},
        views: {},
        models: {},
        collections: {},
        routers: {},
        templates: {},

        template: function(name) {
            var app = this;

            return function(args) {
                var tmpl;
                if (name in compiledTemplates) {
                    tmpl = compiledTemplates[name];
                } else {
                    tmpl = compiledTemplates[name] = _.template(app.templates[name]);
                }

                // Helper functions
                args = args || {};
                args._path = app.router.reverse;

                return tmpl(args);
            };
        },

        getPlayer: function() {
            if (this._player === undef) {
                this._player = new this.models.Player();
            }
            return this._player;
        },

        boot: function() {
            var app = this;
            var url = document.location.protocol + '//connect.facebook.net/en_US/all.js';

            // Facebook
            globals.fbAsyncInit = function() {
                FB.init({
                    appId: FB_APP_ID,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true
                });

                app.uid = FB.getUserID();

                FB.Event.subscribe('auth.authResponseChange', function(res) {
                    if (__DEBUG__) {
                        console.log(res);
                    }
                });

                app.onFacebookInit();
            };

            app.utils.loadScript(url);
        },

        onFacebookInit: function() {
            // Initialize the Backbone router.
            this.router = new this.routers.AppRouter();
            this.router.boot();

            Backbone.history.start();
        }
    };
}(this));
