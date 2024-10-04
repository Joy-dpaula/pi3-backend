// controllers/account/deleteController.js

import { getUsuarioById, deleteAccountById } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const deleteController = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a ser deletado

    try {
        const usuario = await getUsuarioById(id); // Verifica se o usuário existe

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        await deleteAccountById(id); // Deleta o usuário

        return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        exceptionHandler(error, res);
    }
};
