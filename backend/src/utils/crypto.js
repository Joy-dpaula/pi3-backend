import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = Buffer.from('d4e9f6c2abf29a19d12c3c8b36d7a8e72b1c5f5e8e0b9d1c7f3f1f6e9a6b7c8d', 'hex'); // Deve ter 32 bytes
const IV_LENGTH = 16; // Tamanho do vetor de inicialização

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Função para definir um cookie criptografado
export function setCookie(res, name, value, options = {}) {
  const encryptedValue = encrypt(value);
  res.cookie(name, encryptedValue, {
    signed: true, // Indica que o cookie deve ser assinado
    httpOnly: true, // Torna o cookie inacessível ao JavaScript do lado do cliente
    secure: process.env.NODE_ENV === 'production', // Define o cookie como seguro somente em HTTPS em produção
    sameSite: 'Strict', // Protege contra CSRF
    ...options
  });
}

// Função para descriptografar dados
export function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Função para ler um cookie criptografado
export function getCookie(req, name) {
  const encryptedValue = req.signedCookies[name];
  return encryptedValue ? decrypt(encryptedValue) : null;
}
