

import express from 'express';
import { setCookie, getCookie } from '../utils/cookie.js';




const router = express.Router();

// Função para definir um cookie
const setCookieHandler = (req, res) => {
  const { name, value } = req.body;
  setCookie(res, name, value, { maxAge: 24 * 60 * 60 * 1000 }); // Define cookie por 24 horas
  res.send('Cookie has been set');
};


// Função para ler um cookie
const getCookieHandler = (req, res) => {
  const cookieName = req.params.name;
  const cookieValue = getCookie(req, cookieName);

  if (cookieValue) {
    res.json({ success: true, value: cookieValue });
  } else {
    res.status(404).json({ success: false, error: 'Cookie not found' });
  }
};

// Rotas
router.post('/set-cookie', setCookieHandler);
router.get('/get-cookie/:name', getCookieHandler);

export default router;

