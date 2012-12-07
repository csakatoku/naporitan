module.exports = function(app) {
    app.get('/api/users/:user_id/chapters', function(req, res) {
        var data = [
            {
                "id": 1
            },
            {
                "id": 2
            }
        ];
        res.send(JSON.stringify(data));
    });

    app.get('/api/users/:user_id/missions', function(req, res) {
        var data = [
            {
                "id": 1,
                "chapterId": 1,
                "xp": 1,
                "energy": 1,
                "minCoins": 1,
                "maxCoins": 2
            },
            {
                "id": 2,
                "chapterId": 1,
                "xp": 2,
                "energy": 2,
                "minCoins": 3,
                "maxCoins": 4
            },
            {
                "id": 3,
                "chapterId": 1,
                "xp": 3,
                "energy": 3,
                "minCoins": 4,
                "maxCoins": 8
            },

            {
                "id": 4,
                "chapterId": 2,
                "xp": 4,
                "energy": 4,
                "minCoins": 8,
                "maxCoins": 10
            },
            {
                "id": 5,
                "chapterId": 2,
                "xp": 2,
                "energy": 2,
                "minCoins": 3,
                "maxCoins": 4
            },
            {
                "id": 6,
                "chapterId": 2,
                "xp": 3,
                "energy": 3,
                "minCoins": 4,
                "maxCoins": 8
            }
        ];
        res.send(JSON.stringify(data));
    });

    app.post('/api/users/:user_id/missions/:mission_id', function(req, res) {
        var missionId = req.params.mission_id;
        var data = [{
            id: missionId
        }];
        res.send(JSON.stringify(data));
    });
};
