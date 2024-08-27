import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import logger from 'morgan'
import cors from 'cors'



import accountRouter from './src/routers/accountRouter.js';
import authRouter from './src/routers/authRouter.js';
import cookieRouter from './src/routers/cookieRouter.js';

import vehicleRouter from './src/routers/vehicleRouter.js';


import { exceptionHandler } from './src/utils/ajuda.js';
import messageRouter from './src/routers/messageRouter.js'



const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express(); 



const COOKIE_SECRET = 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(COOKIE_SECRET));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Define as rotas
app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/cookie', cookieRouter);

app.use('/veiculos', vehicleRouter);
app.use('/message' , messageRouter)



// Middleware para tratar exceções
app.use(exceptionHandler);

// Middleware para tratar exceções
app.use(exceptionHandler);

app.listen(5000, () => {
    console.log('Servidor Rodando em http://localhost:5000');
});
