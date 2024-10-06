
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
console.log(prisma);

export async function createAdmin({ nome, email, senha, isAdmin }) {
    try {
        const existingAdmin = await prisma.admin.findUnique({ where: { email } });

        if (existingAdmin) {
            return null;
        }

        const hashedSenha = await bcrypt.hash(senha, 12);
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
    } catch (error) {
        console.error('Erro ao criar administrador:', error);
        throw new Error('Erro ao criar administrador');
    }
}

export async function getAdmins() {
    try {
        const admins = await prisma.admin.findMany();
        return admins;
    } catch (error) {
        console.error('Erro ao buscar administradores:', error);
        throw new Error('Erro ao buscar administradores');
    }
}

export async function getAdminById(id) {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: Number(id) },
        });
        return admin;
    } catch (error) {
        console.error('Erro ao buscar administrador:', error);
        throw new Error('Erro ao buscar administrador');
    }
}

export async function deleteAdminById(id) {
    try {
        return await prisma.admin.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        console.error('Erro ao deletar administrador:', error);
        throw new Error('Erro ao deletar administrador');
    }
}

export async function updateAdmin(id, data) {
    try {
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
    } catch (error) {
        console.error('Erro ao atualizar administrador:', error);
        throw new Error('Erro ao atualizar administrador');
    }
}

export async function getAdminByEmail(email) {
    return await prisma.admin.findUnique({
        where: {
            email: email,
        },
    });
}