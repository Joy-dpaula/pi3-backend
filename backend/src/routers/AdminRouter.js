import express from 'express';
import { 
    createAdminUser, 
    deleteUser, 
    getUsers, 
    updateUserByAdmin 
} from '../controllers/admin/adminController.js';

const router = express.Router();

router.post('/', createAdminUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.put('/:id', updateUserByAdmin);

export default router;
