import bcrypt from 'bcryptjs';
import { update } from "../../models/accountModel.js";
import multer from 'multer';
import path from 'path';
import { Router } from 'express';

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("perfil")); // Pasta onde as fotos serão salvas
    },
    filename: (req, file, callback) => {
        const time = Date.now();
        callback(null, `${time}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
const router = Router();

// Middleware para lidar com uploads de imagem
const uploadImage = upload.single('foto_perfil');

const updateController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const usuario = req.body;
        usuario.id = Number(id);

        if (isNaN(usuario.id)) {
            return res.status(400).json({ error: "ID inválido!" });
        }

        // Convert isAdmin to a boolean
        if (typeof usuario.isAdmin === 'string') {
            usuario.isAdmin = usuario.isAdmin.toLowerCase() === 'true';
        }

        // Se uma nova imagem foi enviada, atualize o caminho da imagem no objeto usuário
        if (req.file) {
            usuario.imagePath = req.file.path; // Adicione a nova propriedade com o caminho da imagem
        }

        const result = await update(usuario.id, usuario);

        if (!result) {
            console.error("Update failed for user ID:", usuario.id); // Log for debugging
            return res.status(404).json({ error: "Erro ao atualizar a conta!" });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            usuario: result
        });
    } catch (error) {
        console.error("Error during user update:", error); // Log the actual error
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: `Conta com o id ${id} não encontrada!` });
        }
        return res.status(500).json({
            message: "Failed to update user",
            error: error.message || "Internal Server Error"
        });
    }
};

// Adicione a rota para o endpoint de atualização de conta com imagem
router.put('/:id', uploadImage, updateController);

export default router;
