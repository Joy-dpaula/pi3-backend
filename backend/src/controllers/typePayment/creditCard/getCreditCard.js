import { getCartao } from "../../../models/creditCardModel.js";

export default async function getCreditCard(req, res) {
  const { bandeira } = req.query;

  try {
    
    const cartoesDeCredito = await getCartao();

    res.json({message:'Cartões listados com sucesso!', cartoesDeCredito});

  } catch (error) {

    res.status(500).json({ message: 'Erro ao buscar cartões de crédito:' });
  }
}

