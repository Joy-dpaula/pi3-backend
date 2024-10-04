import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { v4 as uuid } from 'uuid'; 
export async function createPaymentModel(compraId, creditCardId) {

    const compra = await prisma.compra.findUnique({
        where: { id: compraId },
        include: { veiculo: true }
    });

    if (!compra) {
        throw new Error('Compra não encontrada!');
    }

    if (!compra.usuarioId) {
        throw new Error('Informação de usuário não encontrada na compra!');
    }

    const paymentMethod = compra.method;

    let status = 'pendente';
    const paymentId = uuid(); 

    if (paymentMethod === 'creditCard') {

        if (!creditCardId || typeof creditCardId !== 'string') {
            throw new Error('ID do cartão de crédito inválido!');
        }
      
        const cartaoCredito = await prisma.cartaocredito.findUnique({
            where: { id: creditCardId }
        });


        if (!cartaoCredito) {
            throw new Error('Cartão não encontrado!');
        }

        if (cartaoCredito.usuarioId !== compra.usuarioId) {
            throw new Error('Cartão de crédito não pertencente ao usuário!');
        }
      

    
        status = 'Aprovado';

    } else if (paymentMethod === 'pix') {
       
        status = 'Aguardando';

    } else if (paymentMethod === 'boleto') {
        status = 'Aguardando';

    } else {
        throw new Error('Método de pagamento inválido!');
    }

    const payment = await prisma.payment.create({
        data: {
            id: paymentId,
            paymentMethod,
            status,
            amount: compra.veiculo.valor,
            creditCard: paymentMethod === 'creditCard' ? {
                connect: { id: creditCardId }
            } : undefined, 
            compra: {
                connect: {
                    id: compraId
                }
            },
            // Conectando o usuário existente
            usuario: {
                connect: {
                    id: compra.usuarioId
                }
            }
        }
    });
    

    await prisma.compra.update({
        where: { id: compraId },
        data: {
            status: 'aceita', 
        }
    });

    return  payment;
}


export async function getPaymentModel() {

    const pagamentos = await prisma.payment.findMany();

    if (!pagamentos) throw new Error("Pagamentos efetuados não encontrados!")

    return pagamentos;
}

export async function getPaymentById(id) {

    const pagamento = await prisma.payment.findUnique({
        where: { id: (id) },
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
        where: { id: (id) }
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

    const payment = await prisma.payment.findUnique({ where: { id: (id) } });

    if (!payment) {
        throw new Error('Pagamento não encontrado ou não efetuado!');
    }
    
    const pagamentoDeletado = await prisma.payment.delete({ where: { id: (id) } });
 
   return pagamentoDeletado;
}