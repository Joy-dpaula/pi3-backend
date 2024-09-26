
import exceptionHandler from '../../utils/ajuda.js';

import { getShoppingModel } from '../../models/shoppingModel.js';

export default async function getShopping(req, res) {
    try {


        const compras = await getShoppingModel();
        
        const comprasFormatted = compras.map(compra => ({
            "Compra ID": compra.id,
            "Status" : compra.status,
            "Usuário": {
                "Usuário ID": compra.usuario.id,
                "Nome": compra.usuario.nome, 
            },
            "Veículo": {
                "Veículo ID": compra.veiculo.id,
                "Modelo": compra.veiculo.modelo, 
            },
            "Valor Total": compra.valorTotal,  
            "Data da Compra": new Date(compra.dataCompra).toLocaleDateString()
        }));

        res.status(200).json({
            "Total de Compras": compras.length,
            "Compras": comprasFormatted
        });

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}