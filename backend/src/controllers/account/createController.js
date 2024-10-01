import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { createNewUser } from '../../models/accountModel.js'
import { DateTime } from 'luxon'; // Importar luxon para formatação de datas

export async function createAccount(req, res) {
    const { nome, email, senha, cpf, telefone, nascimento,  cidade, estado,foto_perfil,isAdmin } = req.body;

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ error: "Nome, email, senha, CPF e telefone são obrigatórios." });
    }

    if (senha.length < 8) {
        return res.status(400).json({ error: "A senha é obrigatória e deve ter no mínimo 8 caracteres." });
    }

    if (isNaN(cpf) || isNaN(telefone)) {
        return res.status(400).json({ error: "CPF e telefone devem conter apenas números." });
    }

    try {
        const usuario = await createNewUser({ nome, email, senha, cpf, telefone, nascimento, cidade, estado,foto_perfil, isAdmin });

        if (!usuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }
        usuario.data_registro = DateTime.fromJSDate(usuario.data_registro).setZone('America/Sao_Paulo').toString();

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;
        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}