import exceptionHandler from '../../utils/ajuda.js';

import { updatePaymentModel } from '../../models/paymentModel.js';

export default async function updatePayment(req, res) {
    const { id } = req.params;

    const { usuarioId, compraId, creditCardId, paymentMethod, status, amount } = req.body;

    try {

        const pagamentoAtualizado = await updatePaymentModel(id, {
            usuarioId,
            compraId,
            creditCardId,
            paymentMethod,
            status,
            amount
        });
        
        res.status(200).json(pagamentoAtualizado);

    } catch (exception) {

        exceptionHandler(exception, res);
    }
}
