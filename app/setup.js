(function(globals, undefined) {
    var app = globals.App;

    globals.ASSET_URL = "";
    globals.MAX_SKILL_LEVEL = 34;
    globals.FB_APP_ID = '308583929203107';
    globals['__DEBUG__'] = true;

    app.boot({
        facebook: {
            appId: FB_APP_ID,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true
        },

        configs: [
            'proto/chapter.json',
            'proto/mission.json',
            'proto/card_1.json',
            'proto/card_2.json',
            'proto/card_3.json',
            'proto/card_4.json',
            'proto/card_5.json'
        ]
    });
}(this));
