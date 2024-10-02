import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { v4 as uuid } from 'uuid'; 



export async function createPaymentModel(usuarioId, compraId, method, creditCardId) {

    let status = 'pendente'; 

    let pixQRCodeURL = null;
    
    let boletoURL = null;

    let paymentMethodId = null; 

  
    const paymentId = uuid();

    if (method === 'creditCard') {

        const cartaoCredito = await prisma.cartaocredito.findUnique({

            where: { id: creditCardId }

        });

        if (!cartaoCredito) {
            throw new Error('Cartão não encontrado!');
        }

        if (cartaoCredito.usuarioId !== usuarioId) {

            throw new Error('Cartão de crédito não pertencente ao usuário!');

        }

        const paymentResponse = await paymentApi.processPayment(cartaoCredito, amount);

        status = 'Aprovado';

        paymentMethodId = cartaoCredito.id; // Armazena o ID do cartão de crédito

    } else if (method === 'pix') {
   
        const pixId = uuid(); // Gera um UUID para o pagamento Pix


        status = 'Aguardando';

        paymentMethodId = pixId; 

    } else if (method === 'boleto') {
        
        const boletoId = uuid(); 
                
        status = 'Aguardando';
        paymentMethodId = boletoId;
        
    } else {
        throw new Error('Método de pagamento inválido!');
    }


     const compra = await prisma.compra.findUnique({
        where: { id: compraId },
        include: { veiculo: true }
    });

    if (!compra) {
        throw new Error('Compra não encontrada!');
    }


    const payment = await prisma.payment.create({
        data: {
            id: paymentId,
            usuarioId,
            paymentMethod: method, 
            status,
            amount: compra.veiculo.valor,
            compraId,
            timestamp: new Date(),
            pixQRCodeURL,
            boletoURL,
            creditCardId: method === 'creditCard' ? creditCardId : null, // Armazena o ID do cartão de crédito se o método for cartão
        }
    });

    await prisma.compra.update({
        where: { id: compraId },
        data: {
            status: 'aceita',
        }
    });

    return { payment, pixQRCodeURL, boletoURL, paymentMethodId };
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