// controllers/accountController.js
import { getUsuarios } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const getAccount = async (req, res) => {
    try {
        // Chama o model para buscar os usuários
        const usuarios = await getUsuarios();

        // Formata os dados
        const usuariosFormatted = usuarios.map(usuario => ({
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
        }));

        // Retorna a resposta
        res.json(usuariosFormatted);
    } catch (exception) {
        // Trata exceções com o helper de exceção
        exceptionHandler(exception, res);
    }
};