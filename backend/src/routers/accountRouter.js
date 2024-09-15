import express from 'express';

import {createAccount} from '../controllers/account/createController.js';
import {deleteAccount} from '../controllers/account/deleteController.js';
import updateAccount from '../controllers/account/updateController.js';
import getAccountById from '../controllers/account/getByIdController.js';
import { getAccount } from '../controllers/account/getController.js';
import loginController from '../controllers/auth/loginController.js';

import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', createAccount); // Criar conta
router.get('/', getAccount); // Obter todas as contas
router.get('/:id', getAccountById); // Obter conta por ID
router.put('/:id', authenticateToken, updateAccount); // Atualizar conta por ID
router.delete('/:id', authenticateToken, deleteAccount); // Excluir conta por ID
router.post('/login', loginController);


export default router;
