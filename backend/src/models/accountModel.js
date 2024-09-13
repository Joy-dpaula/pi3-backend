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

