
import exceptionHandler from '../../utils/ajuda.js';

import { getShoppingById } from '../../models/shoppingModel.js';

export default async function getByIdShopping(req, res) {
    try {

        const id = Number(req.params.id);

        console.log(id)

        const compra = await getShoppingById(id);

        const compraFormatted = {
            compraId: compra.id,
            detalhesUsuario: {
                usuarioId: compra.usuario.id,
            },
            detalhesVeiculo: {
                veiculoId: compra.veiculo.id,
            },
            mensagem: "Compra encontrada com sucesso.",
            status: "success",
        };

        if(!compra) throw new Error('Compra não encontrada')

        res.status(200).json(compraFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
