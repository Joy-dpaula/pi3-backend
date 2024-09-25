import express from 'express'

import create from '../controllers/shopping/createShopping.js';
import paymente from '../controllers/payment/createPayment.js'
import deleteShopping from '../controllers/shopping/deleteShopping.js'
import getByIdShopping from '../controllers/shopping/getByIdShopping.js';
import getShopping from '../controllers/shopping/getShopping.js';

const router = express.Router();


router.post('/', create);
router.post('/payment' , paymente)
router.delete('/:id' , deleteShopping)
router.get('/:id' , getByIdShopping)
router.get('/' , getShopping)

export default router