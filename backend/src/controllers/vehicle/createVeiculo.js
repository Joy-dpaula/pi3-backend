import { createVeiculo } from "../../models/vehicleModel.js"; // Certifique-se que está corretamente importado

const handleCreateVeiculo = async (req, res, next) => {
    try{
        const veiculo = req.body
        const result = await createVeiculo(veiculo)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar!"
            })

        return res.json({
            success: "veiculo criado com sucesso!",
            account: result
        })
    } catch(error) {
        next(error)
    }
}

export default handleCreateVeiculo;