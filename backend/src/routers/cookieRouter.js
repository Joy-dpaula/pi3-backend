const express = require('express');
const { setCookie, getCookie } = require('./cookie');
const router = express.Router();

// Rota para definir um cookie
router.post('/set-cookie', (req, res) => {
  const { name, value } = req.body;
  setCookie(res, name, value, { maxAge: 24 * 60 * 60 * 1000 }); // Define cookie por 24 horas
  res.send('Cookie has been set');
});

// Rota para ler um cookie
router.get('/get-cookie/:name', (req, res) => {
  const cookieName = req.params.name;
  const cookieValue = getCookie(req, cookieName);
  
  if (cookieValue) {
    res.json({ success: true, value: cookieValue });
  } else {
    res.status(404).json({ success: false, error: 'Cookie not found' });
  }
});

module.exports = router;
