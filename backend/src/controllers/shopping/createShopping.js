import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

const prisma = new PrismaClient()


export default async function createShopping(req, res) {

    const { usuarioId, veiculoId } = req.body

    try {
        const compra = await prisma.compra.create({
            data: {
                veiculoId: {
                    connect: { id: veiculoId }
                },
                usuarioId: {
                    connect: { id: usuarioId }
                }
            },
            select: {
                id: true,
                usuario: {
                    select: {
                        id: true,
                    },
                    veiculo: {
                        select: {
                            id: true,
                        }
                    }
                }
            }

        })

        const jwt = generateAccessToken(compra);
        compra.accessToken = jwt;
        res.status(201).json(compra);

    } catch (exception) {
        exceptionHandler(exception, res);
    }

}