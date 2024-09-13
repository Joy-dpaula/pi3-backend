import { deleteVeiculo } from "../../models/vehicleModel.js";

const remove = async (req, res, next) => {
    const { id } = req.params;

    try {
        const veiculo = await deleteVeiculo(+id);

        return res.json({
            success: "Veículo removido com sucesso!",
            veiculo,
        });
    } catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: `Veículo com o id ${id} não encontrado!`,
            });
        }
        next(error); 
    }
};

export default remove;
