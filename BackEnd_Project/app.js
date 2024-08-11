var createError = require('http-errors');
var express = require('express');

var cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var isAuthorized = require('./middleware/isAuthorized');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/UserRoutes');
var customerQueueRouter = require('./routes/CustomerQueueRouter');
var productRouter = require('./routes/ProductRouter');
var billRouter = require('./routes/BillRouter')

var app = express();

app.use(cors());


const db = require("./models");
db.sequelize.sync({ altr: true });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var loadenv = require('dotenv').config();


//!for generateing JWTSECRET
//! require('crypto').randomBytes(60, function(err, buffer) { var token = buffer.toString('hex'); console.log(token); });


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/bill', isAuthorized, billRouter);
app.use('/customerQueue', isAuthorized, customerQueueRouter); //!the original one




// app.use('/', function (req, res, next) {
//   res.send("hii guys");
// })

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
