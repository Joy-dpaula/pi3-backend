import { Router } from 'express';
import { updateVeiculo } from '../../models/vehicleModel.js'; 
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
    const { id } = req.params;
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
        const veiculoId = Number(id);
        if (isNaN(veiculoId)) {
            return res.status(400).json({ message: 'ID do veículo inválido.' });
        }

        const veiculoData = {
            modelo,
            anoFabricacao: parseInt(anoFabricacao),
            cor,
            descricao,
            valor: parseFloat(valor),
            km: parseFloat(km),
            marca,
            usuarioId: parseInt(usuarioId),
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

        if (req.file) {
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

            veiculoData.foto = uploadResponse.secure_url; 
        }

        const updatedVeiculo = await updateVeiculo(veiculoId, veiculoData);

        if (!updatedVeiculo) {
            return res.status(404).json({ message: 'Veículo não encontrado.' });
        }

        res.status(200).json(updatedVeiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar veículo.' });
    }
});

export default router;