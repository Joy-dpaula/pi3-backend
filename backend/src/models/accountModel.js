import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';
import { z } from 'zod';

const prisma = new PrismaClient();

const gmt3Date = DateTime.now().setZone('America/Sao_Paulo');

console.log("Current time in GMT-3:", gmt3Date.toString());

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
});

export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado, foto_perfil }) {

    const result = userSchema.safeParse({ nome, cpf, email, senha })

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message).join(", ");
        throw new Error(errors);
    }

    const existingCpf = await prisma.usuario.findUnique({
        where: { cpf }
    });

    const existingEmail = await prisma.usuario.findUnique({
        where: { email }
    });

    if (existingCpf) {
        throw new Error("Esse CPF já está em uso por outro usuário.");
    }

    if (existingEmail) {
        throw new Error("Esse Email já está em uso por outro usuário.");
    }

    const hashedSenha = await bcrypt.hash(senha, 12);
    const dataRegistroUTC = DateTime.now().setZone('America/Sao_Paulo').toUTC().toJSDate();

    let nascimentoFormatado = null;
    if (nascimento) {
        const [day, month, year ] = nascimento.split('/');
        nascimentoFormatado = new Date(year, month - 1, day);
    }

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: hashedSenha,
            cpf: cpf.toString(),
            telefone: telefone.toString(),
            nascimento: nascimentoFormatado,
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

export const deleteAccountById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: String(id) },
    });
};

export const updateUsuario = async (id, data) => {
    if (!id) {
        throw new Error('ID não fornecido');
    }

    const userId = Number(id);

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

export const getAccountById = async (id) => {
    const account = await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account;
};

export const getAccounts = async () => {
    try {
        const accounts = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                cpf: true,
                telefone: true,
                nascimento: true,
                data_registro: true,
                isAdmin: true
            }
        });
        return accounts;
    } catch (error) {
        console.error('Erro ao buscar contas:', error);
        throw new Error('Não foi possível buscar as contas');
    }
};
