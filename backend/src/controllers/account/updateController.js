import bcrypt from 'bcryptjs';

import { update } from "../../models/accountModel.js";

const updateController = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const usuario = req.body;

        usuario.id = Number(id);

        if (isNaN(usuario.id)) {
            return res.status(400).json({
                error: "ID inválido!"
            });
        }

        const result = await update(usuario.id, usuario); 

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
