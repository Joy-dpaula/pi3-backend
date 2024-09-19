import { exceptionHandler } from '../../utils/ajuda.js';

import { loginModel } from '../../models/authModel.js';

export default async function loginController(req, res) {

    const { email, senha } = req.body;

    try {
        
        if (!email || !senha) {
            return res.status(400).json({error: "Email e senha são obrigatórios!"})
        }

        const { usuario, accessToken } = await loginModel(email, senha, res);

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            accessToken
        });

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}

