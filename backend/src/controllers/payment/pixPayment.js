export const generatePixPayment = (req, res) => {
    try {
        const { amount } = req.body;
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Valor inválido para Pix.');
        }

        const pixCode = `PIX${Date.now()}${Math.floor(Math.random() * 10000)}`;
        res.json({
            message: 'Código de pagamento Pix gerado com sucesso.',
            pixCode
        });
    } catch (error) {
        console.error('Erro ao gerar Pix:', error);
        res.status(400).json({ error: error.message });
    }
};
