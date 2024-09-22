// src/controllers/account/fraudDetectionController.js

export const detectFraud = (req, res) => {
    const { userId } = req.user;

    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    let isFraudulent = false;

    if (user.failedLoginAttempts > 5) {
        isFraudulent = true;
    }

    if (user.purchaseHistory.some(purchase => purchase.amount > 100000)) {
        isFraudulent = true;
    }

    if (isFraudulent) {
        return res.status(403).json({ message: "Comportamento suspeito detectado." });
    } else {
        return res.json({ message: "Nenhuma fraude detectada." });
    }
};
