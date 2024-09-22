import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export default async function updatePayment(req, res) {
    const { id } = req.params; 
    const { numero, validade, cvv, nomeTitular, bandeira, usuarioId } = req.body;
  
    try {

      if (!numero || !validade || !cvv || !nomeTitular || !bandeira ) {
        return res.status(400).json({ message: 'Dados inválidos' });
      }
  
      const hashedCvv = await bcrypt.hash(cvv, 10);
  
      const cartaoCreditoAtualizado = await prisma.cartaocredito.update({
        where: { id: Number(id) },
        data: {
          numero,
          validade,
          cvv: hashedCvv,
          nomeTitular,
          bandeira,
          atualizadoEm: new Date(),
        },
      });
  
      res.status(200).json({ message: 'Cartão de crédito atualizado com sucesso', cartaoCreditoAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar cartão de crédito:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
}