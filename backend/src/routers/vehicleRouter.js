import express from 'express';
import deleteVeiculo from '../controllers/vehicle/deleteVeiculo.js';
import getById from '../controllers/vehicle/getByIdVeiculo.js'; 
import updateVeiculo from '../controllers/vehicle/updateVeiculo.js'; 
import getVeiculos from '../controllers/vehicle/getVeiculo.js'; 
import uploadSingle from '../utils/uploadSingle.js'; 
import handleCreateVeiculo from '../controllers/vehicle/createVeiculo.js';


const router = express.Router();

router.post('/', handleCreateVeiculo);
router.get('/', getVeiculos)
router.get('/:id', getById);
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);

export default router;
