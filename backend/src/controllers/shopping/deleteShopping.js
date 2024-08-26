import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function deleteShopping(req, res) {
    try {
        // Extrai o id da requisição
        const { id } = req.params;

        // Encontra a compra pela id
        const compra = await prisma.compra.findUnique({ where: { id: parseInt(id) } });

        // Verifica se a compra existe
        if (!compra) {
            return res.status(404).json({ error: "Compra não encontrada." });
        }

        // Deleta a compra
        await prisma.compra.delete({ where: { id: parseInt(id) } });

        // Retorna status 204 (No Content)
        res.status(204).end();

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
