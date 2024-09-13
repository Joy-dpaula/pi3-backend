
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';

import accountRouter from './routers/accountRouter.js';
import authRouter from './routers/authRouter.js';
import vehicleRouter from './routers/vehicleRouter.js';
import messageRouter from './routers/messageRouter.js';
import shoppingRouter from './routers/shoppingRouter.js';
import { ENVIRONMENT, PORT, HOST } from './config.js';
import paymentRoutes from './routers/paymentRouter.js';
import { exceptionHandler } from './utils/ajuda.js';

// Para garantir a compatibilidade com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

// Configuração da visualização


// Configuração do middleware
app.use(cors({}));

// Habilita CORS para permitir requisições de diferentes origens
app.use(logger('dev')); // Configura o logger de requisições HTTP
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser(COOKIE_SECRET)); 

app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/veiculos', vehicleRouter); 
app.use('/message', messageRouter); 
app.use('/payment', paymentRoutes); 
app.use('/compras', shoppingRouter);

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