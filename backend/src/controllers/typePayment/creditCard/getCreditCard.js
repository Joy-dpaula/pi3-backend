import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function getCreditCard(req, res) {
  const { bandeira } = req.query;

  try {
    const cartoesDeCredito = await prisma.cartaocredito.findMany({
      where: {
        bandeira,
      },
    });
    res.json(cartoesDeCredito);
  } catch (error) {
    console.error('Erro ao buscar cartões de crédito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

