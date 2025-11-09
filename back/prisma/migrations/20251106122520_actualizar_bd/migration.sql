-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(500),
    "clasificacion" VARCHAR(100) NOT NULL,
    "precio" DECIMAL NOT NULL,
    "imagenUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "mail" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),
    "rol" VARCHAR(50) DEFAULT 'usuario',
    "verificado" BOOLEAN DEFAULT false,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

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
    "producto_id" INTEGER NOT NULL,
    "cantidad" INTEGER DEFAULT 1,

    CONSTRAINT "carrito_producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_mail_key" ON "usuario"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "carrito_usuario_id_key" ON "carrito"("usuario_id");

-- AddForeignKey
ALTER TABLE "carrito" ADD CONSTRAINT "carrito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_carrito_id_fkey" FOREIGN KEY ("carrito_id") REFERENCES "carrito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
