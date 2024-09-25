import express from 'express';
import loginController from '../controllers/auth/loginController.js'; // Controlador de login
import logoutController from '../controllers/auth/logoutController.js'; // Controlador de logout

const router = express.Router();

// Rota para login de usuário
router.post('/login', loginController);

// Rota para logout de usuário
router.post('/logout', logoutController);

export default router;