import express from 'express'
import getShopping from '../controllers/shopping/getShopping.js';
import createShopping from '../controllers/shopping/createShopping.js'


const router = express.Router();


router.post('/' , createShopping)
router.get('/' , getShopping )



export default router;
