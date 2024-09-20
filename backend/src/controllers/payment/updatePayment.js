import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function updatePayment(req, res) {
    const { id } = req.params; // Obtém o ID do pagamento da rota
    const { usuarioId, compraId, creditCardId, paymentMethod, status, amount } = req.body;

    try {
        // Verifica se o pagamento existe
        const pagamentoExistente = await prisma.payment.findUnique({
            where: { id: Number(id) }
        });

        if (!pagamentoExistente) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
        }

        // Atualiza o pagamento com os novos dados
        const pagamentoAtualizado = await prisma.payment.update({
            where: { id: Number(id) },
            data: {
                usuarioId: usuarioId ?? pagamentoExistente.usuarioId,
                compraId: compraId ?? pagamentoExistente.compraId,
                creditCardId: creditCardId ?? pagamentoExistente.creditCardId,
                paymentMethod: paymentMethod ?? pagamentoExistente.paymentMethod,
                status: status ?? pagamentoExistente.status,
                amount: amount ?? pagamentoExistente.amount,
                timestamp: new Date() // Atualiza a data e hora do pagamento
            }
        });

        // Retorna o pagamento atualizado
        res.status(200).json(pagamentoAtualizado);
    } catch (exception) {
        // Lida com exceções
        exceptionHandler(exception, res);
    }
}
