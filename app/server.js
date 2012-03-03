var express = require('express');
var underscore = require('underscore');
var backbone = require('backbone');

GLOBAL._ = underscore;
GLOBAL.Backbone = backbone;
var serverapp = require('./server-app.js');
GLOBAL.App = serverapp.App;
var models = require('./server-models.js');

var server = express.createServer();

server.use('/css', express.static(__dirname + '/../css'));
server.use('/js', express.static(__dirname + '/../js'));
server.use('/asset', express.static(__dirname + '/../asset'));

server.get('/', function(req, res) {
    var fs = require('fs');
    fs.readFile(__dirname + '/../index.html', function(err, data) {
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.send(data);
    });
});

server.get('/me', function(req, res) {
    var player = App.getPlayer();
    res.send(player.toJSON());
});

server.listen(8000);
console.log('Server started http://localhost:8000/');
