import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import multer from 'multer';
import 'dotenv/config'; 

import accountRouter from './routers/accountRouter.js';
import authRouter from './routers/authRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';
import paymentRoutes from './routers/paymentRouter.js';

import exceptionHandler  from './utils/ajuda.js';
import create  from './routers/shoppingRouter.js';
import creditCard from './routers/typePaymentRouter.js'
import multer from 'multer'
import {storage} from './multerConfig.js'
const upload = multer({storage: storage});
import admin from './routers/AdminRouter.js'
import 'dotenv/config'; 


import { ENVIRONMENT, PORT, HOST } from './config.js';
import exceptionHandler from './utils/ajuda.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());



const COOKIE_SECRET = process.env.COOKIE_SECRET || 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

app.use(cors({}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
    return res.json({ filename: req.file.filename });
});


app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/veiculos', vehicleRouter);
app.use('/payment', paymentRoutes);

app.use('/credit' , creditCard) 
app.use('/admin', admin);
app.use('/user' , user)

app.use('/compra', create)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(exceptionHandler);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: res.locals.error,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT === 'production' ? HOST : `${HOST}:${PORT}`}`);
});
