/*
  Warnings:

  - Added the required column `genre` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media` ADD COLUMN `genre` VARCHAR(191) NOT NULL;
