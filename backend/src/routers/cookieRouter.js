import express from 'express'

import getController from '../controllers/cookie/getController.js';
import postController from '../controllers/cookie/postController.js';
const router = express.Router();

// Rota para definir um cookie
router.post('/set-cookie', postController);

// Rota para ler um cookie
router.get('/get-cookie/:name', getController);

export default router