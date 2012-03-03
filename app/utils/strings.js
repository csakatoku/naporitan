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

    _.extend(app.utils, {
        snakeToCamel: _.memoize(function(str) {
            var pascal = snakeToPascal(str);
            return pascal.charAt(0).toLowerCase() + pascal.substr(1);
        }),

        snakeToPascal: _.memoize(snakeToPascal)
    });
}(App));
