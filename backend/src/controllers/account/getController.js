// controllers/account/getController.js
import { getAccounts } from '../../models/accountModel.js'; // Atualize para a função correta
import exceptionHandler from '../../utils/ajuda.js';
import { DateTime } from 'luxon'; // Importar luxon corretamente

export const getAccount = async (req, res) => {
    try {
        const accounts = await getAccounts(); // Chame a função correta

<<<<<<< HEAD
        const accountsFormatted = accounts.map(account => ({
            ...account,
            cpf: account.cpf.toString(),
            telefone: account.telefone ? account.telefone.toString() : null,
=======
        const usuarios = await getUsuarios();

        const usuariosFormatted = usuarios.map(usuario => ({
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
            data_registro: DateTime.fromJSDate(usuario.data_registro).setZone('America/Sao_Paulo').toString()

>>>>>>> 1aed80fefe2d729facc4153246703880c24612eb
        }));

        res.json(accountsFormatted); // Retorna as contas formatadas
    } catch (exception) {
        exceptionHandler(exception, res); // Trata exceções
    }
};
