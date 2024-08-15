import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import cors from 'cors'

import accountRoutes from './src/routers/accountRouter.js'
// var indexRouter = require('./src/routers/index');
// var usersRouter = require('./src/routers/accountRoutes');
// var usersRouter = require('./src/routers/users');
// var usuariosRoutes = require('./src/routers/accountRoutes');

const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', accountRoutes);

export default router