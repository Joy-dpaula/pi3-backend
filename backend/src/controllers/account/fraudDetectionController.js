// src/controllers/account/fraudDetectionController.js
// função para detectar comportamentos suspeitos ou fraudulentos
export const detectFraud = (req, res) => {
    const { userId } = req.user;

    // simulando uma busca no banco de dados pelo histórico do usuário
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // implementação simples de regras de detecção de fraude
    let isFraudulent = false;

    // Exemplo: Muitas tentativas de login falhadas
    if (user.failedLoginAttempts > 5) {
        isFraudulent = true;
    }

    // Exemplo: Compras muito altas ou muito frequentes
    if (user.purchaseHistory.some(purchase => purchase.amount > 100000)) {
        isFraudulent = true;
    }

    if (isFraudulent) {
        return res.status(403).json({ message: "Comportamento suspeito detectado." });
    } else {
        return res.json({ message: "Nenhuma fraude detectada." });
    }
};