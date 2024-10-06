import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export default async function generatePixPayment(req, res) {
    try {

        const transactionId = uuidv4();

        const pixData = {
            transactionId,
            amount: req.body.amount || 1000, 
            beneficiary: req.body.beneficiary || 'Beneficiário Exemplo',
            timestamp: new Date().toISOString(),
        };

        const pixString = `
            PIX Key: CHAVEPIX_EXEMPLO
            Beneficiary: ${pixData.beneficiary}
            Amount: ${pixData.amount / 100} BRL
            Transaction ID: ${pixData.transactionId}
            Timestamp: ${pixData.timestamp}
        `.trim();

        const qrCodeURL = await QRCode.toDataURL(pixString);

        console.log('Pagamento Pix Simulado:', pixData);

        return res.json({
            qrCodeURL,
            pixData,
        });

    } catch (error) {
        console.error('Erro ao gerar o pagamento Pix simulado:', error);
        return res.status(500).json({ error: 'Erro ao gerar o pagamento Pix simulado' });
    }
}