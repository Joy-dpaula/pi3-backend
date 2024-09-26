import express from 'express';
import { createCompraVeiculo, getComprasVeiculos, getCompraVeiculoById, updateCompraVeiculo, deleteCompraVeiculo } from '../controllers/compraVeiculo/compraVeiculoController.js';

const router = express.Router();

// Rotas para o CRUD
router.post('/', createCompraVeiculo);
router.get('/', getComprasVeiculos);
router.get('/:id', getCompraVeiculoById);
router.put('/:id', updateCompraVeiculo);
router.delete('/:id', deleteCompraVeiculo);

export default router;
