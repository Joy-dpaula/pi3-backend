import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getByIdPayment(req, res) {
    const { id } = req.params;

    try {

        const pagamento = await prisma.payment.findUnique({
            where: { id: Number(id) },
        });

        if (!pagamento) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
        }

        res.status(200).json(pagamento);
    } catch (exception) {

        exceptionHandler(exception, res);
    }
}
