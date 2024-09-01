// src/controllers/account/recommendationController.js

// função para recomendar carros com base nas preferências do usuário
export const recommendCars = (req, res) => {
    const { userId } = req.user;

    // simulando uma busca no banco de dados pelo histórico de buscas do usuário
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // supondo que temos um array de carros no banco de dados
    const cars = [
        { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
        { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 22000 },
        // ... outros carros
    ];

    // recomenda carros baseados em preferências simples, como marca e modelo
    const recommendedCars = cars.filter(car => {
        return (
            (user.preferredBrand && car.brand === user.preferredBrand) ||
            (user.preferredModel && car.model === user.preferredModel)
        );
    });

    res.json({ recommendedCars });
};
