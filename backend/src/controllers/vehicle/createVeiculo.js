import { Router } from 'express';
import { createVeiculo } from '../../models/vehicleModel.js'; 
import multer from 'multer';
import cloudinary from 'cloudinary';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.v2.config({
    cloud_name: 'de0ujb8vh',
    api_key: '259617411365387',
    api_secret: 'rD3ZHcyDygGR8fTDaridZ-3Nab4'
});

const router = Router();

router.post('/', upload.single('foto'), async (req, res) => {
    const { modelo, anoFabricacao, cor, descricao, valor, km, marca, usuarioId, cidade, estado, cep, complemento, logradouro, numero, cambio, carroceria, combustivel } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'A foto do veículo é obrigatória.' });
    }

    try {
        const uploadOptions = {
            resource_type: 'auto',
            public_id: `veiculos/${Date.now()}_${req.file.originalname}`, 
        };

        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    return reject(new Error('Erro ao fazer upload da imagem.'));
                }
                resolve(result);
            }).end(req.file.buffer);
        });

        const veiculoData = {
            modelo,
            anoFabricacao: parseInt(anoFabricacao),
            cor,
            descricao,
            valor: parseFloat(valor),
            km: parseFloat(km),
            marca,
            foto: uploadResponse.secure_url,  
            usuarioId: usuarioId,
            cidade,
            estado,
            cep,
            complemento,
            logradouro,
            numero,
            cambio,
            carroceria,
            combustivel
        };

        const novoVeiculo = await createVeiculo(veiculoData);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar veículo.' });
    }
});

export default router;