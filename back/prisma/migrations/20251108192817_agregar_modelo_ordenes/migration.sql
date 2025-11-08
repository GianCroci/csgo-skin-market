/*
  Warnings:

  - You are about to drop the `carrito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carrito_producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carrito" DROP CONSTRAINT "carrito_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "carrito_producto" DROP CONSTRAINT "carrito_producto_carrito_id_fkey";

-- DropForeignKey
ALTER TABLE "carrito_producto" DROP CONSTRAINT "carrito_producto_skin_id_fkey";

-- DropTable
DROP TABLE "carrito";

-- DropTable
DROP TABLE "carrito_producto";

-- CreateTable
CREATE TABLE "ordenes" (
    "id_orden" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(50) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "skins_ids" INTEGER[],

    CONSTRAINT "ordenes_pkey" PRIMARY KEY ("id_orden")
);

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
