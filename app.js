var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Handlebars = require('hbs');
var session = require('express-session')
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

var routes = require('./routes/index');
var user = require('./routes/user');
var desks = require('./routes/desks');
var calendar = require('./routes/calendar');
var admin = require('./routes/admin');
var explanation = require('./routes/explanation');
var feedback = require('./routes/feedback');

var thisYear = require('./routes/thisYear');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// create the custom ifCond comparator
// Thx Peter Bratton for this helper
// Source: http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Middleware - Sessions
app.set('trust proxy', 1);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'E=MC2'
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', calendar);
app.use('/user', user);
app.use('/desks', desks);
app.use('/admin', admin);
app.use('/2016', thisYear);
app.use('/feedback', feedback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
