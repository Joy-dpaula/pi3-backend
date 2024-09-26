// src/controllers/account/recommendationController.js

export const recommendCars = (req, res) => {
    const { userId } = req.user;

    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const cars = [
        { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
        { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 22000 },
    ];

    const recommendedCars = cars.filter(car => {
        return (
            (user.preferredBrand && car.brand === user.preferredBrand) ||
            (user.preferredModel && car.model === user.preferredModel)
        );
    });

    res.json({ recommendedCars });
};