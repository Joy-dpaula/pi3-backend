import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { update } from '../../models/accountModel.js'; // Ensure this function exists and works as intended

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

        const updateData = {
            nome,
            email,
            senha: senha ? await bcrypt.hash(senha, 12) : checkUsuario.senha, // Keep current password if not updating
            cpf: cpf ? cpf.toString() : checkUsuario.cpf, // Keep current CPF if not updating
            telefone: telefone ? telefone.toString() : checkUsuario.telefone, // Keep current phone if not updating
            nascimento: nascimento ? new Date(nascimento) : checkUsuario.nascimento, // Keep current date if not updating
            isAdmin: isAdmin !== undefined ? isAdmin : checkUsuario.isAdmin, // Keep current admin status if not updating
        };

        const usuario = await prisma.usuario.update({
            where: { id },
            data: updateData,
        });

        return res.json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
