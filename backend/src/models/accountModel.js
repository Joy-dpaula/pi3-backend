import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';
import { z } from 'zod'; // Certifique-se de que está importando zod

const prisma = new PrismaClient();

// Definir o fuso horário
const gmt3Date = DateTime.now().setZone('America/Sao_Paulo');

// Esquema de validação da senha usando Zod
const passwordSchema = z.string()
  .min(8, { message: "A senha deve ter um tamanho mínimo de 8 caracteres." })
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
    message: "Senha deve ter pelo menos 8 caracteres (incluindo letras maiúsculas, minúsculas, números e caracteres especiais)"
  });

// Esquema de validação do usuário usando Zod
const userSchema = z.object({
    nome: z.string().min(1, { message: "Nome deve ser obrigatório" }),
    cpf: z.string().length(11, { message: "CPF deve conter 11 dígitos" }),
    email: z.string().email({ message: "Email em formato inválido" }).max(200),
    senha: passwordSchema,
});

// Função para criar um novo usuário
export async function createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin, cidade, estado, foto_perfil }) {
    // Valida os dados de entrada
    try {
        userSchema.parse({ nome, cpf, email, senha });
    } catch (error) {
        throw new Error(`Erro de validação: ${error.message}`);
    }

    // Verifica se o CPF ou email já estão em uso
    const existingCpf = await prisma.usuario.findUnique({ where: { cpf } });
    const existingEmail = await prisma.usuario.findUnique({ where: { email } });

    if (existingCpf) {
        throw new Error("Esse CPF já está em uso por outro usuário.");
    }

    if (existingEmail) {
        throw new Error("Esse Email já está em uso por outro usuário.");
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 12);

    // Define a data de registro em UTC
    const dataRegistroUTC = DateTime.now().setZone('America/Sao_Paulo').toUTC().toJSDate();

    // Cria o novo usuário no banco de dados
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
        where: { id: String(id) },
    });
    return account; // Retorna o usuário encontrado ou null
}

// Deleta um usuário pelo ID
export const deleteAccountById = async (id) => {
    return await prisma.usuario.delete({
        where: { id: String(id) },
    });
};

// Atualiza um usuário pelo ID
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

        return updatedUsuario; // Retorna o usuário atualizado
    } catch (error) {
        console.error('Update failed:', error);
        throw new Error('Failed to update user');
    }
};

// ** Função para buscar uma conta por ID **
export const getAccountById = async (id) => {
    const account = await prisma.usuario.findUnique({
        where: { id: Number(id) },
    });
    return account; // Retorna a conta encontrada ou null
};

// ** Função para buscar todas as contas ** 
export const getAccounts = async () => {
    try {
        const accounts = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                cpf: true,
                telefone: true,
                data_registro: true,
                isAdmin: true
            }
        });
        return accounts; // Retorna todas as contas
    } catch (error) {
        console.error('Erro ao buscar contas:', error);
        throw new Error('Não foi possível buscar as contas');
    }
};
