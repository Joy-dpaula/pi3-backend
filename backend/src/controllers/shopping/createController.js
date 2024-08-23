import { PrismaClient } from '@prisma/client'
import exceptionHandler from '../../utils/ajuda.js' 

const prisma = new PrismaClient();

const createController = async (req, res) => {


    const  {veiculo, usuario, pagamento } = req.body

    try{



    } 
    catch (exception) {
        exceptionHandler(exception, res);
    }





}


export default createController
