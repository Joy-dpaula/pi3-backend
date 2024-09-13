export const deleteCreditCard = (req, res) => {
    const { cardId } = req.params;

    return res.status(200).json({ message: 'Credit card deleted', cardId });
};
