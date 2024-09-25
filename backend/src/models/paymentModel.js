import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPaymentModel(usuarioId, compraId, creditCardId) {

    const cartaoCredito = await prisma.cartaocredito.findUnique({
        where: {
            id: creditCardId
        }
    });

    if (!cartaoCredito) {
        throw new Error('Cartão não encontrado!')
    }

    if (cartaoCredito.usuarioId !== usuarioId) {
        throw new Error('Cartão de crédito não pertencente ao usuário!');
    }

    const compra = await prisma.compra.findUnique({
        where: { id: compraId },
        include: { veiculo: true }
    });

    if (!compra) {
        throw new Error('Compra não encontrada!');
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

    return pagamento;
}

export async function getPaymentModel() {

    const pagamentos = await prisma.payment.findMany();

    if (!pagamentos) throw new Error("Pagamentos efetuados não encontrados!")

    return pagamentos;
}

export async function getPaymentById(id) {

    const pagamento = await prisma.payment.findUnique({
        where: { id: Number(id) },
    });

    if (!pagamento) throw new Error('Pagamento não encontrado!');

    return pagamento;
}

export async function updatePaymentModel(id, {
    usuarioId,
    compraId,
    creditCardId,
    paymentMethod,
    status,
    amount }) {

    const pagamentoExistente = await prisma.payment.findUnique({
        where: { id: Number(id) }
    });

    if (!pagamentoExistente) {
        throw new Error('Pagamento não encontrado!')
    }

    const pagamentoAtualizado = await prisma.payment.update({
        where: { id: Number(id) },
        data: {
            usuarioId: usuarioId ?? pagamentoExistente.usuarioId,
            compraId: compraId ?? pagamentoExistente.compraId,
            creditCardId: creditCardId ?? pagamentoExistente.creditCardId,
            paymentMethod: paymentMethod ?? pagamentoExistente.paymentMethod,
            status: status ?? pagamentoExistente.status,
            amount: amount ?? pagamentoExistente.amount,
            timestamp: new Date()
        }
    });

    return pagamentoAtualizado;

}

export async function deletePaymentModel(id) {

    const payment = await prisma.payment.findUnique({ where: { id: parseInt(id) } });

    if (!payment) {
        throw new Error('Pagamento não encontrado ou não efetuado!');
    }
    
    const pagamentoDeletado = await prisma.payment.delete({ where: { id: parseInt(id) } });
 
   return pagamentoDeletado;
}