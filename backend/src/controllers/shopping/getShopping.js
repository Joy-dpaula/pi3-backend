import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getShopping(req, res) {
    try {
        // Busca todas as compras e inclui os dados de usuário e veículo
        const compras = await prisma.compra.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,  // Se você quiser incluir o nome do usuário, por exemplo
                    },
                },
                veiculo: {
                    select: {
                        id: true,
                        modelo: true, // Inclui o modelo do veículo, por exemplo
                    },
                },
            },
        });

        // Formata a resposta de maneira mais legível
        const comprasFormatted = compras.map(compra => ({
            "Compra ID": compra.id,
            "Usuário": {
                "Usuário ID": compra.usuario.id,
                "Nome": compra.usuario.nome,  // Exemplo de nome
            },
            "Veículo": {
                "Veículo ID": compra.veiculo.id,
                "Modelo": compra.veiculo.modelo, // Exemplo de modelo do veículo
            },
            "Valor Total": compra.valorTotal,  // Exemplo de valor total da compra
            "Data da Compra": new Date(compra.dataCompra).toLocaleDateString() // Exemplo de formatação de data
        }));

        // Retorna as compras formatadas como JSON
        res.status(200).json({
            "Total de Compras": compras.length,
            "Compras": comprasFormatted
        });
    } catch (exception) {
        // Lida com exceções e retorna um erro formatado
        exceptionHandler(exception, res);
    }
}
