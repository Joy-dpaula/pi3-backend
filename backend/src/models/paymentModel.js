import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { v4 as uuid } from 'uuid'; // Para gerar UUIDs

export async function createPaymentModel(compraId, creditCardId = null) {

    // Busca a compra e inclui o método de pagamento
    const compra = await prisma.compra.findUnique({
        where: { id: compraId },
        include: { veiculo: true }
    });

    if (!compra) {
        throw new Error('Compra não encontrada!');
    }

    // Verifica o método de pagamento armazenado na compra
    const method = compra.paymentMethod;

    let status = 'pendente';
    let pixQRCodeURL = null;
    let boletoURL = null;
    let paymentMethodId = null; // ID do método de pagamento específico
    const paymentId = uuid(); // Gera o ID do pagamento

    // Processamento com base no método de pagamento
    if (method === 'creditCard') {
        if (!creditCardId) {
            throw new Error('Cartão de crédito não informado!');
        }

        // Verifica se o cartão de crédito existe e pertence ao usuário
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
        paymentMethodId = cartaoCredito.id; // ID do cartão de crédito

    } else if (method === 'pix') {
       
        paymentMethodId = uuid();
        status = 'Aguardando';

    } else if (method === 'boleto') {
        // Gera um UUID para o pagamento Boleto
        paymentMethodId = uuid();
        status = 'Aguardando';

    } else {
        throw new Error('Método de pagamento inválido!');
    }

    // Cria o pagamento no banco de dados
    const payment = await prisma.payment.create({
        data: {
            id: paymentId,
            usuarioId: compra.usuarioId,
            paymentMethodId, // Armazena o ID do método de pagamento (cartão, pix ou boleto)
            method, // Armazena o tipo do método de pagamento (creditCard, pix, boleto)
            status,
            amount: compra.veiculo.valor,
            compraId,
            timestamp: new Date(),
            pixQRCodeURL,
            boletoURL,
            creditCardId: method === 'creditCard' ? creditCardId : null, // Armazena o ID do cartão de crédito se for o método
        }
    });

    // Atualiza o status da compra
    await prisma.compra.update({
        where: { id: compraId },
        data: {
            status: 'aceita', // O status da compra é atualizado para "aceita"
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