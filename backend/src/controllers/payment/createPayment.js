import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function createPayment(req, res) {
    const { usuarioId, compraId, creditCardId } = req.body;

    try {
       
        const cartaoCredito = await prisma.cartaocredito.findUnique({
            where: {
                id: creditCardId
            }
        });

      
        console.log('Cartão de Crédito encontrado:', cartaoCredito);

      
        if (!cartaoCredito || cartaoCredito.usuarioId !== usuarioId) {
            return res.status(404).json({ error: 'Cartão de crédito não encontrado ou não pertence ao usuário.' });
        }

        const compra = await prisma.compra.findUnique({
            where: { id: compraId },
            include: { veiculo: true }
        });

        if (!compra) {
            return res.status(404).json({ error: 'Compra não encontrada.' });
        }

        if (!compra.veiculo) {
            return res.status(404).json({ error: 'Veículo relacionado à compra não encontrado.' });
        }

        
        const pagamento = await prisma.payment.create({
            data: {
                usuarioId: usuarioId,
                compraId: compraId,
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
