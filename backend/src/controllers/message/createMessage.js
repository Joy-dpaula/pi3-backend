import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Enviar uma nova mensagem
export default async function sendMessage(req, res) {
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