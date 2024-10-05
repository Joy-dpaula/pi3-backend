import express from 'express';

import { createAccount } from '../controllers/account/createController.js';
import { deleteAccount } from '../controllers/account/deleteController.js';
import updateAccount from '../controllers/account/updateController.js'; // Supondo que updateAccount seja uma default export
import { getAccountByIdController } from '../controllers/account/getByIdController.js'; // Aqui o nome correto
import { getAccount } from '../controllers/account/getController.js';
import loginController from '../controllers/auth/loginController.js'; // Verifique se é uma default export

import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', createAccount); 
router.get('/', getAccount); 
router.get('/:id', getAccountByIdController); // Usar o nome correto da função importada
router.put('/:id', authenticateToken, updateAccount); 
router.delete('/:id', authenticateToken, deleteAccount);
router.post('/login', loginController);

export default router;
