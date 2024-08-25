
import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getAccountById(req, res) {
    try {
        const id = Number(req.params.id);
        const usuario = await prisma.usuario.findUniqueOrThrow({ where: { id } });


        const usuarioFormatted = {
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
        };



        res.json(usuarioFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
