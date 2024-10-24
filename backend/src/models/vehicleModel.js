import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getveiculo = async () => {
    const veiculos = await prisma.veiculo.findMany();
    return veiculos;
};

export const getByIdVeiculo = async (id) => {
    const veiculo = await prisma.veiculo.findUnique({
        where: {
            id: (id),
        },
    });
    return veiculo;
};

export const createVeiculo = async (veiculo) => {
    const result = await prisma.veiculo.create({
        data: veiculo
    })
    return result
}

export const deleteVeiculo = async (id) => {
    await prisma.compra.deleteMany({
        where: {
            veiculoId: String(id),
        },
    });

    const veiculo = await prisma.veiculo.delete({
        where: {
            id: String(id),
        },
    });

    return veiculo;
}


export const updateVeiculo = async (id, data) => {
    return await prisma.veiculo.update({
        where: { id: id },
        data: data,
    });
};
