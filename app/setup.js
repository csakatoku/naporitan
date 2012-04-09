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
        },

        configs: [
            'asset/proto/chapter.json',
            'asset/proto/mission.json',
            'asset/proto/card_1.json',
            'asset/proto/card_2.json',
            'asset/proto/card_3.json',
            'asset/proto/card_4.json',
            'asset/proto/card_5.json',
            'template.json'
        ]
    });
}(this));
