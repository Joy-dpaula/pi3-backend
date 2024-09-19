/*
  Warnings:

  - Added the required column `cidade` to the `veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `cidade` VARCHAR(30) NOT NULL,
    ADD COLUMN `estado` VARCHAR(30) NOT NULL,
    MODIFY `cor` VARCHAR(25) NOT NULL;
