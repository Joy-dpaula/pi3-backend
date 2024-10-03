import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

const gmt3Date = DateTime.now().setZone('America/Sao_Paulo');

const userSchema = z.object({
    nome: z.string().min(1, { message: "Nome deve ser obrigatório!" }),
    cpf: z.string().length(11, { message: "CPF deve ter 11 dígitos!" }),
    email: z.string().email({ message: "Email inválido!" }).max(200),
    senha: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres!" }),
})

console.log("Current time in GMT-3:", gmt3Date.toString());

export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado, foto_perfil }) {
    const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

    if (existingUsuario) {
        return null; 
    }

    const hashedSenha = await bcrypt.hash(senha, 12);

    const dataRegistroUTC = gmt3Date.toUTC().toJSDate();

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
            data_registro: dataRegistroUTC 
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
    return usuarios;
}

export async function getUsuarioById(id) {
    const account = await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account;
}

export const deleteUsuarioById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) },
    });
};

export const update = async (usuario) => {
    const result = await prisma.usuario.update({
        data: usuario,
        where:{
           id: usuario.id 
        }
    })
    return result
}
