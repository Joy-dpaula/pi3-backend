import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createAccount = async (req, res) => {
  const { nome, cpf, telefone, email, nascimento, senha } = req.body;

  console.log('Dados recebidos:', { nome, cpf, telefone, email, nascimento, senha });

  // Validar e converter a data
  try {
    // Converte para um objeto Date para garantir que o formato está correto
    const nascimentoDate = new Date(nascimento);
    if (isNaN(nascimentoDate.getTime())) {
      return res.status(400).json({ error: 'Data de nascimento inválida' });
    }

    console.log('Data de nascimento convertida:', nascimentoDate.toISOString());

    const usuario = await prisma.usuario.create({
      data: { nome, cpf, telefone, email, nascimento: nascimentoDate, senha },
    });
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};



export default createAccount