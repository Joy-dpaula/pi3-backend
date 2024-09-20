import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function deletePayment(req, res) {
    try {
    
        const { id } = req.params;

     
        const payment = await prisma.payment.findUnique({ where: { id: parseInt(id) } });

  
        if (!payment) {
            return res.status(404).json({ error: "Compra não encontrada." });
        }


        await prisma.payment.delete({ where: { id: parseInt(id) } });

   
        res.status(204).end();

    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
