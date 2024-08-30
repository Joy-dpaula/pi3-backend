import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';
import uploadSingle from '../../utils/uploadSingle.js'; // Importe o middleware de upload

const prisma = new PrismaClient();

export default async function createVeiculo(req, res) {
    // Primeiro, lidamos com o upload da imagem
    uploadSingle(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { modelo, anoFabricacao, cor, descricao, valor, km, marca, usuarioId } = req.body;
        const foto = req.upload ? req.upload.customPath : ''; // Caminho da imagem se houver

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
                    foto,
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
    });
}
