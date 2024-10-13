import { getUsuarioById, deleteAccountById } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const deleteAccount = async (req, res) => {
    const { id } = req.params; 
    const userToken = req.user; 

    console.log("Informações do usuário autenticado:", userToken);

    if (!userToken || typeof userToken.isAdmin === 'undefined' || typeof userToken.id === 'undefined') {
        return res.status(401).json({ error: "Usuário não autenticado ou token inválido." });
    }

    const isAdmin = userToken.isAdmin;
    const userId = userToken.id;

    console.log('isAdmin:', isAdmin);  
    console.log('ID do usuário:', userId); 

    if (!isAdmin && String(id) !== String(userId)) {
        return res.status(403).json({ error: "Você não tem permissão para deletar este usuário." });
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
