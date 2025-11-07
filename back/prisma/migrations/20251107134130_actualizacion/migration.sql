/*
  Warnings:

  - You are about to drop the column `producto_id` on the `carrito_producto` table. All the data in the column will be lost.
  - Added the required column `skin_id` to the `carrito_producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."carrito_producto" DROP CONSTRAINT "carrito_producto_producto_id_fkey";

-- AlterTable
ALTER TABLE "carrito_producto" DROP COLUMN "producto_id",
ADD COLUMN     "skin_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id_skin") ON DELETE CASCADE ON UPDATE CASCADE;
