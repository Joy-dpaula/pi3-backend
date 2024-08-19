/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `compra` table. All the data in the column will be lost.
  - You are about to alter the column `cor` on the `veiculo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(5)`.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `compra` DROP COLUMN `usuarioId`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `senha` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `veiculo` MODIFY `cor` VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);
