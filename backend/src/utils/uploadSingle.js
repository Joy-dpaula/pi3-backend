import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Configuração do armazenamento e nome do arquivo para ser único.
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/uploads/');
  },
  filename: (req, file, callBack) => {
    const fileId = uuidv4();
    const fileExt = path.extname(file.originalname).toLowerCase();
    const newFileName = `${fileId}${fileExt}`;
    callBack(null, newFileName);
  },
});

const upload = multer({ storage: storage });
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Tipos de MIME permitidos
const maxSize = 5 * 1024 * 1024; // Tamanho máximo permitido para o arquivo (5MB)

const uploadSingle = (req, res, next) => {
  upload.single('uploaded_file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const errors = []; // Array para registrar erros
    const file = req.file; // Recupera o arquivo recebido

    // Valida os tipos de arquivos permitidos e o tamanho máximo
    if (!allowedTypes.includes(file.mimetype)) {
      errors.push(`Tipo de arquivo inválido: ${file.originalname}`);
    }
    if (file.size > maxSize) {
      errors.push(`Arquivo muito grande: ${file.originalname}`);
    }

    // Verifica se houve erros
    if (errors.length > 0) {
      fs.unlinkSync(file.path); // Remove o arquivo enviado em caso de erros
      return res.status(400).json({ error: errors });
    }

    req.upload = file; // Anexa o arquivo recebido no objeto da requisição
    req.upload.customPath = `uploads/${file.filename}`; // Caminho personalizado para salvar no banco
    next(); // Passa a execução para o próximo middleware
  });
};

export default uploadSingle;

