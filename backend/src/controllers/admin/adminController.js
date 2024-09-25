import { createAdmin, getAdmins, getAdminById, deleteAdminById, updateAdmin, getAdminByEmail } from '../services/AdminService.js';

export async function createNewAdmin(req, res) {
    const { nome, email, senha, isAdmin } = req.body;

    try {
        // Verifica se o administrador já existe
        const existingAdmin = await getAdminByEmail(email);

        if (existingAdmin) {
            return res.status(400).json({ error: 'Administrador já existe.' });
        }

        const admin = await createAdmin({ nome, email, senha, isAdmin });

        if (!admin) {
            return res.status(500).json({ error: 'Erro ao criar administrador.' });
        }

        res.status(201).json(admin); // Retorna o administrador criado
    } catch (error) {
        console.error('Erro ao criar novo administrador:', error);
        res.status(500).json({ error: 'Erro ao criar novo administrador.' });
    }
}

export async function getAllAdmins(req, res) {
    try {
        const admins = await getAdmins();
        res.status(200).json(admins); // Retorna a lista de administradores
    } catch (error) {
        console.error('Erro ao buscar todos os administradores:', error);
        res.status(500).json({ error: 'Erro ao buscar administradores.' });
    }
}

export async function getAdmin(req, res) {
    try {
        const admin = await getAdminById(req.params.id);

        if (!admin) {
            return res.status(404).json({ error: 'Administrador não encontrado.' });
        }

        res.status(200).json(admin); // Retorna o administrador encontrado
    } catch (error) {
        console.error('Erro ao buscar administrador:', error);
        res.status(500).json({ error: 'Erro ao buscar administrador.' });
    }
}

export async function updateAdminById(req, res) {
    try {
        const admin = await updateAdmin(req.params.id, req.body);

        if (!admin) {
            return res.status(404).json({ error: 'Administrador não encontrado.' });
        }

        res.status(200).json(admin); // Retorna o administrador atualizado
    } catch (error) {
        console.error('Erro ao atualizar administrador:', error);
        res.status(500).json({ error: 'Erro ao atualizar administrador.' });
    }
}

export async function deleteAdmin(req, res) {
    try {
        await deleteAdminById(req.params.id);
        res.sendStatus(204); // Retorna status 204 (Sem Conteúdo)
    } catch (error) {
        console.error('Erro ao deletar administrador:', error);
        res.status(500).json({ error: 'Erro ao deletar administrador.' });
    }
}