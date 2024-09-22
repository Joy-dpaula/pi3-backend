import express from 'express';
import { sendMessage, getMessages } from '../controllers/message/messageController.js';

const router = express.Router();

router.post('/send', sendMessage);

router.get('/:recipientId', getMessages);

export default router;
