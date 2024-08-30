import Stripe from 'stripe'; // Importa o módulo Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Inicializa o Stripe com a chave secreta do seu ambiente

export const processCreditCardPayment = async (req, res) => {
    try {
        const { cardNumber, expiryDate, cvv, amount } = req.body;

        // Verificação e validação dos dados do cartão

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe usa centavos, por isso multiplicamos por 100
            currency: 'brl', // Moeda em Real Brasileiro
            payment_method_data: {
                type: 'card',
                card: {
                    number: cardNumber,
                    exp_month: expiryDate.split('/')[0],
                    exp_year: '20' + expiryDate.split('/')[1],
                    cvc: cvv,
                },
            },
            confirm: true,
        });

        res.json({
            message: 'Pagamento processado com sucesso.',
            transactionId: paymentIntent.id,
            status: paymentIntent.status
        });
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        res.status(400).json({ error: error.message });
    }
};
