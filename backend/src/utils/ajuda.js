import pkg from '@prisma/client';
const { PrismaClientValidationError } = pkg;

export default function exceptionHandler(exception, res) { // Usando export default
    console.error(exception);

    if (exception instanceof PrismaClientValidationError) {
        res.status(400).json({
            error: "PrismaClientValidationError",
            message: exception.message,
            meta: exception.meta
        });
    } else {
        res.status(500).json({
            error: "Erro do servidor",
            message: exception.message
        });
    }
}