import express from 'express'

import {createCreditCard} from '../controllers/creditCard/createCreditCard.js';
import {deleteCreditCard} from '../controllers/creditCard/deleteCreditCard.js'
import {updateCreditCard} from '../controllers/creditCard/updateCreditCard.js'


const router = express.Router();


router.post('/', createCreditCard);
router.delete('/', deleteCreditCard);
router.put('/', updateCreditCard);



export default router