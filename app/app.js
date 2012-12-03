// -*- jsconcat: 1 -*-
(function(globals, undef) {
    "use strict";

    var compiledTemplates = {};

    var Application = function() {
        var self = this;

        ['I18N', 'data', 'templates',
         'utils', 'views', 'models', 'collections', 'routers'].forEach(function(module) {
             self[module] = {};
         });

        this._player = undef;
        this.uid = 0;
    };

    _.extend(Application.prototype, Backbone.Events);

    var p = Application.prototype;

    p.fbinit = function(options) {
        var self = this;
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

            self.uid = FB.getUserID();

            FB.Event.subscribe('auth.authResponseChange', function(res) {
                if (__DEBUG__) {
                    console.log(res);
                }
            });

            deferred.call();
        };

        self.utils.loadScript(url);
        return deferred;
    };

    p.i18ninit = function() {
        var self = this;
        var deferred = new Deferred();
        var url = 'js/ja.json';

        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                _.keys(data).forEach(function(key) {
                    var msg = data[key];
                    self.I18N[key] = msg || key;
                });
                deferred.call();
            }
        });
        return deferred;
    };

    p.protoinit = function(options) {
        var self = this;
        var proto_get = function(url) {
            var deferred = new Deferred();
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(res) {
                    var type = res.type;
                    var data = res.data;
                    var seq = self.data[type] || [];
                    data.forEach(function(datum) {
                        var frozen = Object.freeze(datum);
                        seq.push(frozen);
                    });

                    seq.sort(function(a, b) {
                        return a.id - b.id;
                    });
                    self.data[type] = seq;

                    deferred.call();
                }
            });
            return deferred;
        };

        var configs = options.configs || [];
        return Deferred.parallel(configs.map(proto_get));
    };

    p.template =  function(name) {
        var self = this;

        return function(args) {
            var tmpl;
            if (name in compiledTemplates) {
                tmpl = compiledTemplates[name];
            } else {
                tmpl = compiledTemplates[name] = _.template(globals['_T'][name]);
            }

            // Helper functions
            args = args || {};
            args._path = self.router.reverse;

            // I18N functions
            args._tr = self.utils._tr;

            // Global Variables
            args.ASSET_URL = ASSET_URL;

            return tmpl(args);
        };
    };

    p.getPlayer = function() {
            if (this._player === undef) {
                this._player = new this.models.Player();
            }
            return this._player;
    };

    p.boot = function(options) {
        var app = this;
        Deferred.parallel([
            app.fbinit(options)
            //app.i18ninit(options),
            //app.protoinit(options)
        ]).next(function() {
            app.onFacebookInit();
        });
    };

    p.onFacebookInit = function() {
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
    };

    p.redirect = function(name, params, options) {
        var hash = App.router.reverse(name, params);
        Backbone.history.navigate(hash, options);
        return Backbone.history.loadUrl(hash);
    };

    // TODO
    p.ANIMATION_END = 'webkitAnimationEnd';

    globals.App = new Application();
}(this));
