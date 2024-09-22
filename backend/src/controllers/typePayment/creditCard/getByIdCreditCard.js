import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getCartaoCreditoById(req, res) {
  const { id } = req.params;

  try {
    const cartaoCredito = await prisma.cartaocredito.findUnique({
      where: {
        id: parseInt(id), 
      },
    });

    if (!cartaoCredito) {
      return res.status(404).json({ message: 'Cartão de crédito não encontrado' });
    }

    res.status(200).json(cartaoCredito);
  } catch (error) {
    console.error('Erro ao buscar cartão de crédito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

