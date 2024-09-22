import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function deleteShopping(req, res) {
    try {
    
        const { id } = req.params;

     
        const compra = await prisma.compra.findUnique({ where: { id: parseInt(id) } });

  
        if (!compra) {
            return res.status(404).json({ error: "Compra não encontrada." });
        }


        await prisma.compra.delete({ where: { id: parseInt(id) } });

   
        res.status(200).json({ message: 'Compra deletada com sucesso'});


    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
