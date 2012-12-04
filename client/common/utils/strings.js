// load: client/app.js
(function(app, undef) {
    "use strict";

    var snakeToPascal = function(str) {
        var i, x,
            seq = str.split('_'),
            result = '',
            length = seq.length;
        for (i = 0; i < length; i++) {
            x = seq[i];
            result += (x.charAt(0).toUpperCase() + x.substr(1));
        }
        return result;
    };

    var sprintfImpl = _.memoize(function(format) {
        var r = /(%(?:\([^)]+\))?[dfs%])/;
        var tokens = format.split(r);

        return function(params) {
            var buf = [];
            var idx = 0;
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                if (token === '%s' || token === '%d' || token == '%f') {
                    buf.push(params[idx]);
                    idx += 1;
                } else if (token === '%%') {
                    buf.push('%');
                } else if (token.charAt(0) === '%') {
                    var key = token.substr(2, token.length - 4);
                    buf.push(params[key]);
                } else {
                    if (token.length) {
                        buf.push(token);
                    }
                }
            }
            return buf.join('');
        };
    });

    _.extend(app.utils, {
        snakeToCamel: _.memoize(function(str) {
            var pascal = snakeToPascal(str);
            return pascal.charAt(0).toLowerCase() + pascal.substr(1);
        }),

        snakeToPascal: _.memoize(snakeToPascal),

        sprintf: function(format, params) {
            var impl = sprintfImpl(format);
            return impl(params);
        }
    });
}(App));
