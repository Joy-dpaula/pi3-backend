import { getAccountById } from '../../models/accountModel.js'; // Certifique-se de que o nome está correto no model
import exceptionHandler from '../../utils/ajuda.js';

export const getAccountByIdController = async (req, res) => {
    const { id } = req.params; // Obtém o ID da conta a ser recuperada

    try {
        const account = await getAccountById(id); // Chama a função do model para obter a conta

        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada!" }); // Retorna erro se a conta não for encontrada
        }

        res.json(account); // Retorna a conta encontrada
    } catch (exception) {
        console.error('Erro ao recuperar conta:', exception); // Log para depuração
        exceptionHandler(exception, res); // Trata exceções usando o handler
    }
};
