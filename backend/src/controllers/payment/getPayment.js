import exceptionHandler from '../../utils/ajuda.js';

import { getPaymentModel } from '../../models/paymentModel.js';

export default async function getPayments(req, res) {
    try {

        const pagamentos = await getPaymentModel();

        res.status(200).json(pagamentos);

    } catch (exception) {

        exceptionHandler(exception, res);
    }
}
