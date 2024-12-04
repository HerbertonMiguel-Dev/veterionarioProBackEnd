/*
  Warnings:

  - You are about to drop the column `cadatrado` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `cadatrado` on the `responsaveis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "cadatrado",
ADD COLUMN     "cadastro" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "responsaveis" DROP COLUMN "cadatrado",
ADD COLUMN     "cadastro" BOOLEAN NOT NULL DEFAULT true;
