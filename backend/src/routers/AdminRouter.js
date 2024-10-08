import express from 'express';
import { createAdminUser } from '../controllers/admin/adminController.js';
import { deleteUser } from '../controllers/admin/adminController.js';
import { getUsers } from '../controllers/admin/adminController.js';
import { updateUserByAdmin } from '../controllers/admin/adminController.js';

const router = express.Router();


router.post('/', createAdminUser);
router.delete('/:id' , deleteUser)
router.get('/', getUsers) 

router.put('/:id', updateUserByAdmin);

export default router;
