import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getShopping(req, res) {
    try {
        const compras = await prisma.compra.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                    },
                },
                veiculo: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        // Formata as compras para o formato desejado
        const comprasFormatted = compras.map(compra => ({
            id: compra.id,
            usuario: {
                id: compra.usuario.id,
            },
            veiculo: {
                id: compra.veiculo.id,
            }
        }));

        // Retorna as compras formatadas como resposta
        res.status(200).json(comprasFormatted);

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
