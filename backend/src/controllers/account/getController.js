// // controllers/accountController.js
// import { getUsuarios } from '../../models/accountModel.js';
// import { exceptionHandler } from '../../utils/ajuda.js';

// export const getAccount = async (req, res) => {
//     try {
//         // Chama o model para buscar os usuários
//         const usuarios = await getUsuarios();

//         // Formata os dados
//         const usuariosFormatted = usuarios.map(usuario => ({
//             ...usuario,
//             cpf: usuario.cpf.toString(),
//             telefone: usuario.telefone ? usuario.telefone.toString() : null,
//         }));

//         // Retorna a resposta
//         res.json(usuariosFormatted);
//     } catch (exception) {
//         // Trata exceções com o helper de exceção
//         exceptionHandler(exception, res);
//     }
// };

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