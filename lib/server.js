var express = require('express');
var gzippo = require('gzippo');
var underscore = require('underscore');
var backbone = require('backbone');

GLOBAL.Deferred = require('./gen/jsdeferred.js').Deferred;
GLOBAL._ = underscore;
GLOBAL.Backbone = backbone;
var serverapp = require('./gen/server-app.js');
GLOBAL.App = serverapp.App;
var models = require('./gen/server-models.js');

var server = express.createServer();

var urls = require('./urls.js');
urls.configure(server, {
    ASSET_DIR: __dirname + '/../build'
});

server.listen(8000);
console.log('Server started http://localhost:8000/');
