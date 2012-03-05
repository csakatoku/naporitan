(function(app, undef) {
    "use strict";

    var DEFAULT_ROUTER = 'top';
    var DEFAULT_ACTION = 'default';

    app.routers.AppRouter = Backbone.Router.extend({
        routes: {
            "*location": "dispatch"
        },

        boot: function() {
            app.rootView = new app.views.RootView();
            app.rootView.render();
        },

        dispatch: function(location) {
            var routeAndAction, params;
            var pos = location.indexOf("/-/");
            if (pos >= 0) {
                routeAndAction = location.substr(0, pos);
                params = location.substr(pos + 3).split("/");
            } else {
                routeAndAction = location;
                params = [];
            }

            if (params.length === 0) {
                if (/\/$/.test(location) === false) {
                    var canonical = '#' + location + '/';
                    Backbone.history.navigate(canonical, {
                        replace: true
                    });
                }
            }

            var components = routeAndAction.split("/").filter(function(x) {
                return x.length > 0;
            });
            var length = components.length;
            var route, action;
            if (length > 1) {
                route = components[0];
                action = components[1];
            } else if (length > 0) {
                route = components[0];
            }

            var args = {};
            for (var i = 0; i < params.length; i += 2) {
                var k = params[i];
                var v = params[i + 1];
                args[k] = v;
            }

            this._dispatch(route, action, args);
        },

        _dispatch: function(router, action, args) {
            var routerName, actionName, klass, instance;
            router = app.utils.snakeToPascal(router || DEFAULT_ROUTER);
            action = app.utils.snakeToCamel(action || DEFAULT_ACTION);

            routerName = router + "Router";
            actionName = action + "Action";

            klass = app.routers[routerName];
            if (klass) {
                // TODO
                // 本当にここでガードするべきなのか？
                if (klass !== app.routers.TopRouter && !FB.getUserID()) {
                    Backbone.history.navigate('#/', {
                        replace: true
                    });
                    klass = app.routers.TopRouter;
                    actionName = 'defaultAction';
                }

                instance = new klass();
                if (actionName in instance) {
                    instance[actionName].call(instance, args);

                    // TODO
                    // ここで呼ぶべきなのか？
                    app.rootView.scrollToTop();

                    return;
                }
            }

            alert("大変です!" + routerName + "." + actionName + "が存在しません!");
        },

        reverse: function(name, args) {
            var matcher, router, action;

            var components = name.split('/');
            router = components[0];
            action = (components[1] === DEFAULT_ACTION) ? null : components[1];

            var buf = [];
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    buf.push(k);
                    buf.push(args[k]);
                }
            }

            var hasArgs;
            if (buf.length) {
                hasArgs = true;
                buf.unshift('-');
            } else {
                hasArgs = false;
            }

            if (action) {
                buf.unshift(action);
            }

            buf.unshift(router);

            return '#/' + (buf.join('/')) + (hasArgs ? '' : '/');
        }
    });
}(App));
