const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: "minimal" });
const bcrypt = require('bcryptjs');
const { exceptionHandler } = require('../utils/ajuda');
const { generateAccessToken, authenticateToken } = require('../utils/auth');

/* GET /usuarios - Lista todos os usuarios */
router.get('/', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        const usuariosFormatted = usuarios.map(usuario => ({
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
        }));
        res.json(usuariosFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* POST /usuarios - Cria um usuario */
router.post('/', async (req, res) => {
    const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;

    // Validação básica dos dados
    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({
            error: "Nome, email, senha, CPF e telefone são obrigatórios."
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            error: "A senha é obrigatória e deve ter no mínimo 8 caracteres."
        });
    }

    if (isNaN(cpf) || isNaN(telefone)) {
        return res.status(400).json({
            error: "CPF e telefone devem conter apenas números."
        });
    }

    const hashedSenha = await bcrypt.hash(senha, 12); // Aumentando as rodadas de sal para segurança

    try {
        // Check if email already exists
        const existingUsuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (existingUsuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashedSenha,
                cpf: cpf.toString(),  // Convert to String
                telefone: telefone.toString(),  // Convert to String
                nascimento: nascimento ? new Date(nascimento) : null,
                isAdmin: isAdmin || false, // Define o valor padrão para novos usuários
            },
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true // Inclua o campo isAdmin no retorno
            }
        });

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;
        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* GET /usuarios/:id - Obtém um usuario por id */
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await prisma.usuario.findUniqueOrThrow({
            where: { id }
        });

        const usuarioFormatted = {
            ...usuario,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
        };

        res.json(usuarioFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* PATCH /usuarios/:id - Atualiza um usuario pelo id */
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, senha, cpf, telefone, nascimento, isAdmin } = req.body;
        const token = req.accessToken;

        const checkUsuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!checkUsuario || checkUsuario.email !== token.email && !token.isAdmin) {
            return res.sendStatus(403);
        }

        const data = {
            nome,
            email,
            senha: senha ? await bcrypt.hash(senha, 12) : undefined,
            cpf: cpf ? cpf.toString() : undefined,
            telefone: telefone ? telefone.toString() : undefined,
            nascimento: nascimento ? new Date(nascimento) : undefined,
            isAdmin: isAdmin !== undefined ? isAdmin : undefined, // Atualize o campo isAdmin
        };

        const usuario = await prisma.usuario.update({
            where: { id },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true,
            }
        });

        res.json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* DELETE /usuarios/:id - Exclui um usuario por ID */
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const token = req.accessToken;

        const checkUsuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!checkUsuario || (checkUsuario.email !== token.email && !token.isAdmin)) {
            return res.sendStatus(403);
        }

        await prisma.usuario.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* POST /usuarios/login - Login de um usuario */
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const validsenha = await bcrypt.compare(senha, usuario.senha);

        if (!validsenha) {
            return res.status(401).json({ error: "Senha inválida." });
        }

        const accessToken = generateAccessToken({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf.toString(),
            telefone: usuario.telefone ? usuario.telefone.toString() : null,
            isAdmin: usuario.isAdmin
        });

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            accessToken
        });
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

/* Resposta para rotas não existentes. */
router.all('*', (req, res) => {
    res.status(501).end();
});

module.exports = router;
