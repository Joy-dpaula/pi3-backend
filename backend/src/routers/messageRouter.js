import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// Enviar uma nova mensagem
router.post('/send', sendMessage);

// Obter todas as mensagens trocadas com um usuário específico
router.get('/:recipientId', getMessages);

export default router;
