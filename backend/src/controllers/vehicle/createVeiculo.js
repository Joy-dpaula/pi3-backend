import { createVeiculo } from '../../models/vehicleModel.js';

const handleCreateVeiculo = async (req, res, next) => {
    const { modelo, anoFabricacao, cor, descricao, valor, km, marca, usuarioId, cidade, estado, cep, complemento, logradouro, numero, cambio, carroceria, combustivel } = req.body;
    console.log('Arquivo recebido:', req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'A foto do veículo é obrigatória.' });
    }

    try {
        const veiculoData = {
            modelo,
            anoFabricacao,
            cor,
            descricao,
            valor: parseFloat(valor), // Conversão de string para número
            km: parseFloat(km), // Conversão de string para número
            marca,
            foto: req.file.filename, // Nome do arquivo da foto
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
        };

        console.log('Dados recebidos para criar veículo:', veiculoData);

        const novoVeiculo = await createVeiculo(veiculoData);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar veículo.' });
    }
};

export default handleCreateVeiculo;
