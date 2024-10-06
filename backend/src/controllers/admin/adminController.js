import Account from '../../models/accountModel.js'; 
import exceptionHandler from '../../utils/ajuda.js'; 

export const createAdminUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const userExists = await Account.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const hashedSenha = await bcrypt.hash(senha, 12);

        const newUser = await Account.create({
            data: {
                nome,
                email,
                senha: hashedSenha, 
                isAdmin: true,
            },
        });

        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        exceptionHandler(error, res);
    }
};

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

export const getUsers = async (req, res) => {
    try {
        const users = await Account.findMany();
        res.status(200).json(users);
    } catch (error) {
        exceptionHandler(error, res);
    }
};
