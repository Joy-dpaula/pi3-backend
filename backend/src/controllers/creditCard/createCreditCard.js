const creditCardValidator = 'card-validator';

export const createCreditCard = (req, res) => {
    const { cardNumber, expiryDate, cvv, holderName } = req.body;

    const numberValidation = creditCardValidator.number(cardNumber);
    if (!numberValidation.isValid) {
        return res.status(400).json({ message: 'Invalid card number' });
    }

    const card = {
        cardNumber,
        expiryDate,
        cvv,
        holderName,
        brand: numberValidation.card.niceType,
    };

    return res.status(201).json({ message: 'Credit card created', card });
};
