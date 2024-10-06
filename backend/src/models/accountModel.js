import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

const gmt3Date = DateTime.now().setZone('America/Sao_Paulo');

// console.log("Current time in GMT-3:", gmt3Date.toString());
const passwordSchema = z.string()
  .min(8, { message: "A senha deve ter um tamanho mínimo de 8 caracteres." })
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
    message: "Senha deve ter pelo menos 8 caracteres (incluindo letras maiúsculas, minúsculas, números e caracteres especiais)"
  });

const userSchema = z.object({
    nome: z.string().min(1, { message: "Nome deve ser obrigatório" }),
    cpf: z.string().length(11, { message: "CPF deve conter 11 dígitos" }),
    email: z.string().email({ message: "Email em formato inválido" }).max(200),
    senha: passwordSchema,
})


export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado, foto_perfil }) {
    const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

    const result = userSchema.safeParse({ nome, cpf, email, senha })

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message).join(", ");
        throw new Error(errors);
    }

    const existingCpf = await prisma.usuario.findUnique({ where: { cpf } });
    const existingEmail = await prisma.usuario.findUnique({ where: { email } });

    if (existingUsuario) {
        return null; 
    if (existingCpf){
        throw new Error("Esse CPF já esta em uso por outro usuário.")
    }

    if (existingEmail) {
        throw new Error("Esse Email já esta em uso por outro usuário.");
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
        where: { id: String(id) },
    });
    return account;
}

export const deleteUsuarioById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: String(id) },
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
