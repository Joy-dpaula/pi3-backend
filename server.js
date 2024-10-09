const express = require('express');
const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();
const app = express();
const PORT = 3000;

import cors from 'cors';

app.use(cors());

// Função para buscar detalhes do pagamento
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

// Função para gerar código do boleto
function gerarCodigoBoleto(valor) {
    const codigoBarras = `34191.75803 01234.567890 12345.678904 1 234500000${valor}`;
    const codigoCopiarColar = codigoBarras.replace(/[\s.]/g, ''); // Remove espaços e pontos

    return { codigoBarras, codigoCopiarColar };
}

// Rota para gerar o boleto
app.get('/gerar-boleto/:idPagamento', async (req, res) => {
    const idPagamento = req.params.idPagamento;
    const valor = await buscarDetalhesPagamento(idPagamento);

    if (!valor) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
    }

    const boleto = gerarCodigoBoleto(valor);
    res.json({
        valor,
        codigoBarras: boleto.codigoBarras,
        codigoCopiarColar: boleto.codigoCopiarColar,
    });
});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
