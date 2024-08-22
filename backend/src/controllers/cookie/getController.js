// utils/cookie.js
import { getCookie } from '../../../utils/cookie.js'; // Ajuste o caminho conforme necessário

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

export const getCookie = (req, name) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const cookiesArray = cookies.split('; ');
    const cookie = cookiesArray.find(cookie => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  }
  return null;
};
