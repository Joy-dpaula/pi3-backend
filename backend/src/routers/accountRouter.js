import express from 'express';
import createAccount from '../controllers/account/createController.js';
import deleteAccount from '../controllers/account/deleteController.js';
import updateAccount from '../controllers/account/updateController.js';
import getAccountById from '../controllers/account/getByIdController.js';
import getAccount from '../controllers/account/getController.js';
import loginController from '../controllers/auth/loginController.js';

import {authenticateToken}  from '../utils/auth.js'; // Certifique-se de que o caminho está correto


const router = express.Router();

// Rota pública para criar uma conta
router.post('/', createAccount);





// Rota pública para obter a lista de contas
router.get('/', getAccount);

// Rota pública para obter uma conta específica por ID
router.get('/:id', getAccountById);
router.post('/login', loginController);

// Aplicar autenticação para as seguintes rotas
router.patch('/:id', authenticateToken, updateAccount);
router.delete('/:id', authenticateToken, deleteAccount);


export default router;

