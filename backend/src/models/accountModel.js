import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs';



export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin }) {
    // Verifica se o usuário já existe
    const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

    if (existingUsuario) {
        return null;
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 12);

    // Criação do novo usuário no banco de dados
    const usuario = await prisma.usuario.create({
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
    // Certifique-se de que o id está sendo usado corretamente
    return await prisma.usuario.update({
        where: { id },
        data,
        select: {
            id: true,
            nome: true,
            email: true,
            isAdmin: true,
        }
    });
}




