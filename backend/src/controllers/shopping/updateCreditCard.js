exports.updateCreditCard = (req, res) => {
    const { cardId } = req.params;
    const { cardNumber, expiryDate, cvv, holderName } = req.body;

    return res.status(200).json({ message: 'Credit card updated', cardId });
};
