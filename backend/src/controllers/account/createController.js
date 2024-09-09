

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';


const prisma = new PrismaClient();

export default async function createAccount(req, res) {
    const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;


    // Validação básica dos dados
    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ error: "Nome, email, senha, CPF e telefone são obrigatórios." });
    }

    if (senha.length < 8) {
        return res.status(400).json({ error: "A senha é obrigatória e deve ter no mínimo 8 caracteres." });
    }

    if (isNaN(cpf) || isNaN(telefone)) {
        return res.status(400).json({ error: "CPF e telefone devem conter apenas números." });
    }

    const hashedSenha = await bcrypt.hash(senha, 12);

    try {
        const existingUsuario = await prisma.usuario.findUnique({ where: { email } });

        if (existingUsuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }

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

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;
        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}

