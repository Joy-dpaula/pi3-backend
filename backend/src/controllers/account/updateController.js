

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';


const prisma = new PrismaClient();

export default async function updateAccount(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;
        const token = req.accessToken;

        const checkUsuario = await prisma.usuario.findUnique({ where: { id } });

        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }

        const data = {
            nome,
            email,
            senha: senha ? await bcrypt.hash(senha, 12) : undefined,
            cpf: cpf ? cpf.toString() : undefined,
            telefone: telefone ? telefone.toString() : undefined,
            nascimento: nascimento ? new Date(nascimento) : undefined,
            isAdmin: isAdmin !== undefined ? isAdmin : undefined,
        };

        const usuario = await prisma.usuario.update({
            where: { id },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true,
            }
        });

        res.json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
