// controllers/account/getController.js
import { getAccounts } from '../../models/accountModel.js'; // Atualize para a função correta
import exceptionHandler from '../../utils/ajuda.js';
import { DateTime } from 'luxon'; // Importar luxon corretamente

export const getAccount = async (req, res) => {
    try {
        const accounts = await getAccounts(); // Chame a função correta

        const accountsFormatted = accounts.map(account => ({
            ...account,
            cpf: account.cpf.toString(),
            telefone: account.telefone ? account.telefone.toString() : null,
            data_registro: DateTime.fromJSDate(account.data_registro).setZone('America/Sao_Paulo').toString() // Formata a data
        }));

        res.json(accountsFormatted); // Retorna as contas formatadas
    } catch (exception) {
        exceptionHandler(exception, res); // Trata exceções
    }
};
