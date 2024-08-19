



export function exceptionHandler(e, response) {
  console.log(e);
  
  // Resposta de exceções padrão.
  let error = {
    code: 500,
    message: "Internal Server Error"
  };

  // Resposta exceções dos prisma, relacionadas ao client.
  if (
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    error.code = 400;
    error.message = e.message;
  }

  // Resposta ao client.
  response.status(error.code).json({
    error: error.message,
  });
}



