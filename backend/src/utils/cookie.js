import cookieParser from 'cookie-parser';

// Middleware para configurar o cookie-parser com a chave secreta
export function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}

// Função para definir um cookie criptografado
export function setCookie(res, name, value, options = {}) {
  res.cookie(name, value, {

    signed: true, // Indica que o cookie deve ser assinado
    httpOnly: true, // Torna o cookie inacessível ao JavaScript do lado do cliente
    secure: process.env.NODE_ENV === 'production', // Define o cookie como seguro somente em HTTPS em produção
    sameSite: 'Strict', // Prevê que o cookie não será enviado com requisições cross-site

    signed: true,
    httpOnly: true,

    ...options
  });
}


// Função para ler um cookie criptografado
export function getCookie(req, name) {
  return req.signedCookies[name];
}
