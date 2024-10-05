import { createPaymentModel } from '../../models/paymentModel.js';

export default async function createPayment(req, res) {
    try {
        const { compraId, creditCardId } = req.body; 

        console.log("compraId recebido:", compraId);
        console.log("creditCardId recebido:", creditCardId);

        const payment = await createPaymentModel(compraId, creditCardId);
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
