module.exports = function(app) {
    app.get('/api/gacha', function(req, res) {
        var data = {
            cards: []
        };
        res.send(JSON.stringify(data));
    });
};
