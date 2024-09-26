import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { createNewUser } from '../../models/accountModel.js'

export async function createAccount(req, res) {
    const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;

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
        const usuario = await createNewUser({ nome, email, senha, cpf, telefone, nascimento, isAdmin });

        if (!usuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;
        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}