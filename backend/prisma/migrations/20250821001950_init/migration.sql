/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Troca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."statusTroca" AS ENUM ('PENDENTE', 'ACEITA', 'RECUSADA', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."statusItem" AS ENUM ('DISPONIVEL', 'NEGOCIANDO', 'INDISPONIVEL');

-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_donoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Troca" DROP CONSTRAINT "Troca_itemDesejadoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Troca" DROP CONSTRAINT "Troca_itemOferecidoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Troca" DROP CONSTRAINT "Troca_ofertanteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Troca" DROP CONSTRAINT "Troca_receptorId_fkey";

-- DropTable
DROP TABLE "public"."Categoria";

-- DropTable
DROP TABLE "public"."Item";

-- DropTable
DROP TABLE "public"."Troca";

-- DropTable
DROP TABLE "public"."Usuario";

-- DropEnum
DROP TYPE "public"."StatusItem";

-- DropEnum
DROP TYPE "public"."StatusTroca";

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."item" (
    "id_item" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "status" "public"."statusItem" NOT NULL DEFAULT 'DISPONIVEL',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "donoId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "public"."categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."troca" (
    "id_troca" SERIAL NOT NULL,
    "itemOferecidoId" INTEGER NOT NULL,
    "itemDesejadoId" INTEGER NOT NULL,
    "status" "public"."statusTroca" NOT NULL DEFAULT 'PENDENTE',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "ofertanteId" INTEGER NOT NULL,
    "receptorId" INTEGER NOT NULL,

    CONSTRAINT "troca_pkey" PRIMARY KEY ("id_troca")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "public"."categoria"("nome");

-- AddForeignKey
ALTER TABLE "public"."item" ADD CONSTRAINT "item_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."item" ADD CONSTRAINT "item_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."troca" ADD CONSTRAINT "troca_itemOferecidoId_fkey" FOREIGN KEY ("itemOferecidoId") REFERENCES "public"."item"("id_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."troca" ADD CONSTRAINT "troca_itemDesejadoId_fkey" FOREIGN KEY ("itemDesejadoId") REFERENCES "public"."item"("id_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."troca" ADD CONSTRAINT "troca_ofertanteId_fkey" FOREIGN KEY ("ofertanteId") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."troca" ADD CONSTRAINT "troca_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
