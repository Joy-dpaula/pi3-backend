#!/usr/bin/env node

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
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

export default app;
