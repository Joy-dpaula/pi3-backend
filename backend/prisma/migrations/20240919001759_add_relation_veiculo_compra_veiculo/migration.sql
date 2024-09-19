-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `veiculo_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `veiculo` MODIFY `cor` VARCHAR(25) NOT NULL;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `Veiculo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `compra` RENAME INDEX `compra_usuarioId_fkey` TO `compra_usuarioId_idx`;

-- RenameIndex
ALTER TABLE `compra` RENAME INDEX `compra_veiculoId_fkey` TO `compra_veiculoId_idx`;

-- RenameIndex
ALTER TABLE `veiculo` RENAME INDEX `veiculo_usuarioId_fkey` TO `Veiculo_usuarioId_fkey`;
