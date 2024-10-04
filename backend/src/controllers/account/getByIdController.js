// controllers/account/getByIdController.js
import { getAccountById } from '../../models/accountModel.js'; // Certifique-se de que o nome está correto
import exceptionHandler from '../../utils/ajuda.js';

export const getAccountByIdController = async (req, res) => {
    const { id } = req.params; // ID da conta a ser recuperada

    try {
        const account = await getAccountById(id); // Chama a função para obter a conta

        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada!" });
        }

        res.json(account); // Retorna a conta encontrada
    } catch (exception) {
        exceptionHandler(exception, res); // Trata exceções
    }
};
