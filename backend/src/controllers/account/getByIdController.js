// controllers/account/getAccountByIdController.js

import exceptionHandler from '../../utils/ajuda.js'; // Importa a função de tratamento de exceções
import { getAccountById } from '../../models/accountModel.js'; // Atualize para a função correta

export default async function getAccountByIdController(req, res) {
    try {
        const id = Number(req.params.id); // Obtém o ID da conta da URL
        const account = await getAccountById(id); // Chama a função correta

        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada!" }); // Retorna 404 se não encontrar a conta
        }

        res.json(account); // Retorna a conta encontrada
    } catch (exception) {
        exceptionHandler(exception, res); // Chama o manipulador de exceções em caso de erro
    }
}
