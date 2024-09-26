
import exceptionHandler from '../../utils/ajuda.js';

import { deleteShoppingModel } from '../../models/shoppingModel.js';

export default async function deleteShopping(req, res) {
    try {

        const { id } = req.params;

        const compra = await deleteShoppingModel(id);

        return res.status(200).json('Compra excluída com sucesso!');
  
        if (!compra) {
            return res.status(404).json({ error: "Compra não encontrada." });
        }


        await prisma.compra.delete({ where: { id: parseInt(id) } });

   
        res.status(200).json({ message: 'Compra deletada com sucesso'});

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
