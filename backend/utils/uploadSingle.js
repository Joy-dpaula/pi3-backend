const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configura o armazenamento e o nome do arquivo para ser único.
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/uploads/');
    },
    filename: (req, file, callBack) => {
      const fileId = uuidv4();
      const fileExt = path.extname(file.originalname).toLocaleLowerCase();
      const newFileName = `${fileId}${fileExt}`;
      callBack(null, newFileName);
    }
});

const upload = multer({ storage: storage }); // Criar uma instância do multer para gerenciar o upload.
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Lista de MIME types permitidos.
const maxSize = 5 * 1024 * 1024; // 5MB tamanho máximo permitido para o arquivo.

const uploadSingle = (req, res, next) => { // Implementa o middleware para o upload.
  upload.single('uploaded_file')(req, res, (err) => {  // Processa o upload usando a instância do multer.
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const errors = []; // array para registrar os erros.
    const file = req.file; // Recupera arquivo recebido.

    // Validar os tipos de arquivos permitidos e o tamanho máximo.
    if (!allowedTypes.includes(file.mimetype)) {
      errors.push(`Tipo de arquivo inválido: ${file.originalname}`);
    }
    if (file.size > maxSize) {
      errors.push(`Arquivo muito grande: ${file.originalname}`);
    }

    // Verifica se houveram errors.
    if (errors.length > 0) {
      fs.unlinkSync(file.path); // Remove arquivo enviado em caso de erros.
      return res.status(400).json({ error: errors });
    }

    req.upload = file; // Anexa o arquivo recebido no objeto da requisição.
    req.upload.customPath = `uploads/${file.filename}`; // Caminho personalizado para salvar no banco.
    next(); // Passa a execução para o próximo middleware.
  });
};

module.exports = uploadSingle;
