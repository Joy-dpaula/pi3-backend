import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';


function gerarCodigoBoleto(valor) {
    const valorFormatado = valor.toFixed(2).replace('.', ''); 
    const codigoBarras = `34191.75803 01234.567890 12345.678904 1 234500000${valorFormatado}`;

    return {
        codigoBarras,
        codigoCopiarColar,
    };
}

export async function createPaymentModel(compraId, creditCardId) {
    console.log("compraId recebido:", compraId);

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
    const paymentId = uuidv4();  

    let qrCodeURL = null; 

    let creditCardData = undefined;
    let boletoData = null; // Certifique-se de declarar boletoData aqui

    if (paymentMethod === 'creditCard') {
     
        console.log("creditCardId recebido:", creditCardId);

        if (creditCardId === undefined || creditCardId === null) {
            throw new Error('Cartão de crédito não informado!');
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
        creditCardData = {
            connect: { id: creditCardId }
        };
        
    

    } else if (paymentMethod === 'pix') {
        
        status = 'Aguardando';

        const pixData = {
            transactionId: paymentId, 
            amount: compra.veiculo.valor,  
            timestamp: new Date().toISOString(),
        };

        const pixString = `
            Amount: ${pixData.amount / 100} BRL
            Transaction ID: ${pixData.transactionId}
            Timestamp: ${pixData.timestamp}
        `.trim();

        qrCodeURL = await QRCode.toDataURL(pixString, { errorCorrectionLevel: 'M', width: 200 });

        console.log('Pagamento Pix Simulado:', pixData);

    }else if (paymentMethod === 'boleto') {
        status = 'Aguardando';  

        // Gera os dados do boleto
     const boletoData = gerarCodigoBoleto(compra.veiculo.valor);
        console.log('Pagamento via Boleto Simulado:', boletoData);
    }  
    
    
    else {
        throw new Error('Método de pagamento inválido!');
    }

    const paymentData = {
        id: paymentId,
        paymentMethod,
        status,
        amount: compra.veiculo.valor,
        compra: {
            connect: { id: compraId }
        },
        usuario: {
            connect: { id: compra.usuarioId }
        },
        creditCard: creditCardData, 
        pixQRCodeURL: qrCodeURL || undefined  ,
        boletoURL:  boletoData ? boletoData.codigoBarras : undefined
    };

    const payment = await prisma.payment.create({
        data: paymentData
    });

    // Atualiza o status da compra para "aceita"
    await prisma.compra.update({
        where: { id: compraId },
        data: {
            status: 'aceita',
        }
    });

    // Retorna o pagamento, incluindo o QR Code para Pix, se aplicável
    return {
        payment,
        qrCodeURL
    };
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
        where: { id: id }
    });

    if (!pagamentoExistente) {
        throw new Error('Pagamento não encontrado!')
    }

    const pagamentoAtualizado = await prisma.payment.update({
        where: { id: id },
        data: {
            usuarioId: usuarioId ?? pagamentoExistente.usuarioId,
            compraId: compraId ?? pagamentoExistente.compraId,
            creditCardId: creditCardId !== undefined ? creditCardId : pagamentoExistente.creditCardId, 
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