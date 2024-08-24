import { setCookie } from '../../utils/cookie.js'; // Ajuste o caminho conforme necessário

const postController = (req, res) => {
  const { name, value } = req.body;
<<<<<<< HEAD
  
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  setCookie(res, name, value, { maxAge: 24 * 60 * 60 * 1000 }); // Define o cookie por 24 horas
=======
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }
  setCookie(res, name, value);
>>>>>>> 25e7b8903aafdacc6e1bd2dfff68abec2761fb76
  res.status(201).json({ message: 'Cookie set successfully' });
};

export default postController;
