import express from 'express';
import { createNewAdmin, getAllAdmins, getAdmin, updateAdminById, deleteAdmin } from '../controllers/admin/AdminController.js';

const router = express.Router();

router.post('/', createNewAdmin); // Cria um novo administrador
router.get('/', getAllAdmins); // Pega todos os administradores
router.get('/:id', getAdmin); // Pega um administrador pelo ID
router.put('/:id', updateAdminById); // Atualiza um administrador
router.delete('/:id', deleteAdmin); // Deleta um administrador

export default router;
