module.exports = function(app) {
    app.get('/api/gacha', function(req, res) {
        var data = {
            cards: []
        };
        res.send(JSON.stringify(data));
    });

    app.get('/api/users/:user_id/gacha/box/:box_id', function(req, res) {
        var data = [
            {
                id: 1,
                name: "Card 1",
                rarity: 5,
                numerator: 0,
                denominator: 1
            },
            {
                id: 2,
                name: "Card 2",
                rarity: 4,
                numerator: 0,
                denominator: 3
            },
            {
                id: 3,
                name: "Card 3",
                rarity: 4,
                numerator: 0,
                denominator: 3
            },
            {
                id: 4,
                name: "Card 4",
                rarity: 3,
                numerator: 0,
                denominator: 10
            },
            {
                id: 5,
                name: "Card 5",
                rarity: 3,
                numerator: 0,
                denominator: 10
            }
        ];
        res.send(JSON.stringify(data));
    });
};
