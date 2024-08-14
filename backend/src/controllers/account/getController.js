import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const getAccount =  async (req, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export default getAccount