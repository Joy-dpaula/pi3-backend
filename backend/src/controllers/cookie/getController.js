import { getCookie } from '../../utils/cookie.js'; // Ajuste o caminho conforme necessário


// Função para obter o valor de um cookie
export const getCookie = (req, name) => {
  const cookies = req.headers.cookie;
  
  if (cookies) {
    const cookiesArray = cookies.split('; ');
    const cookie = cookiesArray.find(cookie => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  }
  
  return null;
};

export default getController;
