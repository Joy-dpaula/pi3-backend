import { getByIdVeiculo } from "../../models/vehicleModel.js";

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Verifica se o parâmetro id existe
        if (!id) {
            return res.status(400).json({
                error: "ID não fornecido na requisição.",
            });
        }

        const veiculo = await getByIdVeiculo(+id); // "+" converte o ID para número

        if (!veiculo) {
            return res.status(404).json({
                error: `Veículo com o id ${id} não encontrado!`
            });
        }

        return res.json({
            success: "Veículo encontrado com sucesso!",
            veiculo
        });
    } catch (error) {
        next(error);
    }
};

export default getById;
