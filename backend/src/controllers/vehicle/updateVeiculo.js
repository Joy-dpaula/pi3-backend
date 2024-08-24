import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function updateVeiculo(req, res) {
    const { id } = req.params;
    const { modelo, anoFabricacao, cor, descricao, valor, km, marca, foto, usuarioId } = req.body;

    // Validação básica dos dados
    if (!modelo || !anoFabricacao || !cor || !descricao || !valor || !km || !marca || !usuarioId) {
        return res.status(400).json({ error: "Modelo, ano de fabricação, cor, descrição, valor, km, marca e usuário são obrigatórios." });
    }

    if (cor.length > 5) {
        return res.status(400).json({ error: "A cor deve ter no máximo 5 caracteres." });
    }

    if (marca.length > 20) {
        return res.status(400).json({ error: "A marca deve ter no máximo 20 caracteres." });
    }

    try {
        // Verifica se o veículo existe
        const veiculoExistente = await prisma.veiculo.findUnique({ where: { id: parseInt(id) } });
        if (!veiculoExistente) {
            return res.status(404).json({ error: "Veículo não encontrado." });
        }

        // Atualiza o veículo
        const veiculo = await prisma.veiculo.update({
            where: { id: parseInt(id) },
            data: {
                modelo,
                anoFabricacao: new Date(anoFabricacao),
                cor,
                descricao,
                valor,
                km,
                marca,
                foto: foto || '',
                usuario: {
                    connect: { id: usuarioId }
                }
            },
            select: {
                id: true,
                modelo: true,
                anoFabricacao: true,
                cor: true,
                descricao: true,
                valor: true,
                km: true,
                marca: true,
                foto: true,
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    }
                }
            }
        });

        res.status(200).json(veiculo);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
