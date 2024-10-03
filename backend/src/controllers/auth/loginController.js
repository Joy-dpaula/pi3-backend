import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { setCookie } from '../../utils/cookie.js';
import { encrypt } from '../../utils/crypto.js';

import { loginModel } from '../../models/authModel.js';

export default async function loginController(req, res) {

    const { email, senha } = req.body;

    try {
        
        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios!" });
        }

        const { usuario, accessToken } = await loginModel(email, senha, res);

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            admin: usuario.isAdmin,
            nascimento: usuario.nascimento,
            senha: usuario.senha,
            foto_perfil: usuario.foto_perfil,
            cidade: usuario.cidade,
            estado: usuario.estado,
            
            accessToken
        });

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}