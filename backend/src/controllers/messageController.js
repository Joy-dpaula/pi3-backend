import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Enviar uma nova mensagem
export const sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    const { userId } = req.user; // Supondo que você tenha um middleware que adiciona userId ao req

    try {
        const message = await prisma.message.create({
            data: {
                senderId: userId,
                recipientId: parseInt(recipientId),
                content: content,
            },
        });

        // Aqui você pode adicionar uma lógica para notificar o destinatário
        res.status(201).json({ message: 'Mensagem enviada com sucesso.', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar a mensagem.', error: error.message });
    }
};

// Obter mensagens trocadas entre dois usuários
export const getMessages = async (req, res) => {
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
