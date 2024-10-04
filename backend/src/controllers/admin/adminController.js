import User from '../../models/'; // Verifique o caminho correto

// Criar um novo usuário admin
export const createAdminUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }
        
        const newUser = new User({ name, email, password, isAdmin: true }); // Defina como admin
        await newUser.save();
        
        res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

// Deletar um usuário
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
};

// Obter todos os usuários
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retorne todos os usuários
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};
