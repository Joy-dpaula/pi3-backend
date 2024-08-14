import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createAccount =  async (req, res) => {
    const { nome, cpf, telefone, email, nascimento, senha } = req.body;
    try {
      console.log('Criando usuário com os dados:', { nome, cpf, telefone, email, nascimento, senha });
      const usuario = await prisma.usuario.create({
        data: { nome, cpf, telefone, email, nascimento, senha },
      });
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }

export default createAccount