import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function newShopping({ usuarioId, veiculoId, method }) {


    if (!method) {
        throw new Error('Método de pagamento não informado.');
    }

    const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    const veiculo = await prisma.veiculo.findUnique({
        where: { id: veiculoId }
    });

    if (!veiculo) {
        throw new Error('Veículo não encontrado.');
    }

    const existingShopping = await prisma.compra.findFirst({
        where: {
            veiculoId: veiculoId
        }
    });

    if (existingShopping) {
        throw new Error('Compra de veículo já efetuada!');
    }




    const compra = await prisma.compra.create({
        data: {
            veiculoId: veiculoId,
            usuarioId: usuarioId,
            status: 'pendente',
            method: method
        },
        select: {
            id: true,
            status: true,
            method: true
        }
    });

    return { compra }
}




export async function getShoppingModel() {

    const compras = await prisma.compra.findMany({
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                },
            },
            veiculo: {
                select: {
                    id: true,
                    modelo: true,
                },
            }
        },
    });

    return compras

}

export async function getShoppingById(id) {

    const compra = await prisma.compra.findUniqueOrThrow({
        where: { id: String(id) },
        include: {
            usuario: { select: { id: true } },
            veiculo: { select: { id: true } },
        },
    });

    if (!compra) throw new Error('Compra não encontrada!');

    return compra;
}

export async function deleteShoppingModel(id) {

    const compra = await prisma.compra.findUnique({ where: { id: String(id) } });

    if (!compra) throw new Error('Compra não encontrada!');

    await prisma.compra.delete({ where: { id: String(id) } });

    return compra;
}

export async function updateShopping(shoppingId, data) {
    const { veiculoId, method } = data;

    if (veiculoId) {
        const veiculo = await prisma.veiculo.findUnique({
            where: {
                id: veiculoId,
            },
        });

        if (!veiculo) {
            throw new Error('Veículo não encontrado.');
        }
    }

    const updatedShopping = await prisma.compra.update({
        where: { id: shoppingId },
        data: {
            method,
        },
    });

    return updatedShopping;
}
