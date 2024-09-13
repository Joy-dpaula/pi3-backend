import { getveiculo } from "../../models/vehicleModel.js" 

const list = async (req, res, next) => {
    try{
        const veiculos = await getveiculo()
        return res.json({
            message: "veiculos com sucesso!",
            veiculos
        })
    } catch(error) {
        next(error)
    }
}

export default list