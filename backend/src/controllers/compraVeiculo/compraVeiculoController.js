// Criação de uma nova compra
export const createCompraVeiculo = async (req, res) => {
    try {
        const { veiculoId, usuarioId, valor } = req.body;
        const novaCompra = await compraVeiculoModel.createCompraVeiculo({
            veiculoId,
            usuarioId,
            valor,
        });
        res.status(201).json(novaCompra);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar compra.' });
    }
};

// Listar todas as compras
export const getComprasVeiculos = async (req, res) => {
    try {
        const compras = await compraVeiculoModel.getAllComprasVeiculos();
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar compras.' });
    }
};

// Buscar uma compra específica
export const getCompraVeiculoById = async (req, res) => {
    try {
        const { id } = req.params;
        const compra = await compraVeiculoModel.getCompraVeiculoById(id);
        if (!compra) return res.status(404).json({ error: 'Compra não encontrada.' });
        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar compra.' });
    }
};

// Atualizar uma compra
export const updateCompraVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { veiculoId, usuarioId, valor } = req.body;
        const compraAtualizada = await compraVeiculoModel.updateCompraVeiculo(id, {
            veiculoId,
            usuarioId,
            valor,
        });
        res.status(200).json(compraAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar compra.' });
    }
};

// Excluir uma compra
export const deleteCompraVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        await compraVeiculoModel.deleteCompraVeiculo(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir compra.' });
    }
};
