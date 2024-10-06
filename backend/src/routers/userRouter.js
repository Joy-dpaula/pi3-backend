import {getPaginatedUsers,  getUsersSummary} from '../controllers/admin/userController.js'
import express from 'express';




const router = express.Router();

router.get('/paginated', getPaginatedUsers);
router.get('/summary', getUsersSummary);

export default router;