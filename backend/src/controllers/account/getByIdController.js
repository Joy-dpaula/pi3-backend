import { getUsuarioById } from '../../models/accountModel.js'; 
import exceptionHandler from '../../utils/ajuda.js';

export const getAccountByIdController = async (req, res) => {
    const { id } = req.params; 
    try {
        const account = await getUsuarioById(id);

        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada!" }); 
        }

        res.json(account);
    } catch (exception) {
        console.error('Erro ao recuperar conta:', exception);
        exceptionHandler(exception, res);
    }
};
