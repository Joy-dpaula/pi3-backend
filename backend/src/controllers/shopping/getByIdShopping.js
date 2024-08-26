import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient()


export default async function getByIdShopping(req, res) {

   try{

    const id = Number(req.params.id);
    const compra = await prisma.compra.findUniqueOrThrow({ where: { id } ,
        include: {
            usuario: {
                select: {
                    id: true,
                },
            },
            veiculo: {
                select: {
                    id: true,
                },
            },
        },
    
    });


     const comprasFormatted = ({
            id: compra.id,
            usuario: {
                id: compra.usuario.id,
            },
            veiculo: {
                id: compra.veiculo.id,
            }
        });

        // Retorna as compras formatadas como resposta
        res.status(200).json(comprasFormatted);
    

   }catch(exception) {
    exceptionHandler(exception, res);
}

}