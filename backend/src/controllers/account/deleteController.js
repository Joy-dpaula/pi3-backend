import { getUsuarioById, deleteAccountById } from '../../models/accountModel.js'; // Ensure consistent function names
import exceptionHandler from '../../utils/ajuda.js';

export const deleteAccount = async (req, res) => {
    const { id } = req.params; // Fetch the user ID from the request parameters
    const token = req.accessToken; // Fetch the access token

    if (!token || !token.email) {
        return res.sendStatus(401); // Unauthorized if no token or email in the token
    }

    try {
        const usuario = await getUsuarioById(id); // Check if the user exists

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado!" }); // User not found
        }

        await deleteAccountById(id); // Delete the user account

        return res.status(200).json({ message: "Usuário deletado com sucesso!" }); // Success response
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        exceptionHandler(error, res); // Handle exceptions using your custom handler
    }
};
