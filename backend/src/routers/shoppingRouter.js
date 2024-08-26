import express from 'express'
import createVeiculo from '../controllers/shopping/createShopping.js'
import getShopping from '../controllers/shopping/getShopping.js';

const router = express.Router();


router.post('/' , createVeiculo)

router.get('/' , getShopping )



export default router;
