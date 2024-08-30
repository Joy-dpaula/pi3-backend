import express from 'express';
import { processCreditCardPayment } from '../controllers/payment/creditCardPayment.js';
import { generatePixPayment } from '../controllers/payment/pixPayment.js';
import { generateBoleto } from '../controllers/payment/boletoPayment.js';

const router = express.Router();

router.post('/credit-card', processCreditCardPayment);
router.post('/pix', generatePixPayment);
router.post('/boleto', generateBoleto);

export default router;
