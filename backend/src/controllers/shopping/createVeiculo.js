import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function createVeiculo(req, res) {
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
        const veiculo = await prisma.veiculo.create({
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

        res.status(201).json(veiculo);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}