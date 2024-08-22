import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import accountRouter from './src/routers/accountRouter.js';
import authRouter from './src/routers/authRouter.js';
import cookieRouter from './src/routers/cookieRouter.js';
import shoppingRouter from './src/routers/shoppingRouter.js';
import { exceptionHandler } from './src/utils/ajuda.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define as rotas
app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/cookie', cookieRouter);
app.use('/veiculos', shoppingRouter);

// Middleware para tratar exceções
app.use(exceptionHandler);

app.listen(5000, () => {
    console.log('Servidor Rodando em http://localhost:5000');
});
