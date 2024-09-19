// // controllers/accountController.js
// import { getUsuarioById, deleteUsuarioById } from '../../models/accountModel.js';
// import { exceptionHandler } from '../../utils/ajuda.js';

// export const deleteAccount = async (req, res) => {
//     try {
//         const id = Number(req.params.id);
//         const token = req.accessToken;
//         // Verificar se o token está definido e contém a propriedade email
//         if (!token || !token.email) {
//             return res.sendStatus(401); // Unauthorized
//         }

//         // Verificar se o usuário existe
//         const checkUsuario = await getUsuarioById(id);

//         // Verificar se o usuário existe e se o token é válido para deletar o usuário
//         if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
//             return res.sendStatus(403); // Forbidden
//         }

//         // Deletar o usuário
//         await deleteUsuarioById(id);

//         res.status(204).end(); // No Content
//     } catch (exception) {
//         exceptionHandler(exception, res);
//     }
// };


import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';


const prisma = new PrismaClient();

export default async function deleteAccount(req, res) {
    try {
        const id = Number(req.params.id);
        const token = req.accessToken;

        // Verificar se o token está definido e contém a propriedade email
        if (!token || !token.email) {
            return res.sendStatus(401); // Unauthorized
        }

        const checkUsuario = await prisma.usuario.findUnique({ where: { id } });


        // Verificar se o usuário existe e se o token é válido para deletar o usuário
        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403); // Forbidden
        }

        await prisma.usuario.delete({ where: { id } });
        res.status(204).end(); // No Content
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
