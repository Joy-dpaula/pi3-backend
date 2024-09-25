import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';

import accountRouter from './routers/AccountRouter.js';
import authRouter from './routers/AuthRouter.js';
import vehicleRouter from './routers/VehicleRouter.js';
import messageRouter from './routers/MessageRouter.js';
import paymentRoutes from './routers/PaymentRouter.js';
import compraVeiculoRouter from './routers/CompraVeiculoRouter.js';
import adminRoutes from './routers/AdminRoutes.js';
import config from './config.js'; // Importando o objeto padrão
import exceptionHandler from './utils/ajuda.js';


// Desestruturando as variáveis a partir do objeto importado
const { ENVIRONMENT, PORT, HOST } = config;

// Para garantir a compatibilidade com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'd4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d';

// Configuração da visualização
app.use(express.json()); // Middleware para interpretar o corpo das requisições JSON

// Configuração do middleware
app.use(cors({}));

// Habilita CORS para permitir requisições de diferentes origens
app.use(logger('dev')); // Configura o logger de requisições HTTP
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser(COOKIE_SECRET)); // Configuração do cookie parser

app.use(express.static(path.join(__dirname, 'public'))); // Para servir arquivos estáticos

// Adicionando os routers
app.use('/usuarios', accountRouter);
app.use('/auth', authRouter); // Adiciona as rotas de login e logout
app.use('/veiculos', vehicleRouter); 
app.use('/message', messageRouter); 
app.use('/payment', paymentRoutes); 
app.use('/comprasVeiculos', compraVeiculoRouter); // Adiciona as rotas de compras de veículos
app.use('/admin', adminRoutes); // Certifique-se de adicionar a rota de admin

// Middleware para tratar erros de rota não encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Middleware global de tratamento de exceções
app.use(exceptionHandler);

// Middleware final para capturar qualquer erro restante e enviar resposta apropriada
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: res.locals.error,
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT === 'production' ? HOST : HOST + ':' + PORT}`);
});

export default app;
