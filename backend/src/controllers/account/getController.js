import { getAccounts } from '../../models/accountModel.js'; // Verifique se a função está exportada corretamente no model
import exceptionHandler from '../../utils/ajuda.js';
import { DateTime } from 'luxon'; // A importação está correta

export const getAccount = async (req, res) => {
    try {
        const accounts = await getAccounts(); // Chame a função correta que foi exportada do model

        // Formata os dados
        const accountsFormatted = accounts.map(account => ({
            ...account,
            cpf: account.cpf.toString(),
            telefone: account.telefone ? account.telefone.toString() : null,
            data_registro: DateTime.fromJSDate(account.data_registro)
                .setZone('America/Sao_Paulo').toString() // Formata a data
        }));

        // Retorna a resposta com os dados formatados
        res.json(accountsFormatted);
    } catch (exception) {
        exceptionHandler(exception, res); // Trata exceções e envia a resposta apropriada
    }
};
