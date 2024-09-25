import express from 'express';
import deleteVeiculo from '../controllers/vehicle/deleteVeiculo.js';
import getById from '../controllers/vehicle/getByIdVeiculo.js'; 
import updateVeiculo from '../controllers/vehicle/updateVeiculo.js'; 
import getVeiculos from '../controllers/vehicle/getVeiculo.js'; 
import uploadSingle from '../utils/uploadSingle.js'; 
import handleCreateVeiculo from '../controllers/vehicle/createVeiculo.js';


const router = express.Router();

// Rota para criar um veículo
router.post('/', handleCreateVeiculo);
//https://youtu.be/o5JoNi8z6q0?si=cD7oKsVswIWCUEib
router.get('/', getVeiculos)

// Rota para obter um veículo específico por ID
router.get('/:id', getById);

// Rota para atualizar um veículo específico por ID
router.put('/:id', updateVeiculo);

// Rota para excluir um veículo específico por ID
router.delete('/:id', deleteVeiculo);

export default router;
