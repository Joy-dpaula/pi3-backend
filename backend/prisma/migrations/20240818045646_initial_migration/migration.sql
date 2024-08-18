/*
  Warnings:

  - Added the required column `usuarioId` to the `Compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Compra` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `senha` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Veiculo` MODIFY `cor` VARCHAR(30) NOT NULL;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
