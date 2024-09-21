import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

const prisma = new PrismaClient();

export default async function createShopping(req, res) {
    const { usuarioId, veiculoId } = req.body;

    try {
     
        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

     
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: veiculoId }
        });

        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }

        const compra = await prisma.compra.create({
            data: {
                veiculoId: veiculoId,
                usuarioId: usuarioId,
                status: 'pendente' 
            },
            select: {
                id: true,
                status: true 
            }
        });

     
        const jwt = generateAccessToken(compra);
        compra.accessToken = jwt;

        res.status(201).json(compra);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
