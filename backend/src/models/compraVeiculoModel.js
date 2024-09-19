const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funções de acesso ao banco de dados
const createCompraVeiculo = async (data) => {
    return await prisma.compraVeiculo.create({ data });
};

const getAllComprasVeiculos = async () => {
    return await prisma.compraVeiculo.findMany();
};

const getCompraVeiculoById = async (id) => {
    return await prisma.compraVeiculo.findUnique({
        where: { id: parseInt(id) },
    });
};

const updateCompraVeiculo = async (id, data) => {
    return await prisma.compraVeiculo.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteCompraVeiculo = async (id) => {
    return await prisma.compraVeiculo.delete({
        where: { id: parseInt(id) },
    });
};

