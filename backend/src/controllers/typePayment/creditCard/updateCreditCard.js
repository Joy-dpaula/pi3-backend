import { updateCartaoModel } from '../../../models/creditCardModel.js';

export default async function updateCartao(req, res) {
  const { id } = req.params;
  const { numero, validade, cvv, nomeTitular, bandeira, usuarioId } = req.body;

  try {

    if (!numero || !validade || !cvv || !nomeTitular || !bandeira) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    const cartaoCreditoAtualizado = await updateCartaoModel(
      id, {
      numero,
      validade,
      cvv,
      nomeTitular,
      bandeira,
      usuarioId
    });

    res.status(200).json({ message: 'Cartão de crédito atualizado com sucesso', cartaoCreditoAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar cartão de crédito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}