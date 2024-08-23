import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getVeiculoById(req, res) {
    const { id } = req.params;

    try {
        // Busca o veículo pelo ID
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: parseInt(id) },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });

        if (!veiculo) {
            return res.status(404).json({ error: "Veículo não encontrado." });
        }

        res.status(200).json({
            id: veiculo.id,
            modelo: veiculo.modelo,
            anoFabricacao: veiculo.anoFabricacao.toISOString().split('T')[0], // Converte para string no formato YYYY-MM-DD
            cor: veiculo.cor,
            descricao: veiculo.descricao,
            valor: veiculo.valor,
            km: veiculo.km,
            marca: veiculo.marca,
            foto: veiculo.foto,
            usuario: {
                id: veiculo.usuario.id,
                nome: veiculo.usuario.nome,
                email: veiculo.usuario.email,
            }
        });
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
