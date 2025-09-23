/*
  Warnings:

  - The `imagemUrl` column on the `item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."item" DROP COLUMN "imagemUrl",
ADD COLUMN     "imagemUrl" TEXT[];
