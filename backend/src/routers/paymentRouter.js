import express from 'express';
import  generatePixPayment  from '../controllers/payment/pixPayment.js';
import { generateBoleto } from '../controllers/payment/generateBoleto.js';

const router = express.Router();

// Rota para processar pagamento com cartão de crédito
 // router.post('/credit-card', async (req, res) => {
    //  try {
        //  await processCreditCardPayment(req, res);
   //   } catch (error) {
    //      console.error('Erro ao processar pagamento com cartão de crédito:', error);
     //     res.status(500).json({ error: 'Erro interno ao processar pagamento com cartão de crédito' });
    //  }
 //   });

// Rota para gerar pagamento com Pix
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
