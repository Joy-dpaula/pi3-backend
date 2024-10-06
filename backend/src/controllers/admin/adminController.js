import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import exceptionHandler from '../../utils/ajuda.js';

const prisma = new PrismaClient();
export const createAdminUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const adminExists = await prisma.admin.findUnique({ where: { email } });
        if (adminExists) {
            return res.status(400).json({ error: 'Admin já existe' });
        }

        const hashedSenha = await bcrypt.hash(senha, 12);

        const newAdmin = await prisma.admin.create({
            data: {
                nome,
                email,
                senha: hashedSenha,
                isAdmin: true,
            },
        });

        res.status(201).json({ message: 'Admin criado com sucesso', admin: newAdmin });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

export const updateUserByAdmin = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, cidade, estado } = req.body;

    try {
        const userExists = await prisma.usuario.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const updatedUser = await prisma.usuario.update({
            where: { id },
            data: {
                nome,
                email,
                telefone,
                cidade,
                estado,
            },
        });

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    } catch (error) {
        exceptionHandler(error, res);
    }
};
