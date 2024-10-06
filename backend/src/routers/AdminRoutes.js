import express from 'express';
import { createAdminUser, getAllAdmins, getAdmin, updateAdminById, deleteAdmin } from '../controllers/admin/adminController.js';

const router = express.Router();

router.post('/', createAdminUser); 
router.get('/', getAllAdmins); 
router.get('/:id', getAdmin); 
router.put('/:id', updateAdminById); 
router.delete('/:id', deleteAdmin); 
export default router;
