import { setCookie } from '../../utils/cookie.js'; // Ajuste o caminho conforme necessário

const postController = (req, res) => {
  const { name, value } = req.body;

  
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  setCookie(res, name, value, { maxAge: 24 * 60 * 60 * 1000 }); // Define o cookie por 24 horas

  res.status(201).json({ message: 'Cookie set successfully' });
};

export default postController;
