import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createAdmin({ nome, email, senha, isAdmin }) {
    // Verifica se o admin já existe
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });

    if (existingAdmin) {
        return null;
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 12);

    // Criação do novo administrador no banco de dados
    const admin = await prisma.admin.create({
        data: {
            nome,
            email,
            senha: hashedSenha,
            isAdmin: isAdmin || false,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
        }
    });

    return admin;
}

export async function getAdmins() {
    const admins = await prisma.admin.findMany();
    return admins;
}

export async function getAdminById(id) {
    const admin = await prisma.admin.findUnique({
        where: { id: Number(id) },
    });
    return admin;
}

export async function deleteAdminById(id) {
    return await prisma.admin.delete({
        where: { id: Number(id) },
    });
}

export async function updateAdmin(id, data) {
    if (!id) {
        throw new Error('ID não fornecido');
    }

    return await prisma.admin.update({
        where: { id: Number(id) },
        data,
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
        },
    });
}