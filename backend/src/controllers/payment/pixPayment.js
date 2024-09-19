import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

/**
 * Simula a geração de um pagamento Pix com QR Code
 * @param {Object} req - Requisição HTTP
 * @param {Object} res - Resposta HTTP
 */
export default async function generatePixPayment(req, res) {
    try {
        // Gerar um identificador único para a transação simulada
        const transactionId = uuidv4();

        // Simular os dados do pagamento Pix
        const pixData = {
            transactionId,
            amount: req.body.amount || 1000, // valor em centavos (exemplo: R$ 10,00)
            beneficiary: req.body.beneficiary || 'Beneficiário Exemplo',
            timestamp: new Date().toISOString(),
        };

        // Transformar os dados em uma string que seria usada em um Pix real
        const pixString = `
            PIX Key: CHAVEPIX_EXEMPLO
            Beneficiary: ${pixData.beneficiary}
            Amount: ${pixData.amount / 100} BRL
            Transaction ID: ${pixData.transactionId}
            Timestamp: ${pixData.timestamp}
        `.trim();

        // Gerar o QR Code com base na string simulada
        const qrCodeURL = await QRCode.toDataURL(pixString);

        // Log para fins de depuração
        console.log('Pagamento Pix Simulado:', pixData);

        // Retornar o QR Code e os dados simulados como resposta
        return res.json({
            qrCodeURL,
            pixData,
        });

    } catch (error) {
        console.error('Erro ao gerar o pagamento Pix simulado:', error);
        return res.status(500).json({ error: 'Erro ao gerar o pagamento Pix simulado' });
    }
}
