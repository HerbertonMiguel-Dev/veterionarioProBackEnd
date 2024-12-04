/*
  Warnings:

  - Added the required column `usuario_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `responsaveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultas" ADD COLUMN     "responsavel_id" TEXT,
ADD COLUMN     "veterinario_id" TEXT;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "responsaveis" ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "veterinarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "crmv" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "veterinarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responsaveis" ADD CONSTRAINT "responsaveis_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veterinarios" ADD CONSTRAINT "veterinarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "veterinarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "responsaveis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
