import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getPayments(req, res) {
    try {
        // Busca todos os pagamentos, incluindo informações sobre o usuário e compra
        const pagamentos = await prisma.payment.findMany();

        res.status(200).json(pagamentos);
    } catch (exception) {
        // Lida com exceções
        exceptionHandler(exception, res);
    }
}
