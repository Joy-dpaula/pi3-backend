import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { update } from "../../models/accountModel.js";

const updateController = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const usuario = req.body;

        // Ensure id is included in the data
        usuario.id = Number(id);

        // Validate the id
        if (isNaN(usuario.id)) {
            return res.status(400).json({
                error: "ID inválido!"
            });
        }

        const result = await update(usuario.id, usuario); // Pass both ID and user data

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
        // Handle specific Prisma error
        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: `Conta com o id ${id} não encontrada!`
            });
        }
        next(error); // Pass other errors to the next middleware
    }
}

export default updateController;