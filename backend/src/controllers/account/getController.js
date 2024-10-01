// controllers/accountController.js
import { getUsuarios } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';
import { DateTime } from 'luxon'; // Importar luxon corretamente

export const getAccount = async (req, res) => {
    try {

        const usuarios = await getUsuarios();

        const usuariosFormatted = usuarios.map(usuario => ({
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
            data_registro: DateTime.fromJSDate(usuario.data_registro).setZone('America/Sao_Paulo').toString()

        }));

        res.json(usuariosFormatted);
    } catch (exception) {

        exceptionHandler(exception, res);
    }
};