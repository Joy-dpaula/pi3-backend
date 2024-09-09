import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getMessage(req, res){
    const { userId } = req.user;
    const { recipientId } = req.params;

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, recipientId: parseInt(recipientId) },
                    { senderId: parseInt(recipientId), recipientId: userId }
                ]
            },
            orderBy: { timestamp: 'asc' } // Ordenar por ordem de envio
        });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter mensagens.', error: error.message });
    }
};