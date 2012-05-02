// -*- jsconcat: 1000 -*-
(function(globals, undef) {
    var app = globals.App;

    app.boot({
        facebook: {
            appId: FB_APP_ID,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true
        }
    });
}(this));
