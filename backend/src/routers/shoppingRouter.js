const express = require('express');
const router = express.Router();

const { generatePixQRCode } = require('../controllers/shopping/generatePixQRCode');
const { createCreditCard } = require('../controllers/shopping/createCreditCard');
const { getCreditCard } = require('../controllers/shopping/getCreditCard');
const { updateCreditCard } = require('../controllers/shopping/updateCreditCard');
const { deleteCreditCard } = require('../controllers/shopping/deleteCreditCard');
const { generateBoleto } = require('../controllers/shopping/generateBoleto');

// Pagamento Pix - Rota
router.post('/api/payment/pix', generatePixQRCode);

// Cartão de Crédito - Rotas
router.post('/api/payment/credit-card', createCreditCard);
router.get('/api/payment/credit-card/:cardId', getCreditCard);
router.put('/api/payment/credit-card/:cardId', updateCreditCard);
router.delete('/api/payment/credit-card/:cardId', deleteCreditCard);

// Boleto - Rota
router.post('/api/payment/boleto', generateBoleto);

module.exports = router;
