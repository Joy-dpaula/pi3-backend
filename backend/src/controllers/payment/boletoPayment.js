import axios from 'axios';

export const generateBoleto = async (req, res) => {
    try {
        const { amount, customer } = req.body;
        if (!customer || !customer.name || !customer.cpf) {
            throw new Error('dados do cliente inválidos.');
        }
        if (!amount || amount <= 0) {
            throw new Error('valor inválido para boleto.');
        }

        const response = await axios.post('https://api.gerencianet.com.br/v1/charge', {
            items: [
                {
                    name: 'produto Exemplo',
                    value: amount * 100,
                    amount: 1,
                },
            ],
            payment: {
                banking_billet: {
                    expire_at: '2024-12-31',
                    customer: {
                        name: customer.name,
                        email: customer.email,
                        cpf: customer.cpf,
                    },
                },
            },
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
                'Content-Type': 'application/json',
            },
        });

        res.json({
            message: 'Boleto gerado com sucesso.',
            boletoUrl: response.data.data.link,
            pdf: response.data.data.pdf
        });
    } catch (error) {
        console.error('erro ao gerar boleto:', error);
        res.status(400).json({ error: error.message });
    }
};
