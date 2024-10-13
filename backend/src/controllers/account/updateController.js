
import multer from 'multer';
import path from 'path';
import { updateUsuario } from "../../models/accountModel.js";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("perfil"));
    },
    filename: (req, file, callback) => {
        const time = Date.now();
        callback(null, `${time}_${file.originalname}`);
    }
});

export const upload  = multer({ storage: storage });



export const uploadImage = upload.single('foto_perfil');

export const updateController = async (req, res, next) => {
    const { id } = req.params;
    const userToken = req.user; 

    console.log("Informações do usuário autenticado:", userToken);

   
    if (!userToken || !userToken.id) {
        console.log("Usuário não autenticado ou token inválido.");
        return res.status(403).json({ error: "Usuário não autenticado ou token inválido." });
    }


    const isAdmin = userToken.isAdmin;
    const userId = userToken.id;

    console.log('isAdmin:', isAdmin); 
    console.log('ID do usuário:', userId);  

    if (!isAdmin && String(id) !== String(userId)) {
        console.log("Você não tem permissão para atualizar este usuário.");
        return res.status(403).json({ error: "Você não tem permissão para atualizar este usuário." });
    }
   
    try {
        const usuario = req.body;
        usuario.id = String(id);


       
        if (req.file) {
            usuario.foto_perfil = req.file.filename;
        }

        if (usuario.nascimento) {
            usuario.nascimento = new Date(usuario.nascimento);
        }


        const result = await updateUsuario(usuario.id, usuario);

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


