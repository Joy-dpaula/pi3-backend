
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

async function buscarDetalhesPagamento(idPagamento) {
    try {
        const pagamento = await prismaClient.payment.findUnique({
            where: { id: idPagamento },
            include: {
                compra: true,
            },
        });

        if (!pagamento) {
            throw new Error('Pagamento não encontrado');
        }
        return pagamento.amount; 
    } catch (erro) {
        console.error('Erro ao buscar detalhes do pagamento:', erro);
        return null;
    }
}


function gerarCodigoBoleto(valor) {
    const codigoBarras = `34191.75803 01234.567890 12345.678904 1 234500000${valor}`;
    const codigoCopiarColar = codigoBarras.replace(/[\s.]/g, ''); 

    return {
        codigoBarras,
        codigoCopiarColar,
    };
}

export async function generateBoleto(idPagamento) {
    const valor = await buscarDetalhesPagamento(idPagamento);

    if (!valor) {
        console.log('Não foi possível obter o valor do pagamento.');
        return;
    }

    const boleto = gerarCodigoBoleto(valor);
    console.log(`Valor do Item: R$ ${valor}`);
    console.log(`Código de Barras do Boleto: ${boleto.codigoBarras}`);
    console.log(`Código Copiar e Colar: ${boleto.codigoCopiarColar}`);
}
