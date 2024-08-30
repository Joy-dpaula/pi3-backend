#!/usr/bin/env node

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
<<<<<<< Updated upstream
import { fileURLToPath } from 'url';

import accountRoutes from './src/routers/accountRouter.js';
import paymentRoutes from './src/routers/paymentRouter.js';

// Para garantir a compatibilidade com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração da visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuração do middleware
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(logger('dev')); // Configura o logger de requisições HTTP
app.use(express.json()); // Parseia o corpo das requisições como JSON
app.use(express.urlencoded({ extended: false })); // Parseia o corpo das requisições URL encoded
app.use(cookieParser()); // Faz parsing dos cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

// Configuração das rotas
app.use('/usuarios', accountRoutes); // Rotas para contas de usuário
app.use('/payment', paymentRoutes); // Rotas para pagamentos

// Roteamento de erro 404 e tratamento de erros
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: res.locals.error,
    });
});
=======

// Importando as rotas
import accountRouter from './src/routers/accountRouter.js';
import authRouter from './src/routers/authRouter.js';
import cookieRouter from './src/routers/cookieRouter.js';
import vehicleRouter from './src/routers/vehicleRouter.js';
import messageRouter from './src/routers/messageRouter.js';

import { exceptionHandler } from './src/utils/ajuda.js';

const app = express(); 

const COOKIE_SECRET = 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

// Configurações de rotas
app.use('/usuarios', accountRouter);
app.use('/auth', authRouter);
app.use('/cookie', cookieRouter);
app.use('/veiculos', vehicleRouter);
app.use('/message', messageRouter);

// Middleware para tratamento de exceções
app.use(exceptionHandler);
>>>>>>> Stashed changes

export default app;
