var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./api/config');
var logger = require('morgan');
var setupController = require('./api/controllers/setupController');
var lessonController = require('./api/controllers/lessonController');
var routesApi = require('./api/routes/index');
var bodyParser = require('body-parser');
require('./api/config/passport');

var port = process.env.PORT || 8080;

var log4js = require('log4js');
var mongoAppender = require('log4js-node-mongodb');
 
log4js.addAppender(
    mongoAppender.appender({connectionString: config.getDbConnectionString()}),
    'requestLog'
);
var requestLogger = log4js.getLogger('requestLog');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    if(ip == '::ffff:207.224.52.231' || ip == '207.224.52.231'){
    } else {
        requestLogger.trace({request: req.originalUrl, ip: ip});
    }
    next();
});


app.use(passport.initialize());
app.use('/api', routesApi);
app.use('/assets', express.static(__dirname + '/public'));
app.use('', express.static(__dirname + '/views'));




mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());
setupController(app);
//lessonController(app);

//logging
app.use(logger('dev'));


//error handling
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});

app.listen(port);
