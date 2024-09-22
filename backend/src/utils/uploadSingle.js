import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        if(!fs.existsSync('private/uploads')) {
          fs.mkdirSync('private/uploads', { recursive: true });
        }
        callBack(null, 'private/uploads/');
    },
    filename: (req, file, callBack) => {
      const fileId = uuidv4();
      const fileExt = path.extname(file.originalname).toLowerCase();
      const newFileName = `${fileId}${fileExt}`;
      callBack(null, newFileName);
    }
});

const upload = multer({ storage: storage }); 
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const maxSize = 5 * 1024 * 1024;

const uploadSingle = (req, res, next) => { 
  upload.single('uploaded_file')(req, res, (err) => { 
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const errors = []; 
    const file = req.file; 

    if (file) {

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Tipo de arquivo inválido: ${file.originalname}`);
      }
      if (file.size > maxSize) {
        errors.push(`Arquivo muito grande: ${file.originalname}`);
      }

      if (errors.length > 0) {
        fs.unlinkSync(file.path); 
        return res.status(400).json({ error: errors });
      }

      req.upload = file;
      req.upload.customPath = `uploads/${file.filename}`; 
    }
    delete req.body.uploaded_file;
    next(); 
  });
};

export default uploadSingle;
