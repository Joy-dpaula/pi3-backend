import express from 'express'

import payment from '../controllers/payment/createPayment.js'
import paymentDelete from '../controllers/payment/deletePayment.js'
import paymentGet from '../controllers/payment/getPayment.js'
import paymentGetById from '../controllers/payment/getByIdPayment.js'
import paymentUpdate from '../controllers/payment/updatePayment.js'


const router = express.Router();


router.post('/' , payment)
router.delete('/:id' , paymentDelete)
router.get('/' , paymentGet )
router.get('/:id' , paymentGetById)
router.patch('/:id' , paymentUpdate)

export default router