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
       c

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
