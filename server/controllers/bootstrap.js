module.exports = function(app) {
    var constants;

    if ('production' === process.env.NODE_ENV) {
        constants= {
            'ASSET_URL': 'http://s3-us-west-1.amazonaws.com/perezvon/naporitan',
            'FB_APP_ID': '308583929203107',
            'MAX_SKILL_LEVEL': 34,
            '__DEBUG__': false
        };
    } else {
        constants= {
            'ASSET_URL': '/',
            'FB_APP_ID': '308583929203107',
            'MAX_SKILL_LEVEL': 34,
            '__DEBUG__': true
        };
    }

    var context = function(extra) {
        var settings = {
            constants: constants,

            facebook: {
                appId: constants.FB_APP_ID,
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
        };
        var ctx = {};

        Object.keys(extra).forEach(function(k) {
            ctx[k] = extra[k];
        });

        Object.keys(constants).forEach(function(k) {
            ctx[k] = constants[k];
        });

        ctx['BOOTSTRAP_DATA'] = JSON.stringify(settings);
        return ctx;
    };

    app.get('/', function(req, res) {
        res.render('index.html', context({
            module: 'top'
        }));
    });

    ['top', 'home', 'mission', 'gacha', 'item', 'card'].forEach(function(mod) {
        app.get('/' + mod + '/', function(req, res) {
            res.render(mod + '.html', context({
                module: mod
            }));
        });
    });
};
