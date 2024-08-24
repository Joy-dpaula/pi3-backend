import express from 'express';



import getMessage from "../controllers/message/getMessage.js";
import sendMessage from "../controllers/message/createMessage.js";

const router = express.Router();


router.post('/' , sendMessage)

router.get('/' , getMessage)


export default router;