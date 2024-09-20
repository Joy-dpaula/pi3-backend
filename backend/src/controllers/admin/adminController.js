import { createAdmin, getAdmins, getAdminById, deleteAdminById, updateAdmin } from '../services/AdminService.js';

export async function createNewAdmin(req, res) {
    const { nome, email, senha, isAdmin } = req.body;

    // Verifica se o administrador já existe
    const existingAdmin = await getAdminByEmail(email);

    if (existingAdmin) {
        return res.status(400).json({ error: 'Administrador já existe.' });
    }

    const admin = await createAdmin({ nome, email, senha, isAdmin });

    if (!admin) {
        return res.status(500).json({ error: 'Erro ao criar administrador.' });
    }

    res.status(201).json(admin);
}

export async function getAllAdmins(req, res) {
    const admins = await getAdmins();
    res.status(200).json(admins);
}

export async function getAdmin(req, res) {
    const admin = await getAdminById(req.params.id);

    if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado.' });
    }

    res.status(200).json(admin);
}

export async function updateAdminById(req, res) {
    const admin = await updateAdmin(req.params.id, req.body);

    if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado.' });
    }

    res.status(200).json(admin);
}

export async function deleteAdmin(req, res) {
    await deleteAdminById(req.params.id);
    res.sendStatus(204);
}
