import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const updateAccount =  async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone, email, nascimento, senha } = req.body;
    try {
      const usuario = await prisma.usuario.update({
        where: { id: Number(id) },
        data: { nome, cpf, telefone, email, nascimento, senha },
      });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export default updateAccount