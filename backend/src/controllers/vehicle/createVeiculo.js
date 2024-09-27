// Dentro do seu vehicleRouter.js ou controlador

import { Router } from 'express';
import { createVeiculo } from '../../models/vehicleModel.js'; // Ajuste o caminho conforme necessário
import multer from 'multer';
import path from 'path';

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads")); // Pasta onde as fotos serão salvas
    },
    filename: (req, file, callback) => {
        const time = Date.now();
        callback(null, `${time}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const router = Router();

// Endpoint para criar veículo com upload de foto
router.post('/', upload.single('foto'), async (req, res) => {
    const { modelo, anoFabricacao, cor, descricao, valor, km, marca, usuarioId, cidade, estado, cep, complemento, logradouro, numero, cambio, carroceria, combustivel } = req.body;

    // Verifica se a foto foi enviada
    if (!req.file) {
        return res.status(400).json({ message: 'A foto do veículo é obrigatória.' });
    }

    try {
        const veiculoData = {
            modelo,
            anoFabricacao: parseInt(anoFabricacao),
            cor,
            descricao,
            valor: parseFloat(valor),
            km: parseFloat(km),
            marca,
            foto: req.file.filename, // Salva o nome do arquivo
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

        const novoVeiculo = await createVeiculo(veiculoData);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar veículo.' });
    }
});

export default router;
