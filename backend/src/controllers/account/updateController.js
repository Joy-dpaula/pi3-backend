// controllers/account/updateController.js

import { updateAccount } from "../../models/accountModel.js"; // Altere para o nome correto

const updateController = async (req, res, next) => {
    const { id } = req.params; // O ID da conta a ser atualizada

    try {
        const usuario = req.body; // Os dados da conta a serem atualizados
        usuario.id = Number(id); // Adicionando o ID aos dados do usuário

        if (isNaN(usuario.id)) {
            return res.status(400).json({
                error: "ID inválido!"
            });
        }

        const result = await updateAccount(usuario.id, usuario); // Chamar a função de atualização

        if (!result) {
            return res.status(404).json({
                error: "Erro ao atualizar a conta!"
            });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            usuario: result
        });
    } catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: `Conta com o id ${id} não encontrada!`
            });
        }
        next(error); 
    }
}

export default updateController;
