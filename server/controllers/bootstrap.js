module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index.html', {
            module: 'top',
            ASSET_URL: '/'
        });
    });

    app.get('/gacha/', function(req, res) {
        res.render('index.html', {
            module: 'gacha',
            ASSET_URL: '/'
        });
    });
};
