import express from 'express';
import  generatePixPayment  from '../controllers/typePayment/pixPayment.js';
import { generateBoleto } from '../controllers/typePayment/generateBoleto.js';
import createCreditCard from '../controllers/typePayment/creditCard/createCreditCard.js'
import deleteCreditCard  from '../controllers/typePayment/creditCard/deleteCreditCard.js';
import updateCreditCard from '../controllers/typePayment/creditCard/updateCreditCard.js'
import getByIdCreditCard from '../controllers/typePayment/creditCard/getByIdCreditCard.js'
import getCreditCard from '../controllers/typePayment/creditCard/getCreditCard.js';

const router = express.Router();

router.post('/', createCreditCard);
router.get('/:id' , getByIdCreditCard)
router.get('/' , getCreditCard)
router.delete('/:id', deleteCreditCard);
router.patch('/:id', updateCreditCard);

router.post('/pix', async (req, res) => {
    try {
        await generatePixPayment(req, res);
    } catch (error) {
        console.error('Erro ao gerar pagamento Pix:', error);
        res.status(500).json({ error: 'Erro interno ao gerar pagamento Pix' });
    }
});

router.post('/boleto', async (req, res) => {
    try {
        await generateBoleto(req, res);
    } catch (error) {
        console.error('Erro ao gerar boleto:', error);
        res.status(500).json({ error: 'Erro interno ao gerar boleto' });
    }
});

export default router;
