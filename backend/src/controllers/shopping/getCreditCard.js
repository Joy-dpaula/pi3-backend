exports.getCreditCard = (req, res) => {
    const { cardId } = req.params;

    const card = { cardId, cardNumber: '4111111111111111', brand: 'Visa' };

    return res.status(200).json({ card });
};
