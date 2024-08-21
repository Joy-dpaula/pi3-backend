import { getCookie } from '../../utils/cookie.js'; // Ajuste o caminho conforme necessário

const getController = (req, res) => {
  const { name } = req.params;
  const value = getCookie(req, name);
  if (value) {
    res.json({ [name]: value });
  } else {
    res.status(404).json({ error: 'Cookie not found' });
  }
};

export default getController;
