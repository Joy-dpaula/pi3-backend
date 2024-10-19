import express from 'express';

import { createAccount } from '../controllers/account/createController.js';
import { deleteAccount } from '../controllers/account/deleteController.js';
import { getAccountByIdController } from '../controllers/account/getByIdController.js';
import { getAccount } from '../controllers/account/getController.js';
import update from '../controllers/account/updateController.js'; 
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', createAccount); 
router.get('/', getAccount); 
router.get('/:id', getAccountByIdController); 
router.put('/:id', authenticateToken, update); 
router.delete('/:id', authenticateToken, deleteAccount);

export default router;
