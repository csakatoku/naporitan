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

                // I18N functions
                args._tr = app.utils._tr;

                // Global Variables
                args.ASSET_URL = ASSET_URL;

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

            var fbinit = function() {
                var deferred = new Deferred();
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

                    deferred.call();
                };

                app.utils.loadScript(url);
                return deferred;
            };

            var i18ninit = function() {
                var deferred = new Deferred();
                var url = 'js/ja.json';
                $.ajax({
                    url: url,
                    dataType: 'json',
                    success: function(data) {
                        var I18N = globals.I18N;
                        _.keys(data).forEach(function(key) {
                            var msg = data[key];
                            I18N[key] = msg || key;
                        });
                        deferred.call();
                    }
                });
                return deferred;
            };

            Deferred.parallel([
                fbinit(),
                i18ninit()
            ]).next(function() {
                app.onFacebookInit();
            });
        },

        onFacebookInit: function() {
            // Initialize the Backbone router.
            this.router = new this.routers.AppRouter();
            this.router.boot();

            Backbone.history.start();
        }
    };
}(this));
