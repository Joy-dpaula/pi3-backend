const cookieParser = require('cookie-parser');

// Middleware para configurar o cookie-parser com a chave secreta
function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}

// Função para definir um cookie criptografado
function setCookie(res, name, value, options = {}) {
  res.cookie(name, value, {
    signed: true,
    httpOnly: true,
    ...options
  });
}

// Função para ler um cookie criptografado
function getCookie(req, name) {
  return req.signedCookies[name];
}

module.exports = {
  configureCookieParser,
  setCookie,
  getCookie
};
