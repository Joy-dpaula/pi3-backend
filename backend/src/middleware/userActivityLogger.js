import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userActivityLogger = async (req, res, next) => {
    const { id, isAdmin } = req.user || {}; 

    if (id) {
        try {
            await prisma.userActivity.create({
                data: {
                    userId: id,
                    action: `${req.method} ${req.originalUrl}`,
                    timestamp: new Date()
                }
            });
        } catch (error) {
            console.error('Erro ao registrar a atividade do usuário:', error);
        }
    }

    next();
};
