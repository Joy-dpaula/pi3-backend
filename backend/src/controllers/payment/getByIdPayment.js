import exceptionHandler from '../../utils/ajuda.js';

import { getPaymentById } from '../../models/paymentModel.js';

export default async function getByIdPayment(req, res) {
    const { id } = req.params;

    try {

        const pagamento = await getPaymentById(id);

        res.status(200).json(pagamento);

    } catch (exception) {

        exceptionHandler(exception, res);
    }
}
