// src/controllers/account/preferencesController.js
// Função para atualizar as preferências do usuário
export const updateUserPreferences = (req, res) => {
    const { userId } = req.user;
    const { emailNotifications, smsNotifications, preferredLanguage } = req.body;  // Exemplos de preferências

    // Simulando a busca no banco de dados
    let user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualizando as preferências fornecidas
    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (smsNotifications !== undefined) user.smsNotifications = smsNotifications;
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;

    res.json({ message: "Preferências atualizadas com sucesso", preferences: user });
};

// Função para obter as preferências do usuário
export const getUserPreferences = (req, res) => {
    const { userId } = req.user;

    // Simulando a busca no banco de dados
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ preferences: user });
};