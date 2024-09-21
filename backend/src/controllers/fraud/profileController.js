// src/controllers/account/profileController.js

// função para atualizar o perfil do usuario
export const updateUserProfile = (req, res) => {
    const { userId } = req.user;  // supondo que o middleware de autenticação já tenha adicionado o ID do usuário ao req.user
    const { name, email, phone, address } = req.body;  // exemplos de campos que podem ser atualizados

    // Aqui você faria a lógica para buscar o usuário pelo ID e atualizar suas informações
    // Exemplo simplificado:

    // Simulando um banco de dados
    let user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualizando os campos fornecidos
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    res.json({ message: "Perfil atualizado com sucesso", user });
};

// Função para obter o perfil do usuário
export const getUserProfile = (req, res) => {
    const { userId } = req.user;

    // Simulando a busca no banco de dados
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ user });
};
