import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

const prisma = new PrismaClient()


export default async function createShopping(req, res) {

    const { usuarioId, veiculoId } = req.body

    try {
        const veiculo = await prisma.veiculo.create({
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


        res.status(201).json(veiculo);

    } catch (exception) {
        exceptionHandler(exception, res);
    }

}