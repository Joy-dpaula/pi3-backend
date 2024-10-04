// controllers/accountController.js
import { getAccountById, deleteAccountById } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const deleteAccount = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const token = req.accessToken;

        // Verificar se o token está presente e se o email é válido
        if (!token || !token.email) {
            return res.sendStatus(401); 
        }

        // Obter informações do usuário
        const checkAccount = await getAccountById(id);

        // Verificar se a conta existe e se o usuário tem permissão para excluí-la
        if (!checkAccount || (checkAccount.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }

        // Deletar a conta
        await deleteAccountById(id);

        // Retornar resposta de sucesso
        res.status(204).end();
        
        
    } catch (exception) {
        exceptionHandler(exception, res);
    }
};
