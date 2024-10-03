import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { createNewUser } from '../../models/accountModel.js';
import { DateTime } from 'luxon'; 
import multer from 'multer';
import path from 'path';
import express from 'express';
import fs from 'fs/promises'; 
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("perfil")); 
    },
    filename: (req, file, callback) => {
        const time = Date.now();
        callback(null, `${time}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export async function createAccount(req, res) {
    const { nome, email, senha, cpf, telefone, nascimento, cidade, estado, isAdmin } = req.body;
    let foto_perfil;

    if (req.file) {
        foto_perfil = req.file.filename;
    } else {
        const defaultImagePath = path.resolve(__dirname, '..', '..', 'prefix', 'padraouser.jpg');

        try {
            await fs.access(defaultImagePath);
        } catch (err) {
            console.error("Arquivo padrão não encontrado:", defaultImagePath);
            return res.status(500).json({ error: "Arquivo padrão não encontrado." });
        }

        const time = Date.now();
        foto_perfil = `${time}_padraouser.jpg`;

        try {
            await fs.copyFile(defaultImagePath, path.resolve('perfil', foto_perfil));
        } catch (err) {
            console.error("Erro ao copiar a foto padrão:", err);
            return res.status(500).json({ error: "Erro ao copiar a foto padrão." });
        }
    }

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ error: "Nome, email, senha, CPF e telefone são obrigatórios." });
    }

    if (senha.length < 8) {
        return res.status(400).json({ error: "A senha deve ter no mínimo 8 caracteres." });
    }

    if (isNaN(cpf) || isNaN(telefone)) {
        return res.status(400).json({ error: "CPF e telefone devem conter apenas números." });
    }

    try {
        const usuario = await createNewUser({
            nome,
            email,
            senha,
            cpf,
            telefone,
            nascimento,
            cidade,
            estado,
            foto_perfil,
            isAdmin
        });

        if (!usuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }

        usuario.data_registro = DateTime.fromJSDate(usuario.data_registro).setZone('America/Sao_Paulo').toString();

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;

        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}

router.post('/', upload.single('foto_perfil'), createAccount);

export default router;
