var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var webpush = require('web-push');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var subscribeRouter = require('./routes/subscribe');

var app = express();

app.use(bodyParser.json());

const publicVapidKey = 'BGElE2g3jSv8XpleYspc4A9YX-NGcub-s4pK9uX-zojO3FPpDBzYqaENzOgyMP4dXS-SfQ9Q2ZYh30werqTwnrA';
const privateVapidKey = '0I_tNYwUSzGFk5MzJSU_5j8XLl16jBiCercA6p9-goI';

webpush.setVapidDetails('mailto:t@t.com',publicVapidKey,privateVapidKey);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/subscribe', subscribeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
