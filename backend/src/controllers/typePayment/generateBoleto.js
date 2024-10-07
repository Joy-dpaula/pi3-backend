// Importa o Prisma Client usando a sintaxe ES Modules
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

// Função para buscar os detalhes do pagamento a partir do ID
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
        return pagamento.amount; // Retorna o valor do pagamento
    } catch (erro) {
        console.error('Erro ao buscar detalhes do pagamento:', erro);
        return null;
    }
}

// Função para gerar o código de barras e o código de "copiar e colar" do boleto
function gerarCodigoBoleto(valor) {
    const codigoBarras = `34191.75803 01234.567890 12345.678904 1 234500000${valor}`;
    const codigoCopiarColar = codigoBarras.replace(/[\s.]/g, ''); // Remove espaços e pontos para um código simplificado

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
