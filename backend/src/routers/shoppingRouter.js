import express from 'express'

import create from '../controllers/shopping/createShopping.js';
import paymente from '../controllers/shopping/createPayment.js'

const router = express.Router();


router.post('/', create);
router.post('/payment' , paymente)




export default router