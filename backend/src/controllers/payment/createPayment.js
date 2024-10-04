import exceptionHandler from '../../utils/ajuda.js';
import { createPaymentModel } from '../../models/paymentModel.js';

export default async function createPayment(req, res) {
    const { usuarioId, compraId, creditCardId } = req.body; 


    console.log('compraId recebido:', compraId);
    console.log('creditCardId recebido:', creditCardId);

    try {

        if (!compraId) {
            return res.status(400).json({ error: 'O ID da compra é necessário.' });
        }

        const pagamento = await createPaymentModel(compraId, usuarioId);

        res.status(201).json({
            message: 'Pagamento processado com sucesso.',
            pagamento
        });
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
