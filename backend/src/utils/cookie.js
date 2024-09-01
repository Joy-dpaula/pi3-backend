import cookieParser from 'cookie-parser';
import {encrypt} from '../utils/crypto.js'

// Middleware para configurar o cookie-parser com a chave secreta
export function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}

// Função para definir um cookie criptografado
export function setCookie(res, name, value, options = {}) {
  const encryptedValue = encrypt(value);
  res.cookie(name, encryptedValue, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
    sameSite: 'Strict',
    ...options
  });
}

// Função para ler um cookie criptografado
export function getCookie(req, name) {
  return req.signedCookies[name];
}
