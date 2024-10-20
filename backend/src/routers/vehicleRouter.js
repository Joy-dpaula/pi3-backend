import express from 'express';
import deleteVeiculo from '../controllers/vehicle/deleteVeiculo.js';
import getById from '../controllers/vehicle/getByIdVeiculo.js'; 
import getVeiculos from '../controllers/vehicle/getVeiculo.js'; 
import { PrismaClient } from '@prisma/client';
import { simulateFinancing } from '../controllers/vehicle/financeSimulator.js';
import handleCreateVeiculo from '../controllers/vehicle/createVeiculo.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads")); 
    },
    filename: (req, file, callback) => {
        const time = Date.now();
        callback(null, `${time}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Rotas
router.get('/todos', async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany(); 
        res.json(veiculos); 
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});

router.get('/', getVeiculos);
router.post('/', handleCreateVeiculo); // Adicionando upload de foto no create
router.get('/:id', getById);
router.delete('/:id', deleteVeiculo);
router.post('/financiamento', simulateFinancing);

export default router;
