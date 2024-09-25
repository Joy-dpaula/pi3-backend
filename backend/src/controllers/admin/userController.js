import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPaginatedUsers = async (req, res) => {
    const pageNumber = parseInt(req.query.page) || 0;

    try {
        const users = await prisma.usuario.findMany({
            skip: 10 * pageNumber,
            take: 10,
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

export const getUsersSummary = async (req, res) => {
    try {
        const users = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter resumo dos usuários' });
    }
};
