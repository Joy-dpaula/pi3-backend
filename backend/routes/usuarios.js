const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Criar um novo usuário
router.post('/', async (req, res) => {
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
  });
// Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um usuário por ID
router.get('/:id', async (req, res) => {
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
});

// Atualizar um usuário
router.put('/:id', async (req, res) => {
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
});

// Deletar um usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
