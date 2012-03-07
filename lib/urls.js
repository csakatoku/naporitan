var fs = require('fs');
var express = require('express');
var gzippo = require('gzippo');
var redis = require('redis');

exports.configure = function(server, settings) {
    const ASSET_DIR = settings.ASSET_DIR;
    const DB = redis.createClient();

    server.use('/css', gzippo.staticGzip(ASSET_DIR + '/css'));
    server.use('/js', gzippo.staticGzip(ASSET_DIR + '/js'));
    server.use('/asset', express.static(ASSET_DIR + '/asset'));

    server.get('/', function(req, res) {
        res.render('index.html');
    });

    server.get('/api/users/@self', function(req, res) {
        var uid = 1; // TODO
        var key = 'user_' + uid;
        DB.get(key, function(err, value) {
            var user = JSON.parse(value);
            res.send(value);
        });
    });

    server.post('/api/users/@self', function(req, res) {
        var uid = 1; // TODO
        var key = 'user_' + uid;
        var player = new App.models.Player();
        var user = {
            player: player.toJSON()
        };
        var value = JSON.stringify(user);

        DB.set(key, value, function(err) {
            var result = err ? false : true;
            res.send(JSON.stringify({ result: result }));
        });
    });

    server.get('/api/gacha', function(req, res) {
        var timestamp = Date.now();

        Deferred
            .wait(3)
            .next(function() {
                var result = {
                    metadata: {
                        version: 1,
                        timestamp: timestamp
                    },
                    body: {
                        id: 1
                    }
                };
                res.send(JSON.stringify(result));
            });
    });
};
