import bcrypt from 'bcryptjs';
import { update } from "../../models/accountModel.js";
import multer from 'multer';
import { Router } from 'express';
import cloudinary from 'cloudinary';

const router = Router();

cloudinary.v2.config({
    cloud_name: 'de0ujb8vh', 
    api_key: '259617411365387',
    api_secret: 'rD3ZHcyDygGR8fTDaridZ-3Nab4'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadImage = upload.single('foto_perfil');

const updateController = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = req.body;
        usuario.id = Number(id);

        if (isNaN(usuario.id)) {
            return res.status(400).json({ error: "ID inválido!" });
        }

        if (typeof usuario.isAdmin === 'string') {
            usuario.isAdmin = usuario.isAdmin.toLowerCase() === 'true';
        }

        if (req.file) {
            const uploadResponse = await new Promise((resolve, reject) => {
                const uploadOptions = {
                    resource_type: 'auto',
                    public_id: `usuarios/${Date.now()}_${req.file.originalname}`, 
                };

                cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        return reject(new Error('Erro ao fazer upload da imagem.'));
                    }
                    resolve(result);
                }).end(req.file.buffer);
            });

            usuario.foto_perfil = uploadResponse.secure_url; 
        }

        if (usuario.nascimento) {
            usuario.nascimento = new Date(usuario.nascimento);
        }

        const result = await update(usuario);

        if (!result) {
            console.error("Update failed for user ID:", usuario.id);
            return res.status(404).json({ error: "Erro ao atualizar a conta!" });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            usuario: result
        });
    } catch (error) {
        console.error("Error during user update:", error);
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: `Conta com o id ${id} não encontrada!` });
        }
        return res.status(500).json({
            message: "Failed to update user",
            error: error.message || "Internal Server Error"
        });
    }
};

router.put('/:id', uploadImage, updateController);

export default router;