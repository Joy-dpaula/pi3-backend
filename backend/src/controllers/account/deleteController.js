// controllers/accountController.js
import { getUsuarioById, deleteUsuarioById } from '../../models/accountModel.js';
import exceptionHandler from '../../utils/ajuda.js';

export const deleteAccount = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const token = req.accessToken;

        if (!token || !token.email) {
            return res.sendStatus(401); 
        }

        const checkUsuario = await getUsuarioById(id);

        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }

        await deleteUsuarioById(id);

        res.status(204).end();
        
        
    } catch (exception) {
        exceptionHandler(exception, res);
    }
};