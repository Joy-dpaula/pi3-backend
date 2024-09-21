import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCartaoCredito(req, res) {
  const { numero, validade, cvv, nomeTitular, bandeira, usuarioId } = req.body;

  try {
    // Validação básica (pode ser aprimorada)
    if (!numero || !validade || !cvv || !nomeTitular || !bandeira || !usuarioId) {
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    // Cria o cartão de crédito
    const cartaoCredito = await prisma.cartaocredito.create({
      data: {
        numero,
        validade,
        cvv,
        nomeTitular,
        bandeira,
        usuarioId,
        atualizadoEm: new Date(),
      },
    });

    res.status(201).json({ message: 'Cartão de crédito criado com sucesso', cartaoCredito });
  } catch (error) {
    console.error('Erro ao criar cartão de crédito:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export default createCartaoCredito;