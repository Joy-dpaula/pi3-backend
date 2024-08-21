<<<<<<< Updated upstream
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
  
var app = express();
=======
const dotenv = require('dotenv');
dotenv.config();  // Carrega as variáveis do arquivo .env

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const accountRoutes = require('./src/routers/accountRouter.js');
const paymentRoutes = require('./src/routers/paymentRouter.js');

const app = express();
>>>>>>> Stashed changes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

<<<<<<< Updated upstream
=======
app.use(cors());
>>>>>>> Stashed changes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< Updated upstream
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

=======
app.use('/usuarios', accountRoutes);
app.use('/payment', paymentRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

>>>>>>> Stashed changes
module.exports = app;
