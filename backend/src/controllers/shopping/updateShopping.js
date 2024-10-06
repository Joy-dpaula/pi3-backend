import { updateShopping } from '../../models/shoppingModel.js'; 

export default async function updateShoppingController(req, res) {
    const { id } = req.params; 
    const { veiculoId, method } = req.body; 


    console.log("ID da compra:", id);
    console.log("Dados recebidos para atualização:", { veiculoId, method });

    try {
        const updatedShopping = await updateShopping(id, { veiculoId, method });
        return res.status(200).json(updatedShopping);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}
