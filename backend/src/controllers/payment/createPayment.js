import exceptionHandler from '../../utils/ajuda.js';

import { createPaymentModel } from '../../models/paymentModel.js';

export default async function createPayment(req, res) {
    const { usuarioId, compraId, creditCardId } = req.body;

    try {

        if (!creditCardId || isNaN(creditCardId)) {
            return res.status(400).json({ error: 'O ID do cartão de crédito é inválido.' });
        }

        const pagamento = await createPaymentModel(usuarioId, compraId, creditCardId);

        res.status(201).json({
            message: 'O pagamento foi aprovado e sua compra aceita.',
            pagamento
        });

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}