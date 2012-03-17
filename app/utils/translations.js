(function(app) {
    var sprintf = app.utils.sprintf;

    _.extend(app.utils, {
        '_tr': function(key) {
            var first;
            var msgstr = I18N[key] || key;
            if (arguments.length < 2) {
                return msgstr;
            }

            first = arguments[1];
            if (_.isObject(first) || _.isArray(first)) {
                return sprintf(msgstr, first);
            } else {
                return sprintf(msgstr, Array.prototype.slice.call(arguments, 1));
            }
        }
    });
}(App));
