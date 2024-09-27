import { Router } from 'express';
import { updateVeiculo } from '../../models/vehicleModel.js'; // Ajuste o caminho conforme necessário
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

// Endpoint para atualizar veículo com upload de nova foto (opcional)
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

    // Verifica se o ID é válido
    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID deve ser um número válido.' });
    }

    // Cria um objeto de atualização
    const veiculoData = {
        modelo,
        anoFabricacao: parseInt(anoFabricacao, 10),
        cor,
        descricao,
        valor: parseFloat(valor),
        km: parseFloat(km),
        marca,
        usuarioId: parseInt(usuarioId, 10),
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

    // Adiciona a foto apenas se foi enviada
    if (req.file) {
        veiculoData.foto = req.file.filename; // Atualiza a foto apenas se a nova for enviada
    }

    try {
        const result = await updateVeiculo({ id: parseInt(id, 10), ...veiculoData });

        if (!result) {
            return res.status(404).json({ message: 'Veículo não encontrado.' });
        }

        res.json({ message: 'Veículo atualizado com sucesso!', veiculo: result });
    } catch (error) {
        console.error(error);
        if (error?.code === 'P2025') {
            return res.status(404).json({ message: `Veículo com ID ${id} não encontrado!` });
        }
        res.status(500).json({ message: 'Erro ao atualizar veículo.', error: error.message });
    }
});

export default router;
