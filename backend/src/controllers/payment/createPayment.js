import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function createPayment(req, res) {
    const { usuarioId, compraId, creditCardId } = req.body;

    try {

        if (!creditCardId || isNaN(creditCardId)) {
            return res.status(400).json({ error: 'O ID do cartão de crédito é inválido.' });
        }

        const cartaoCredito = await prisma.cartaocredito.findUnique({
            where: {
                id: creditCardId
            }
        });

        const compra = await prisma.compra.findUnique({
            where: { id: compraId },
            include: { veiculo: true }
        });

        if (!cartaoCredito) {
            return res.status(404).json({ error: 'Cartão de crédito não encontrado.' });
        }

        if (!compra) {
            return res.status(404).json({ error: 'Compra não encontrada.' });
        }

        if (cartaoCredito.usuarioId !== usuarioId) {
            return res.status(403).json({ error: 'Cartão de crédito não pertence ao usuário.' });
        }

        const pagamento = await prisma.payment.create({
            data: {
                usuarioId,
                compraId,
                creditCardId: cartaoCredito.id, 
                paymentMethod: 'Cartão de Crédito',
                status: 'Aprovado',
                amount: compra.veiculo.valor,
                timestamp: new Date()
            }
        });

        await prisma.compra.update({
            where: { id: compraId },
            data: { 
                status: 'aceita',
            }
        });

        res.status(201).json({
            message: 'Pagamento aprovado e compra aceita.',
            pagamento
        });

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}