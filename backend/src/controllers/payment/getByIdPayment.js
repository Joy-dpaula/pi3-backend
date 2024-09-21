import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getByIdPayment(req, res) {
    const { id } = req.params; // Obtém o ID da rota

    try {
        // Busca um pagamento específico pelo ID
        const pagamento = await prisma.payment.findUnique({
            where: { id: Number(id) },
        });

        if (!pagamento) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
        }

        // Retorna o pagamento encontrado
        res.status(200).json(pagamento);
    } catch (exception) {
        // Lida com exceções
        exceptionHandler(exception, res);
    }
}
