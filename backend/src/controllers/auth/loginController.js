import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from '../../../utils/cookie.js'; // Verifique o caminho do módulo de cookies

const prisma = new PrismaClient();


const loginController = async (req, res) => {
  try {
    const { password, cpf } = req.body;

    if (!password || !cpf) {
      return res.status(401).json({
        success: false,
        error: "Usuário e senha são obrigatórios"
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { cpf }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }

    const passwordCheck = await bcrypt.compare(password, usuario.password);

    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        error: "Usuário e/ou senha incorreta(s)"
      });
    }

    // Remove a senha antes de armazenar nos cookies
    delete usuario.password;

    // Define um cookie assinado com as informações do usuário
    setCookie(res, 'userData', JSON.stringify(usuario), { 
      maxAge: 24 * 60 * 60 * 1000 // Define a duração do cookie (24 horas)
    });

    // Retorna um objeto contendo o usuário
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
