import { createCartao } from "../../../models/creditCardModel.js";

async function createCartaoCredito(req, res) {
  const { numero, validade, cvv, nomeTitular, bandeira, usuarioId } = req.body;

  try {

    if (!/^\d{13,16}$/.test(numero)) {
      return res.status(400).json({ message: 'Número do cartão inválido. Deve ter entre 13 e 16 dígitos.' });
    }

    if (!validade || !cvv || !nomeTitular || !bandeira || !usuarioId) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    const cartaoCredito = await createCartao(numero, validade, cvv, nomeTitular, bandeira, usuarioId);

    res.status(201).json({ message: 'Cartão de crédito criado com sucesso'});

  } catch (error) {
    console.error('Erro ao criar cartão de crédito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export default createCartaoCredito;