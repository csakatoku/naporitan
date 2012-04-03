(function(globals, undef) {
    "use strict";

    var compiledTemplates = {};

    var fbinit = function(app, options) {
        var deferred = new Deferred();
        var url;

        if (__DEBUG__) {
            url = ASSET_URL + '/js/fb-mock.js';
        } else {
            url = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        }

        // Facebook
        globals.fbAsyncInit = function() {
            FB.init(options.facebook);

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

    var i18ninit = function(app) {
        var deferred = new Deferred();
        var url = 'js/ja.json';

        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                _.keys(data).forEach(function(key) {
                    var msg = data[key];
                    app.I18N[key] = msg || key;
                });
                deferred.call();
            }
        });
        return deferred;
    };

    var protoinit = function(app, options) {
        var proto_get = function(url) {
            var deferred = new Deferred();
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(res) {
                    var type = res.type;
                    var data = res.data;
                    var seq = app.data[type] || [];
                    data.forEach(function(datum) {
                        var frozen = Object.freeze(datum);
                        seq.push(frozen);
                    });

                    seq.sort(function(a, b) {
                        return a.id - b.id;
                    });
                    app.data[type] = seq;

                    deferred.call();
                }
            });
            return deferred;
        };

        var configs = options.configs || [];
        return Deferred.parallel(configs.map(proto_get));
    };

    var App = globals.App = {
        _player: undef,

        uid: 0,

        I18N: {},
        data: {},
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

        boot: function(options) {
            var app = this;
            Deferred.parallel([
                fbinit(app, options),
                i18ninit(app, options),
                protoinit(app, options)
            ]).next(function() {
                app.onFacebookInit();
            });
        },

        onFacebookInit: function() {
            // Initialize localStorage and sessionStorage
            this.localStorage = this.utils.getLocalStorage();
            this.sessionStorage = this.utils.getSessionStorage();

            // Initialize Game Data
            this.missions = new this.collections.MissionCollection(this.data.mission);
            this.chapters = new this.collections.ChapterCollection(this.data.chapter);

            // Initialize the Backbone router.
            this.router = new this.routers.AppRouter();
            this.router.boot();

            Backbone.history.start();
        }
    };

    App.redirect = function(name, params, options) {
        var hash = App.router.reverse(name, params);
        Backbone.history.navigate(hash, options);
        return Backbone.history.loadUrl(hash);
    };

    // TODO
    App.ANIMATION_END = 'webkitAnimationEnd';
}(this));
