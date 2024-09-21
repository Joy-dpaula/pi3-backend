


import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function creditCardDelete(req, res) {
    try {
    
        const { id } = req.params;

     
        const credit = await prisma.cartaocredito.findUnique({ where: { id: parseInt(id) } });

  
        if (!credit) {
            return res.status(404).json({ error: "Cartão de credito não encontrada." });
        }


        await prisma.cartaocredito.delete({ where: { id: parseInt(id) } });

   
        res.status(204).end();

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
