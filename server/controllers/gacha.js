
module.exports = function(app) {
    var db = {};

    app.post('/api/users/:user_id/gacha/box/:box_id', function(req, res) {
        var userId = req.params.user_id;
        var boxId = req.params.box_id;
        var gachaId = req.body.gacha_id;
        var multiple = ('true' === req.body.multiple) ? true : false;

        var times = multiple ? 10 : 1;
        var cards = [];

        var box = db[userId] || initializeGachaBox(userId, boxId);
        var length = box.length;

        for (var i = 0; i < times; i ++) {
            var idx = Math.floor(Math.random() * length);
            var row = box[idx];
            row.numerator += 1;

            cards.push({
                id     : row.id,
                name   : "Card " + row.id,
                attack : row.rarity * 1000,
                defense: row.rarity * 800,
                rarity : row.rarity
            });
        }

        var data = {
            cards: cards
        };
        res.send(JSON.stringify(data));
    });

    app.get('/api/users/:user_id/gacha/box/:box_id', function(req, res) {
        var userId = req.params.user_id;
        var boxId = req.params.box_id;
        var data = [];
        var src = db[userId] || initializeGachaBox(userId, boxId);

        src.forEach(function(row) {
            data.push({
                id         : row.id,
                name       : "Card " + row.id,
                rarity     : row.rarity,
                numerator  : row.numerator,
                denominator: row.denominator
            });
        });

        res.send(JSON.stringify(data));
    });

    // private methods
    var initializeGachaBox = function(userId, boxId) {
        var i, r, rarity, num, denom;
        var box = [];
        for (i = 0; i < 100; i++) {
            r = Math.random() * 100;
            if (r < 2) {
                rarity = 5;
                num    = 0;
                denom  = 1;
            } else if (r >= 2 && r < 10) {
                rarity = 4;
                num    = 0;
                denom  = 3;
            } else if (r >= 15 && r < 40) {
                rarity = 3;
                num    = 0;
                denom  = 10;
            } else if (r >= 40 && r < 70) {
                rarity = 2;
                num    = 0;
                denom  = 50;
            } else {
                rarity = 1;
                num    = 0;
                denom  = 50;
            }

            box.push({
                id: i + 1,
                rarity: rarity,
                numerator: num,
                denominator: denom
            });
        }

        db[userId] = box.sort(function(a, b) {
            return a.rarity < b.rarity;
        });

        return box;
    };
};
