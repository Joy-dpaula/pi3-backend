-- CreateTable
CREATE TABLE `compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    INDEX `Compra_usuarioId_fkey`(`usuarioId`),
    INDEX `Compra_veiculoId_fkey`(`veiculoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(15) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(50) NOT NULL,
    `anoFabricacao` DATETIME(3) NOT NULL,
    `cor` VARCHAR(30) NOT NULL,
    `descricao` VARCHAR(500) NOT NULL,
    `valor` INTEGER NOT NULL,
    `km` INTEGER NOT NULL,
    `marca` VARCHAR(20) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    INDEX `Veiculo_usuarioId_fkey`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `Compra_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `Compra_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `Veiculo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
