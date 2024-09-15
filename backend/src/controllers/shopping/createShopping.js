import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

const prisma = new PrismaClient();

export default async function createShopping(req, res) {
    const { usuarioId, veiculoId } = req.body;

    try {
        // Verificar se o usuário existe
        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificar se o veículo existe
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: veiculoId }
        });

        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }

        // Criar a compra com status inicial "pendente"
        const compra = await prisma.compra.create({
            data: {
                veiculoId: veiculoId,
                usuarioId: usuarioId,
                status: 'pendente' // Definindo o status inicial
            },
            select: {
                id: true,
                status: true // Incluindo o status na resposta
            }
        });

        // Gerar token de acesso
        const jwt = generateAccessToken(compra);
        compra.accessToken = jwt;

        res.status(201).json(compra);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
