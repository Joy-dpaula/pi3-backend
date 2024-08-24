import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function deleteVeiculo(req, res) {
    const { id } = req.params;

    try {
        // Verifica se o veículo existe
        const veiculo = await prisma.veiculo.findUnique({ where: { id: parseInt(id) } });
        if (!veiculo) {
            return res.status(404).json({ error: "Veículo não encontrado." });
        }

        // Remove o veículo
        await prisma.veiculo.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: "Veículo removido com sucesso." });
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
