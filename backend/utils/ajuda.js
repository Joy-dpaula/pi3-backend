const { PrismaClientValidationError } = require('@prisma/client');

function exceptionHandler(exception, res) {
    console.error(exception); // Adicionando esta linha para imprimir o erro completo no console
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

module.exports = {
    exceptionHandler
};
