var express= require('express'),
    consolidate = require('consolidate'),
    swig = require('swig')
;

var app = module.exports = express();

var VIEW_DIR   = __dirname + '/server/views',
    PUBLIC_DIR = __dirname + '/server/public'
;

// Initialize views
swig.init({
    root: VIEW_DIR,
    allowErrors: true
});
app.set('views', VIEW_DIR);

app.engine('.html', consolidate.swig);
app.set('view engine', 'html');

// Initialize middleware
app.use(express.static(PUBLIC_DIR));
app.use(express.logger());
app.use(express.bodyParser());

// Load controllers
require(__dirname + '/server/controllers/bootstrap.js')(app);
require(__dirname + '/server/controllers/gacha.js')(app);
require(__dirname + '/server/controllers/mission.js')(app);

var port = process.env.port || 3000;
app.listen(port, function() {
    console.log('App is listening on ' + port + '.');
    console.log('VIEW_DIR = ' + VIEW_DIR);
    console.log('PUBLIC_DIR = ' + PUBLIC_DIR);
});
