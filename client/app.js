/*global FB:true */
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
        var deferred = new _.Deferred();
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

            deferred.resolve();
        };

        self.utils.loadScript(url);
        return deferred;
    };

    p.template =  function(name) {
        var self = this;

        return function(args) {
            var tmpl;
            if (name in compiledTemplates) {
                tmpl = compiledTemplates[name];
            } else {
                tmpl = compiledTemplates[name] = _.template(globals._T[name]);
            }

            // Helper functions
            args = args || {};
            args._path = function(name, args) {
                return self.resolveRoute(name, args);
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

        app.fbinit(options)
            .done(function() {
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
        var RouterClass = this.routers[name];
        if (RouterClass) {
            this.popupQueue = new this.utils.PopupQueue();
            this.rootView = new this.views.RootView().render();
            var router = this.router = new RouterClass();
            Backbone.history.start();
        }
    };

    p.redirect = function(name, params, options) {
        var path = this.resolveRoute(name, params);
        globals.location.href = path;
    };

    p.resolveRoute = function(name, args) {
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

    // TODO
    p.ANIMATION_END = 'webkitAnimationEnd';

    globals.App = new Application();
}(this));
