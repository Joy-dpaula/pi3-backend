import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function createPayment(req, res) {
    const { usuarioId, compraId, numero, validade, cvv, nomeTitular, bandeira } = req.body;

    try {
        // Validar o cartão de crédito
        const cartaoCredito = await prisma.cartaocredito.findFirst({
            where: {
                usuarioId: usuarioId,
                numero: numero,
                validade: validade,
                cvv: cvv,
                nomeTitular: nomeTitular,
                bandeira: bandeira
            }
        });

   

        // Obter a compra com o veículo associado
        const compra = await prisma.compra.findUnique({
            where: { id: compraId },
            include: { veiculo: true } // Inclui o veículo na consulta
        });

        if (!compra) {
            return res.status(404).json({ error: 'Compra não encontrada.' });
        }

        if (!compra.veiculo) {
            return res.status(404).json({ error: 'Veículo relacionado à compra não encontrado.' });
        }


        // Criar o pagamento e relacionar com a compra
        const pagamento = await prisma.payment.create({
            data: {
                usuarioId: usuarioId,
                compraId: compraId, // Relaciona com a compra
                paymentMethod: 'Cartão de Crédito',
                status: 'Aprovado',
                amount: compra.veiculo.valor, // Atribui o valor do veículo ao pagamento
                timestamp: new Date()
              
            }
        });

        // Atualizar o status da compra para aceita
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
