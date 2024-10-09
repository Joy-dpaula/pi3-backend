import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const simulateFinancing = async (req, res) => {
    const { veiculoId, parcelas, taxaJuros } = req.body;

    try {
        const veiculo = await prisma.veiculo.findUnique({ where: { id: veiculoId } });
        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado' });
        }

        const valorVeiculo = veiculo.valor;
        const taxaMensal = taxaJuros / 100;
        const numeroParcelas = parcelas;

        const prestacao = (valorVeiculo * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -numeroParcelas));
        const valorTotal = prestacao * numeroParcelas;
        const jurosTotal = valorTotal - valorVeiculo;

        res.status(200).json({
            valorVeiculo,
            numeroParcelas,
            taxaJuros,
            prestacao: prestacao.toFixed(2),
            valorTotal: valorTotal.toFixed(2),
            jurosTotal: jurosTotal.toFixed(2),
        });
    } catch (error) {
        console.error('Erro ao simular financiamento:', error);
        res.status(500).json({ error: 'Erro ao simular financiamento' });
    }
};
