import { Router } from 'express';
import { createVeiculo, updateVeiculo } from '../../models/vehicleModel.js'; 
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

router.put('/:id', upload.single('foto'), async (req, res) => {
    const vehicleId = req.params.id;
    const {
        modelo,
        anoFabricacao,
        cor,
        descricao,
        valor,
        km,
        marca,
        usuarioId,
        cidade,
        estado,
        cep,
        complemento,
        logradouro,
        numero,
        cambio,
        carroceria,
        combustivel
    } = req.body;

   
    

    try {
        let fotoUrl;

        if (req.file) {
            const uploadOptions = {
                resource_type: 'auto',
                public_id: `veiculos/${Date.now()}_${req.file.originalname}`,
                overwrite: true  
            };

            const uploadResponse = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        return reject(new Error('Erro ao fazer upload da imagem.'));
                    }
                    resolve(result);
                }).end(req.file.buffer);
            });

            fotoUrl = uploadResponse.secure_url;
        }

        const veiculoData = {
            modelo,
            anoFabricacao: parseInt(anoFabricacao, 10),
            cor,
            descricao,
            valor: parseFloat(valor),
            km: parseFloat(km),
            marca,
            usuarioId,
            cidade,
            estado,
            cep,
            complemento,
            logradouro,
            numero,
            cambio,
            carroceria,
            combustivel,
            ...(fotoUrl && { foto: fotoUrl }) 
        };

        const updatedVeiculo = await updateVeiculo(vehicleId, veiculoData); 
        res.status(200).json(updatedVeiculo);
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar veículo.', error: error.message });
    }
});

export default router;
