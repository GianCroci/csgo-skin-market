-- CreateTable
CREATE TABLE "carrito" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrito_producto" (
    "id" SERIAL NOT NULL,
    "carrito_id" INTEGER NOT NULL,
    "skin_id" INTEGER NOT NULL,
    "cantidad" INTEGER DEFAULT 1,

    CONSTRAINT "carrito_producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carrito_usuario_id_key" ON "carrito"("usuario_id");

-- AddForeignKey
ALTER TABLE "carrito" ADD CONSTRAINT "carrito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_carrito_id_fkey" FOREIGN KEY ("carrito_id") REFERENCES "carrito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id_skin") ON DELETE RESTRICT ON UPDATE CASCADE;
