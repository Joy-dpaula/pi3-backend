// backend/src/controllers/auth/logoutController.js

const logoutController = (req, res) => {
    // Limpa o cookie de sessão
    res.clearCookie('sessionId', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    // Retorna uma resposta indicando que o logout foi realizado com sucesso
    return res.status(200).json({ message: 'Logout realizado com sucesso.' });
};

export default logoutController;
