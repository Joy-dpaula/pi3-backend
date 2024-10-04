import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

// Cria um novo usuário
export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado, foto_perfil }) {
    const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

    if (existingUsuario) {
        return null; // Retorna null se o usuário já existir
    }

    const hashedSenha = await bcrypt.hash(senha, 12); // Hash da senha

    const dataRegistroUTC = DateTime.now().setZone('America/Sao_Paulo').toUTC().toJSDate(); // Data de registro em UTC

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: hashedSenha,
            cpf: cpf.toString(),
            telefone: telefone.toString(),
            nascimento: nascimento ? new Date(nascimento) : null,
            isAdmin: isAdmin || false,
            cidade,
            estado,
            foto_perfil,
            data_registro: dataRegistroUTC,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
        }
    });

    return usuario; // Retorna o usuário criado
}

// Recupera todos os usuários
export async function getUsuarios() {
    const usuarios = await prisma.usuario.findMany();
    return usuarios; // Retorna todos os usuários
}

// Recupera um usuário pelo ID
export async function getUsuarioById(id) {
    const account = await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account; // Retorna o usuário encontrado ou null
}

// Deleta um usuário pelo ID
export const deleteAccountById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) },
    });
};

// Atualiza um usuário pelo ID
export const updateUsuario = async (id, data) => {
    if (!id) {
        throw new Error('ID não fornecido');
    }

    const userId = Number(id);
    console.log("Received ID:", userId);

    if (isNaN(userId)) {
        throw new Error('ID inválido');
    }

    try {
        const updatedUsuario = await prisma.usuario.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true,
            },
        });

        return updatedUsuario; // Retorna o usuário atualizado
    } catch (error) {
        console.error('Update failed:', error);
        throw new Error('Failed to update user');
    }
};

// ** NOVA FUNÇÃO ADICIONADA **
export const getAccountById = async (id) => {
    const account = await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account; // Retorna a conta encontrada ou null
};
