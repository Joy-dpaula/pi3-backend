import exceptionHandler from '../../utils/ajuda.js';
import { getUsuarioById } from '../../models/accountModel.js';

export default async function getAccountById(req, res) {
    try {
        const id = Number(req.params.id);
        const account = await getUsuarioById(+id);

        res.json(account);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}