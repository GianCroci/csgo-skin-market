/*
  Warnings:

  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."carrito_producto" DROP CONSTRAINT "carrito_producto_skin_id_fkey";

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "ubicacion_id" INTEGER;

-- DropTable
DROP TABLE "public"."producto";

-- CreateTable
CREATE TABLE "ubicacion" (
    "id_ubicacion" SERIAL NOT NULL,
    "direccion" VARCHAR(100) NOT NULL,
    "localidad" VARCHAR(100) NOT NULL,
    "provincia" VARCHAR(100) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,

    CONSTRAINT "ubicacion_pkey" PRIMARY KEY ("id_ubicacion")
);

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id_skin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_ubicacion_id_fkey" FOREIGN KEY ("ubicacion_id") REFERENCES "ubicacion"("id_ubicacion") ON DELETE SET NULL ON UPDATE NO ACTION;
