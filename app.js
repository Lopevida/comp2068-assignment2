var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./server/routes/index');
//var users = require('./routes/users');
var contact = require('./server/routes/businesscontact.js')
var todos = require('./server/routes/todos.js')

var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

mongoose.connect('mongodb://yaolingwang:q1w2e3r4@ds055574.mongolab.com:55574/yaolingdb');
//mongoose.connect('mongodb://localhost/userDB');
// check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function (callback) {
    console.log('Connected to mongodb');
});
var app = express();


// passport configuration
require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'someSecret',
    saveUninitialized: true,
    resave: true
})
);

// more authentication configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/businesscontact', contact);
app.use('/todos', todos);
//app.use('/user', users);

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
