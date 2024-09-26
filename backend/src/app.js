
import express from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import accountRouter from './routers/accountRouter.js';
import authRouter from './routers/authRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';
import { ENVIRONMENT, PORT, HOST } from './config.js';
import paymentRoutes from './routers/paymentRouter.js';
import exceptionHandler  from './utils/ajuda.js';
import create  from './routers/shoppingRouter.js';
import creditCard from './routers/typePaymentRouter.js'
import multer from 'multer'
import {storage} from './multerConfig.js'
const upload = multer({storage: storage});


import 'dotenv/config'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const COOKIE_SECRET = process.env.COOKIE_SECRET || 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

app.use(express.json());


app.use(cors({}));


app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser(COOKIE_SECRET)); 

app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/uploads',  upload.single('file'), (req, res)=>{return res.json(req.file.filename);})
app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/veiculos', vehicleRouter); 
app.use('/payment', paymentRoutes);
app.use('/credit' , creditCard) 

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
    console.log(`Servidor Rodando no Ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)
});