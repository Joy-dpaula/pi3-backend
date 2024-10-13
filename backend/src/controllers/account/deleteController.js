import { getUsuarioById, deleteAccountById } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const deleteAccount = async (req, res) => {
    const { id } = req.params; 
    const userToken = req.user; 


    if (!userToken || !userToken.email) {
        return res.sendStatus(401);
    }

    try {
        const usuario = await getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        await deleteAccountById(id);

        return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        exceptionHandler(error, res); 
    }
};
