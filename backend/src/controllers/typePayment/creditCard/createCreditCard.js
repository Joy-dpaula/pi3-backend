import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCartaoCredito(req, res) {
  const { numero, validade, cvv, nomeTitular, bandeira, usuarioId } = req.body;

  try {
    // Validação do número do cartão (13 a 16 dígitos)
    if (!/^\d{13,16}$/.test(numero)) {
      return res.status(400).json({ message: 'Número do cartão inválido. Deve ter entre 13 e 16 dígitos.' });
    }

    // Outras validações (pode ser aprimorada)
    if (!validade || !cvv || !nomeTitular || !bandeira || !usuarioId) {
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