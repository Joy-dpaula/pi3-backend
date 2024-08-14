import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const deleteAccount =  async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.usuario.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export default deleteAccount