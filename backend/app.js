import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import cors from 'cors'
import accountRouter from './src/routers/accountRouter.js'
import authRouter from './src/routers/authRouter.js'
import cookieRouter from './src/routers/cookieRouter.js'
import { exceptionHandler } from './src/utils/ajuda.js';

const app = express(); 

app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(exceptionHandler)
app.use('/usuarios', accountRouter);
app.use('/auth' , authRouter)
app.use('/cookie' , cookieRouter)

app.listen(5000, () => {
    console.log('Servidor Rodando em http://localhost:5000')
})