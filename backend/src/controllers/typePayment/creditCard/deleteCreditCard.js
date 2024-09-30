import { deleteCartaoModel } from '../../../models/creditCardModel.js';
import exceptionHandler from '../../../utils/ajuda.js';


export default async function creditCardDelete(req, res) {
    try {
    
        const { id } = req.params;

       const cartaoDeletado = await deleteCartaoModel(id);
     
        res.status(200).json({ message: 'Cartão de crédito deletado com sucesso' });


    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
