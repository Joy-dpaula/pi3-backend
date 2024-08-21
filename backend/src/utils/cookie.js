import cookieParser from 'cookie-parser';

// Middleware para configurar o cookie-parser com a chave secreta
export function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}

// Função para definir um cookie criptografado
export function setCookie(res, name, value, options = {}) {
  res.cookie(name, value, {
    signed: true,
    httpOnly: true,
    ...options
  });
}

// Função para ler um cookie criptografado
export function getCookie(req, name) {
  return req.signedCookies[name];
}
