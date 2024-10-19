import {getUsuarios } from '../../models/accountModel.js'; 
import exceptionHandler from '../../utils/ajuda.js';
import { DateTime } from 'luxon';

export const getAccount = async (req, res) => {
    try {
        const accounts = await getUsuarios();

        const accountsFormatted = accounts.map(account => ({
            ...account,
            cpf: account.cpf.toString(),
            telefone: account.telefone ? account.telefone.toString() : null,
            data_registro: DateTime.fromJSDate(account.data_registro)
                .setZone('America/Sao_Paulo').toString() 
        }));

        res.json(accountsFormatted);
    } catch (exception) {
        exceptionHandler(exception, res); 
    }
};
