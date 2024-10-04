<<<<<<< HEAD
// controllers/account/updateController.js

import { updateAccount } from "../../models/accountModel.js"; // Altere para o nome correto

const updateController = async (req, res, next) => {
    const { id } = req.params; // O ID da conta a ser atualizada

    try {
        const usuario = req.body; // Os dados da conta a serem atualizados
        usuario.id = Number(id); // Adicionando o ID aos dados do usuário
=======
import bcrypt from 'bcryptjs';
import { update } from "../../models/accountModel.js";
import multer from 'multer';
import path from 'path';
import { Router } from 'express';

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
const router = Router();

const uploadImage = upload.single('foto_perfil');

const updateController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const usuario = req.body;
        usuario.id = Number(id);
>>>>>>> 1aed80fefe2d729facc4153246703880c24612eb

        if (isNaN(usuario.id)) {
            return res.status(400).json({ error: "ID inválido!" });
        }

<<<<<<< HEAD
        const result = await updateAccount(usuario.id, usuario); // Chamar a função de atualização
=======
        if (typeof usuario.isAdmin === 'string') {
            usuario.isAdmin = usuario.isAdmin.toLowerCase() === 'true';
        }

        if (req.file) {
            usuario.foto_perfil = req.file.filename; 
        }
        if (usuario.nascimento) {
            usuario.nascimento = new Date(usuario.nascimento);
        }

        const result = await update(usuario);
>>>>>>> 1aed80fefe2d729facc4153246703880c24612eb

        if (!result) {
            console.error("Update failed for user ID:", usuario.id);
            return res.status(404).json({ error: "Erro ao atualizar a conta!" });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            usuario: result
        });
    } catch (error) {
<<<<<<< HEAD
=======
        console.error("Error during user update:", error);
>>>>>>> 1aed80fefe2d729facc4153246703880c24612eb
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
