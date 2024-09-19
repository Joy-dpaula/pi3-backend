import { PrismaClient } from "@prisma/client"
import { generateAccessToken } from '../utils/auth.js';
import { setCookie } from '../utils/cookie.js';
import { encrypt } from '../utils/crypto.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export const loginModel = async (email, senha, res) => {

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    
    if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }
    
    const validsenha = await bcrypt.compare(senha, usuario.senha);

    if (!validsenha) {
        return res.status(401).json({ error: "Senha inválida." });
    }

    const accessToken = generateAccessToken({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf.toString(),
        telefone: usuario.telefone ? usuario.telefone.toString() : null,
        isAdmin: usuario.isAdmin
    });

    const isProduction = process.env.NODE_ENV === 'production';

    const sameSiteOption = isProduction ? 'None' : 'Lax';
    const secureOption = isProduction;

    if (sameSiteOption === 'None' && !secureOption) {
        throw new Error("sameSite 'None' requires 'secure' to be true in production.");
    }

    setCookie(res, 'userData', encrypt(JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf.toString(),
        telefone: usuario.telefone ? usuario.telefone.toString() : null,
        isAdmin: usuario.isAdmin,
        accessToken
    })));

    return { usuario, accessToken };
}