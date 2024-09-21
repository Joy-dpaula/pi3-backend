import { PrismaClient } from '@prisma/client';
import { exceptionHandler } from '../../utils/ajuda.js';

const prisma = new PrismaClient();

export default async function getByIdShopping(req, res) {
    try {
        const id = Number(req.params.id);

        // Busca a compra com o ID e inclui o usuário e o veículo
        const compra = await prisma.compra.findUniqueOrThrow({
            where: { id },
            include: {
                usuario: { select: { id: true } },
                veiculo: { select: { id: true } },
            },
        });

        // Formatação da resposta
        const compraFormatted = {
            compraId: compra.id,
            detalhesUsuario: {
                usuarioId: compra.usuario.id,
            },
            detalhesVeiculo: {
                veiculoId: compra.veiculo.id,
            },
            mensagem: "Compra encontrada com sucesso.",
            status: "success",
        };

        // Retorna a compra formatada
        res.status(200).json(compraFormatted);
    } catch (exception) {
        exceptionHandler(exception, res);
    }
}
