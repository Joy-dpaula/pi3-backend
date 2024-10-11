import express from 'express';
import deleteVeiculo from '../controllers/vehicle/deleteVeiculo.js';
import getById from '../controllers/vehicle/getByIdVeiculo.js'; 
import updateVeiculo from '../controllers/vehicle/updateVeiculo.js'; 
import getVeiculos from '../controllers/vehicle/getVeiculo.js'; 
import handleCreateVeiculo from '../controllers/vehicle/createVeiculo.js';
import { PrismaClient } from '@prisma/client';
import { simulateFinancing } from '../controllers/vehicle/financeSimulator.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/todos', async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany(); 
        res.json(veiculos); 
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});

router.post('/', handleCreateVeiculo);
router.get('/', getVeiculos)

router.get('/:id', getById);
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);
router.post('/financiamento', simulateFinancing);

export default router;
