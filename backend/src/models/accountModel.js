// models/accountModel.js
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Cria uma nova conta
export const createNewAccount = async ({ nome, email, senha, cpf, telefone, nascimento, isAdmin }) => {
    const existingAccount = await prisma.usuario.findUnique({ where: { email } });
    if (existingAccount) {
        return null;
    }

    const hashedSenha = await bcrypt.hash(senha, 12);
    const account = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: hashedSenha,
            cpf: cpf.toString(),
            telefone: telefone.toString(),
            nascimento: nascimento ? new Date(nascimento) : null,
            isAdmin: isAdmin || false,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
        },
    });

    return account;
};

// Recupera todas as contas
export const getAccounts = async () => {
    return await prisma.usuario.findMany();
};

// Recupera uma conta pelo ID
export const getAccountById = async (id) => {
    return await prisma.usuario.findUnique({ where: { id: Number(id) } });
};

// Deleta uma conta pelo ID
export const deleteAccountById = async (id) => {
    return await prisma.usuario.delete({ where: { id: Number(id) } });
};

// Atualiza uma conta
export const updateAccount = async (id, data) => {
    if (!id) {
        throw new Error('ID não fornecido');
    }

    const userId = Number(id);
    if (isNaN(userId)) {
        throw new Error('ID inválido');
    }

    try {
        return await prisma.usuario.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true,
            },
        });
    } catch (error) {
        throw new Error('Falha ao atualizar a conta');
    }
};
