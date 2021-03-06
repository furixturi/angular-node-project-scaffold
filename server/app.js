var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

/// catch 404 and forwarding to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

/// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/

/**
 * Development Settings
 */
if('development' === app.get('env')) {
	//This will change in production since we'll be using the dist folder
	//This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../client/.tmp')));
	app.use(express.static(path.join(__dirname, '../client/app')));
	// This is the new way to handle errors in Express 4. not errorHandler().
	// For more about error-first best practices see http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
}

/**
 * Production Settings
 */
if('production' === app.get('env')) {
	app.use(express.static(path.join(__dirname, '/dist')));
}

/* Add this to fire the server */
var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

module.exports = app;
