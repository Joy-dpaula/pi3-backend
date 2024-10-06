
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';


import exceptionHandler from '../../utils/ajuda.js'; // Verifique o caminho correto para o seu manipulador de exceções

export const createAdminUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const userExists = await prisma.Admin.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const hashedSenha = await bcrypt.hash(senha, 12);

        // Cria um novo usuário admin
        const newUser = await prisma.Admin.create({
            data: {
                nome,
                email,
                senha: hashedSenha, // Salvando a senha hash
                isAdmin: true,
            },
        });

        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

// Deletar um usuário
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.Admin.delete({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

// Obter todos os usuários
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.Admin.findMany();
        res.status(200).json(users);
    } catch (error) {
        exceptionHandler(error, res);
    }
};
                                                       



export const updateUserByAdmin = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, cidade, estado } = req.body;

    try {
        const userExists = await prisma.Admin.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const updatedUser = await prisma.Admin.update({
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
