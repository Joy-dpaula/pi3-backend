import { getCartaoById } from "../../../models/creditCardModel.js";

export default async function getCartaoCreditoById(req, res) {
  const { id } = req.params;

  try {
   
   const cartaoCredito = await getCartaoById(id);

    res.status(200).json(cartaoCredito);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cartão de crédito' });
  }
}

