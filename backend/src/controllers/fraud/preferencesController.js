// src/controllers/account/preferencesController.js
<<<<<<< HEAD:backend/src/controllers/account/preferencesController.js
// Função para atualizar as preferências do usuário
=======

>>>>>>> master:backend/src/controllers/fraud/preferencesController.js
export const updateUserPreferences = (req, res) => {
    const { userId } = req.user;
    const { emailNotifications, smsNotifications, preferredLanguage } = req.body;  

    let user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (smsNotifications !== undefined) user.smsNotifications = smsNotifications;
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;

    res.json({ message: "Preferências atualizadas com sucesso", preferences: user });
};


export const getUserPreferences = (req, res) => {
    const { userId } = req.user;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ preferences: user });
};