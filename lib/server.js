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

server.configure(function() {
    server.set('views', __dirname + '/views');
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
});

server.configure('development', function() {
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function() {
    server.use(express.errorHandler());
});

server.register('.html', {
    compile: function(str, options) {
        var tmpl = underscore.template(str);
        return function(locals) {
            return tmpl(locals);
        };
    }
});

var urls = require('./urls.js');
urls.configure(server, {
    ASSET_DIR: __dirname + '/../build'
});

server.listen(8000);
console.log('Server started http://localhost:8000/');
