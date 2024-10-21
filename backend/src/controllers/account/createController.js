import exceptionHandler from '../../utils/ajuda.js';
import { generateAccessToken } from '../../utils/auth.js';
import { createNewUser } from '../../models/accountModel.js';
import { DateTime } from 'luxon';
import cloudinary from 'cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.v2.config({
    cloud_name: 'de0ujb8vh',
    api_key: '259617411365387',
    api_secret: 'rD3ZHcyDygGR8fTDaridZ-3Nab4'
});

// URL da imagem padrão que será enviada para o Cloudinary
const DEFAULT_PROFILE_PIC_URL = 'https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg';

// Função para fazer upload da imagem padrão para o Cloudinary
const uploadDefaultProfilePic = async () => {
    const uploadOptions = {
        resource_type: 'auto',
        public_id: 'usuarios/default_profile_pic',
    };

    try {
        const result = await cloudinary.v2.uploader.upload(DEFAULT_PROFILE_PIC_URL, uploadOptions);
        return result.secure_url;
    } catch (error) {
        console.error('Erro ao fazer upload da imagem padrão:', error);
        throw new Error('Erro ao fazer upload da imagem padrão.');
    }
};

let DEFAULT_PROFILE_PIC_URL_CLOUDINARY;

// Fazendo o upload da imagem padrão uma vez ao iniciar a aplicação
(async () => {
    try {
        DEFAULT_PROFILE_PIC_URL_CLOUDINARY = await uploadDefaultProfilePic();
    } catch (error) {
        console.error('Erro ao definir imagem padrão:', error);
    }
})();

export const createAccount = [
    upload.single('foto_perfil'),
    async (req, res) => {
        const { nome, email, senha, cpf, telefone, nascimento, cidade, estado, isAdmin } = req.body;

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
            let foto_perfil;

            if (req.file) {
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

                foto_perfil = uploadResponse.secure_url;
            } else {
                foto_perfil = DEFAULT_PROFILE_PIC_URL_CLOUDINARY; // Usa a imagem padrão do Cloudinary
            }

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

            usuario.data_registro = DateTime.fromJSDate(usuario.data_registro)
                .setZone('America/Sao_Paulo')
                .toISO();

            const jwt = generateAccessToken(usuario);
            usuario.accessToken = jwt;

            res.status(201).json(usuario);
        } catch (exception) {
            exceptionHandler(exception, res);
        }
    }
];
