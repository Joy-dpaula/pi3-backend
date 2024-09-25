// src/controllers/account/profileController.js
<<<<<<< HEAD:backend/src/controllers/account/profileController.js
// função para atualizar o perfil do usuario
=======

>>>>>>> master:backend/src/controllers/fraud/profileController.js
export const updateUserProfile = (req, res) => {
    const { userId } = req.user;  
    const { name, email, phone, address } = req.body;

   
    let user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    res.json({ message: "Perfil atualizado com sucesso", user });
};

export const getUserProfile = (req, res) => {
    const { userId } = req.user;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ user });
};