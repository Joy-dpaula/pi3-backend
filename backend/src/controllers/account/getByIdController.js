import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getAccountById =  async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
      });
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export default getAccountById