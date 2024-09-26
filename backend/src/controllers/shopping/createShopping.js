
import exceptionHandler from '../../utils/ajuda.js';

import { generateAccessToken } from '../../utils/auth.js';
import { newShopping } from '../../models/shoppingModel.js';

export default async function createShopping(req, res) {

    const { usuarioId, veiculoId } = req.body;

    console.log(usuarioId)
    console.log(veiculoId)

    try {
     
        if (!usuarioId) {
            return res.status(400).json({ error: 'ID do usuário é necessário.' });
        }

        if (!veiculoId) {
            return res.status(400).json({ error: 'ID do veículo é necessário.' });
        }
     
        const { compra } = await newShopping({usuarioId, veiculoId});

        const jwt = generateAccessToken(compra);
        compra.accessToken = jwt;

        res.status(201).json(compra);
        
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
