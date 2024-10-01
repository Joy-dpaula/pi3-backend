import express from 'express';
import { createNewAdmin, getAllAdmins, getAdmin, updateAdminById, deleteAdmin } from '../controllers/admin/AdminController.js';

const router = express.Router();

router.post('/', createNewAdmin); 
router.get('/', getAllAdmins); 
router.get('/:id', getAdmin); 
router.put('/:id', updateAdminById); 
router.delete('/:id', deleteAdmin); 
export default router;
