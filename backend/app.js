#!/usr/bin/env node

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Importando as rotas
import accountRouter from './src/routers/accountRouter.js';
import authRouter from './src/routers/authRouter.js';
import cookieRouter from './src/routers/cookieRouter.js';
import vehicleRouter from './src/routers/vehicleRouter.js';
import messageRouter from './src/routers/messageRouter.js';
import paymentRoutes from './src/routers/paymentRouter.js';

import { exceptionHandler } from './src/utils/ajuda.js';

// Para garantir a compatibilidade com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

const COOKIE_SECRET = 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

// Configuração da visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuração do middleware
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(logger('dev')); // Configura o logger de requisições HTTP
app.use(express.json()); // Parseia o corpo das requisições como JSON
app.use(express.urlencoded({ extended: false })); // Parseia o corpo das requisições URL encoded
app.use(cookieParser(COOKIE_SECRET)); // Faz parsing dos cookies com segredo

app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

// Configuração das rotas
app.use('/usuarios', accountRouter); // Rotas para contas de usuário
app.use('/auth', authRouter); // Rotas de autenticação
app.use('/cookie', cookieRouter); // Rotas para manipulação de cookies
app.use('/veiculos', vehicleRouter); // Rotas para gerenciar veículos
app.use('/message', messageRouter); // Rotas para mensagens
app.use('/payment', paymentRoutes); // Rotas para pagamentos

// Roteamento de erro 404 e tratamento de erros
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Middleware para tratamento de exceções
app.use(exceptionHandler);

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

export default app;
