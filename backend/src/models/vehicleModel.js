import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getveiculo = async () => {
    const veiculos = await prisma.veiculo.findMany();
    return veiculos;
};

export const getByIdVeiculo = async (id) => {
    const veiculo = await prisma.veiculo.findUnique({
        where: {
            id: parseInt(id),
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
    const veiculo = await prisma.veiculo.delete({
        where: {
            id: id
        }
    })
    return veiculo
}

export const updateVeiculo = async (veiculo) => {
    const result = await prisma.veiculo.update({
        data: veiculo,
        where:{
           id: veiculo.id 
        }
    })
    return result
}