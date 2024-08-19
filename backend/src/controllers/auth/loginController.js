import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from '../../../utils/cookie.js';

 // Verifique o caminho do módulo de cookies

const prisma = new PrismaClient();



const loginController = async (req, res) => {
  try {
    const { senha, cpf } = req.body;

    if (!('senha' in data) || !('cpf' in data)) {
      return res.status(401).json({
        success: false,
        error: "Usuário e senha são obrigatórios"
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
          cpf: data.cpf
      } 
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }

    // Debugging: Log the values
    console.log('Senha enviada:', senha);
    console.log('Senha do usuário no banco de dados:', usuario.senha);

    const hashedPassword = await bcrypt.hash(data.senha, usuario.senha);

    if (!hashedPassword) {
      return res.status(401).json({
        success: false,
        error: "Usuário e/ou senha incorreta(s)"
      });
    }

    delete usuario.senha;

    setCookie(res, 'userData', JSON.stringify(usuario), { 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({
      success: true,
      user: usuario
    });

  } catch (exception) {
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro interno no servidor.",
      error: exception.message
    });
  }
};


export default loginController;
