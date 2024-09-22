import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;

    try {
        
        const user = await prisma.usuario.findUnique({
            where: { id: recipientId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User não encontrado' });
        }

        const message = await prisma.message.create({
            data: {
                recipientId: user,
                content: content,
            },
        });

       
        res.status(201).json({ message: 'Mensagem enviada com sucesso.', data: message });
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


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
            orderBy: { timestamp: 'asc' } 
        });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter mensagens.', error: error.message });
    }
};
