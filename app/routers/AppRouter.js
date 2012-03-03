(function(app, undef) {
    "use strict";

    app.routers.AppRouter = Backbone.Router.extend({
        routes: {
            "*location": "dispatch"
        },

        dispatch: function(location) {
            // For backward compatibility
            if (location.indexOf("!") === 0) {
                location = location.substr(1);
            }

            var routeAndAction, params;
            var pos = location.indexOf("/-/");
            if (pos >= 0) {
                routeAndAction = location.substr(0, pos);
                params = location.substr(pos + 3).split("/");
            } else {
                routeAndAction = location;
                params = {};
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
            router = app.utils.snakeToPascal(router || "top");
            action = app.utils.snakeToCamel(action || "default");

            routerName = router + "Router";
            actionName = action + "Action";

            klass = app.routers[routerName];
            if (klass) {
                instance = new klass();
                if (actionName in instance) {
                    instance[actionName].apply(instance, args);
                    return;
                }
            }

            alert("大変です!" + routerName + "." + actionName + "が存在しません!");
        },

        reverse: function(name, args) {
            var matcher, router, action;
            if (name.indexOf('_') === -1) {
                router = name;
                action = "default";
            } else {
                matcher = name.match(/([a-zA-Z0-9]+)_(.+)/);
                if (matcher) {
                    router = matcher[1];
                    action = matcher[2];
                } else {
                    router = "top";
                    action = "default";
                }
            }

            var buf = [];
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    buf.push(k + "/" + args[k]);
                }
            }
            if (buf.length) {
                return '#/' + router + "/" + action  + "/-/" + (buf.join(''));
            } else {
                return '#/' + router ; "/" + action;
            }
        }
    });
}(App));
