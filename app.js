require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./config/connection');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const authenticateToken = require('./utils/authenticateToken');
const session = require('express-session');
const checkLogin = require('./utils/checkLogin');


connectDB();

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var cartRouter = require('./routes/cart')

var app = express();

// view engine setup
app.engine('hbs', engine({
  defaultLayout: 'layout', // Use 'layout' for your layout.hbs file
  layoutsDir: path.join(__dirname, 'views'), // Point to the views directory since layouts are not in a subdirectory
  partialsDir: path.join(__dirname, 'views/partials'), // Point to your partials directory
  extname: '.hbs',
  helpers: {
    json: function (context) {
      return JSON.stringify(context, null, 2);
    },
    eq: function (a, b) {
      return a === b;
    },
    encodeURIComponent: function (url) {
      return encodeURIComponent(url);
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(checkLogin)
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


app.use('/protected', authenticateToken);
app.use('/', usersRouter);
app.use('/protected/admin', adminRouter);
app.use('/protected/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;