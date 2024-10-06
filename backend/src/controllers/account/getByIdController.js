import { getAccountById } from '../../models/accountModel.js'; // Ensure the correct function is imported
import exceptionHandler from '../../utils/ajuda.js';

export const getAccountByIdController = async (req, res) => {
    const { id } = req.params; // Fetch the account ID from the request parameters

    try {
        const account = await getAccountById(id); // Call the function to retrieve the account

        if (!account) {
            return res.status(404).json({ error: "Conta não encontrada!" }); // Return an error if the account is not found
        }

        res.json(account); // Return the found account
    } catch (exception) {
        console.error('Erro ao recuperar conta:', exception); // Log the error for debugging
        exceptionHandler(exception, res); // Handle exceptions using the custom handler
    }
};
