
import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getAccount(req, res) {
    try {
        const usuarios = await prisma.usuario.findMany();
        const usuariosFormatted = usuarios.map(usuario => ({
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
        }));
        res.json(usuariosFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
