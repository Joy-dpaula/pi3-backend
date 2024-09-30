import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs';



export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado,foto_perfil }) {

    const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

    if (existingUsuario) {
        return null;
    }

    const hashedSenha = await bcrypt.hash(senha, 12);

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
            data_registro: new Date()

        },
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
            data_registro: true,
            cidade: true,
            estado: true,
            foto_perfil: true
        }
    });

    return usuario;
}

export async function getUsuarios() {

    const usuarios = await prisma.usuario.findMany();

    return usuarios
    
}

export async function getUsuarioById(id) {
    const account= await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account
};




export const deleteUsuarioById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) },
    });
};



export const update = async (id, data) => {
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

        return updatedUsuario;
    } catch (error) {
        console.error('Update failed:', error);
        throw new Error('Failed to update user');
    }
};
