var express = require('express');
var underscore = require('underscore');
var backbone = require('backbone');

GLOBAL._ = underscore;
GLOBAL.Backbone = backbone;
var serverapp = require('./server-app.js');
GLOBAL.App = serverapp.App;
var models = require('./server-models.js');

var server = express.createServer();

server.get('/', function(req, res) {
    var data = JSON.stringify({
        'version': '1'
    });
    res.send(data);
});

server.get('/me', function(req, res) {
    var player = App.getPlayer();
    res.send(player.toJSON());
});

server.listen(8000);
console.log('Server started http://localhost:8000/');
