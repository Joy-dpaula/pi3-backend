/*
  Warnings:

  - You are about to alter the column `cor` on the `veiculo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(25)` to `VarChar(5)`.

*/
-- DropForeignKey
ALTER TABLE `cartaocredito` DROP FOREIGN KEY `CartaoCredito_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_veiculoId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_compraId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `Veiculo_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `veiculo` MODIFY `cor` VARCHAR(5) NOT NULL;

-- CreateTable
CREATE TABLE `compra_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `dataCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valor` DOUBLE NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartaocredito` ADD CONSTRAINT `cartaocredito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `compra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `veiculo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra_veiculo` ADD CONSTRAINT `compra_veiculo_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra_veiculo` ADD CONSTRAINT `compra_veiculo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `payment` RENAME INDEX `Payment_compraId_key` TO `payment_compraId_key`;
