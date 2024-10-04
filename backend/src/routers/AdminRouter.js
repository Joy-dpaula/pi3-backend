import express from 'express';
import { createAdminUser } from '../controllers/admin/adminController.js'; // Importação específica

const router = express.Router();

// Definir a rota POST para criar um novo usuário admin
router.post('/create-user', createAdminUser);

export default router;
