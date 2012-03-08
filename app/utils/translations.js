(function(app) {
    _.extend(app.utils, {
        '_tr': function(key, params) {
            return I18N[key] || key;
        }
    });
}(App));
