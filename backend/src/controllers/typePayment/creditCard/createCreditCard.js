
export const createCreditCard = (req, res) => {
    const { cardNumber, expiryDate, cvv, holderName, id, usuarioId  } = req.body;

    const card = {
        id,
        cardNumber,
        expiryDate,
        cvv,
        holderName,
        usuarioId,
        
       
    };

    return res.status(201).json({ message: 'Credit card created', card });
};
