import express from 'express';
import  generatePixPayment  from '../controllers/typePayment/pixPayment.js';
import { generateBoleto } from '../controllers/typePayment/generateBoleto.js';
import {createCreditCard} from '../controllers/typePayment/creditCard/createCreditCard.js'
import { deleteCreditCard } from '../controllers/typePayment/creditCard/deleteCreditCard.js';
import {updateCreditCard} from '../controllers/typePayment/creditCard/updateCreditCard.js'
import {getCreditCard} from '../controllers/typePayment/creditCard/getCreditCard.js'

const router = express.Router();

router.post('/', createCreditCard);
router.get('/' , getCreditCard)
router.delete('/', deleteCreditCard);
router.put('/', updateCreditCard);


router.post('/pix', async (req, res) => {
    try {
        await generatePixPayment(req, res);
    } catch (error) {
        console.error('Erro ao gerar pagamento Pix:', error);
        res.status(500).json({ error: 'Erro interno ao gerar pagamento Pix' });
    }
});

// Rota para gerar boleto
router.post('/boleto', async (req, res) => {
    try {
        await generateBoleto(req, res);
    } catch (error) {
        console.error('Erro ao gerar boleto:', error);
        res.status(500).json({ error: 'Erro interno ao gerar boleto' });
    }
});

export default router;
