import express from 'express';
import { createAdminUser, updateUserByAdmin } from '../controllers/admin/adminController.js';

const router = express.Router();

router.post('/admin', createAdminUser); 
router.put('/admin/user/:id', updateUserByAdmin);

export default router;
