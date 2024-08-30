
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';

import { setCookie} from '../../utils/cookie.js' 
import { encrypt } from '../../utils/crypto.js';


const prisma = new PrismaClient();

export default async function loginController(req, res) {
    const { email, senha } = req.body;

    try {
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


        setCookie(res, 'userData', encrypt(JSON.stringify({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
            isAdmin: usuario.isAdmin,
            accessToken
          })), { 
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            httpOnly: true, // Não acessível via JavaScript
            secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
            sameSite: 'Strict' // Protege contra CSRF
          });
          
    

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            accessToken
        });
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}

