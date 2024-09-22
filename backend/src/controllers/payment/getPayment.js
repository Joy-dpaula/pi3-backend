import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getPayments(req, res) {
    try {

        const pagamentos = await prisma.payment.findMany();

        res.status(200).json(pagamentos);
    } catch (exception) {

        exceptionHandler(exception, res);
    }
}
