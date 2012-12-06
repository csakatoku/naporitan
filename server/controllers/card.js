module.exports = function(app) {
    "use strict";

    app.get('/api/users/:user_id/cards', function(req, res) {
        var cards = [];
        var i = 0;
        var rarity, category, path;
        for (i = 1; i <= 50; i++) {
            rarity = Math.floor(Math.random() * 5);
            category = Math.floor(Math.random() * 3) + 1;
            cards.push({
                id     : i,
                name   : "Card " + i,
                attack : rarity * 1000,
                defense: rarity * 800,
                rarity : rarity,
                category: category,
                level: 1,
                cost: rarity * 5
            });
        }
        res.send(JSON.stringify(cards));
    });
};
