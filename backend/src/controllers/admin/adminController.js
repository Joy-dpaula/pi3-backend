// controllers/admin/adminController.js

import Account from '../../models/accountModel.js'; // Ajuste o caminho conforme necessário
import exceptionHandler from '../../utils/ajuda.js';

// Cria um novo usuário admin
export const createAdminUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se o usuário já existe
        const userExists = await Account.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Cria um novo usuário
        const newUser = await Account.create({
            data: {
                nome,
                email,
                senha,
                isAdmin: true,
            },
        });

        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

// Deletar um usuário
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Account.delete({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

// Obter todos os usuários
export const getUsers = async (req, res) => {
    try {
        const users = await Account.findMany();
        res.status(200).json(users);
    } catch (error) {
        exceptionHandler(error, res);
    }
};
