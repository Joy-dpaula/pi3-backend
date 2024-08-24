import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getVeiculo(req, res) {
    try {
        const veiculos = await prisma.veiculo.findMany({
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

        const veiculosFormatted = veiculos.map(veiculo => ({
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
        }));

        res.json(veiculosFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
