import cookieParser from 'cookie-parser';

// Middleware para configurar o cookie-parser com a chave secreta
export function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}


export function setCookie(res, name, value, options = {}) {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    httpOnly: true, // Segurança
    secure: isProduction, // HTTPS apenas em produção
    ...options // Permite sobrescrever opções
  };

  // Remova temporariamente sameSite para depuração
  res.cookie(name, value, cookieOptions);
}





// Função para ler um cookie criptografado
export function getCookie(req, name) {
  return req.signedCookies[name];
}