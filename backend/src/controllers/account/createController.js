import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { createNewUser } from '../../models/accountModel.js';
import { DateTime } from 'luxon'; 
import multer from 'multer';
import express from 'express'; 
import cloudinary from 'cloudinary';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.v2.config({
    cloud_name: 'de0ujb8vh',
    api_key: '259617411365387',
    api_secret: 'rD3ZHcyDygGR8fTDaridZ-3Nab4'
});

router.post('/', upload.single('foto_perfil'), async (req, res) => {
    const { nome, email, senha, cpf, telefone, nascimento, cidade, estado, isAdmin } = req.body;

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ error: "Nome, email, senha, CPF e telefone são obrigatórios." });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'A foto do usuário é obrigatória.' });
    }
    if (senha.length < 8) {
        return res.status(400).json({ error: "A senha deve ter no mínimo 8 caracteres." });
    }
    if (isNaN(cpf) || isNaN(telefone)) {
        return res.status(400).json({ error: "CPF e telefone devem conter apenas números." });
    }

    try {
        const uploadOptions = {
            resource_type: 'auto',
            public_id: `usuarios/${Date.now()}_${req.file.originalname}`, 
        };

        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    return reject(new Error('Erro ao fazer upload da imagem.'));
                }
                resolve(result);
            }).end(req.file.buffer);
        });

        const usuario = await createNewUser({
            nome,
            email,
            senha,
            cpf,
            telefone,
            nascimento,
            cidade,
            estado,
            foto_perfil: uploadResponse.secure_url,
            isAdmin
        });

        if (!usuario) {
            return res.status(409).json({ error: "Email já está em uso." });
        }

        usuario.data_registro = DateTime.fromJSDate(usuario.data_registro)
            .setZone('America/Sao_Paulo')
            .toISO();

        const jwt = generateAccessToken(usuario);
        usuario.accessToken = jwt;

        res.status(201).json(usuario);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
});

export default router;