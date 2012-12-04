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
            url = ASSET_URL + 'js/fb-mock.js';
        } else {
            url = '//connect.facebook.net/en_US/all.js';
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
            args._path = function(name, args) {
                var components, router, buf;

                if (args) {
                    Object.keys(args).forEach(function(k) {
                        var needle = ':' + k;
                        name = name.replace(needle, args[k]);
                    });
                }

                components = name.split('/');
                router = components[0];

                buf = [];
                if (components[1] !== 'default') {
                    buf.push(components[1]);
                }

                if (components.length >= 2) {
                    buf.push.apply(buf, components.slice(2));
                }

                if (buf.length > 0) {
                    return '/' + router + '/#!/' + (buf.join('/'));
                } else {
                    return '/' + router + '/';
                }
            };

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

    p.boot = function(module, options) {
        var app = this;

        Object.keys(options.constants || {}).forEach(function(k) {
            globals[k] = options.constants[k];
        });

        Deferred.parallel([
            app.fbinit(options)
            //app.i18ninit(options),
            //app.protoinit(options)
        ]).next(function() {
            app.onFacebookInit(module);
        });
    };

    p.onFacebookInit = function(module) {
        // Initialize localStorage and sessionStorage
        this.localStorage = this.utils.getLocalStorage();
        this.sessionStorage = this.utils.getSessionStorage();

        // Initialize Game Data
        this.missions = new this.collections.MissionCollection(this.data.mission);
        this.chapters = new this.collections.ChapterCollection(this.data.chapter);

        // Initialize the Backbone router.
        var name = this.utils.snakeToPascal(module) + "Router";
        var routerClass = this.routers[name];
        if (routerClass) {
            this.rootView = new this.views.RootView().render();
            var router = this.router = new routerClass();
            router.initialize();
            Backbone.history.start();
        }
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
