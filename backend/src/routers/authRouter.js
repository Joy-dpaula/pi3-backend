
import express from 'express'

import loginController from '../controllers/auth/loginController.js';
import logoutController  from '../controllers/auth/logoutController.js';
import  {sessionsController}  from '../controllers/auth/sessionsController.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/logout' , logoutController)
router.get('/sessao' , sessionsController)

export default router;