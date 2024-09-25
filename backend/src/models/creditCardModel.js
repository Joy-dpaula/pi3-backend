import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function createCartao(numero, validade, cvv, nomeTitular, bandeira, usuarioId) {

    const cartaoCredito = await prisma.cartaocredito.create({
        data: {
            numero,
            validade,
            cvv,
            nomeTitular,
            bandeira,
            usuarioId,
            atualizadoEm: new Date(),
        },
    });

    return cartaoCredito;

}

export async function getCartao(bandeira) {

    const cartoesDeCredito = await prisma.cartaocredito.findMany({
        where: {
            bandeira,
        },
    });

    return cartoesDeCredito;
}

export async function getCartaoById(id) {

    const cartaoCredito = await prisma.cartaocredito.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!cartaoCredito) {
        throw new Error('Cartão de crédito não encontrado!')
    }

    return cartaoCredito;
}

export async function updateCartaoModel(id, { numero, validade, cvv, nomeTitular, bandeira, usuarioId }) {

    const hashedCvv = await bcrypt.hash(cvv, 10);

    const cartaoCreditoAtualizado = await prisma.cartaocredito.update({
        where: { id: Number(id) },
        data: {
            numero,
            validade,
            cvv: hashedCvv,
            nomeTitular,
            bandeira,
            atualizadoEm: new Date(),
        },
    });

    return cartaoCreditoAtualizado;
}


export async function deleteCartaoModel(id) {

    const credit = await prisma.cartaocredito.findUnique({ where: { id: parseInt(id) } });

    await prisma.cartaocredito.delete({ where: { id: parseInt(id) } });

    if (!credit) {
        throw new Error("Cartão de credito não encontrado." );
    }

    return credit;

}