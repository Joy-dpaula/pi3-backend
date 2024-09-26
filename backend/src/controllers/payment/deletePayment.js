import exceptionHandler from '../../utils/ajuda.js';

import { deletePaymentModel } from '../../models/paymentModel.js';

export default async function deletePayment(req, res) {
    const { id } = req.params;

    try {
      
        const pagamentoDeletado = await deletePaymentModel(id);

        res.status(200).json({message: 'Pagamento deletado com sucesso!'});

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
