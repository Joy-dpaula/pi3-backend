import bcrypt from 'bcryptjs';
import { exceptionHandler } from '../../utils/ajuda.js';
import { update } from '../../models/accountModel.js';
import { getUsuarioById } from '../../models/accountModel.js'; // Assumindo que 'del' é equivalente a 'getUsuarioById'

export default async function updateAccount(req, res) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID não fornecido ou inválido' });
        }

        const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;
        const token = req.accessToken;

        // Verificar se o usuário existe
        const checkUsuario = await getUsuarioById(id); // Atualize conforme o nome correto da função

        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }

        // Atualizar usuário
        const usuario = await update(id, {
            nome,
            email,
            senha: senha ? await bcrypt.hash(senha, 12) : undefined,
            cpf: cpf ? cpf.toString() : undefined,
            telefone: telefone ? telefone.toString() : undefined,
            nascimento: nascimento ? new Date(nascimento) : undefined,
            isAdmin: isAdmin !== undefined ? isAdmin : undefined,
        });

        return res.json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
