-- CreateEnum
CREATE TYPE "tipo_categoria_arma" AS ENUM ('Rifle', 'Pistola', 'Cuchillo', 'Guantes', 'SMG', 'Escopeta');

-- CreateEnum
CREATE TYPE "tipo_rareza" AS ENUM ('Común', 'No común', 'Rara', 'Mítica', 'Legendaria', 'Antigua', 'Contrabando');

-- CreateTable
CREATE TABLE "armas" (
    "id_arma" SERIAL NOT NULL,
    "nombre_arma" VARCHAR(100) NOT NULL,
    "categoria" "tipo_categoria_arma" NOT NULL,

    CONSTRAINT "armas_pkey" PRIMARY KEY ("id_arma")
);

-- CreateTable
CREATE TABLE "skins" (
    "id_skin" SERIAL NOT NULL,
    "nombre_skin" VARCHAR(150) NOT NULL,
    "id_arma_base" INTEGER NOT NULL,
    "rareza" "tipo_rareza" NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "url_imagen" VARCHAR(255) NOT NULL,

    CONSTRAINT "skins_pkey" PRIMARY KEY ("id_skin")
);

-- CreateIndex
CREATE UNIQUE INDEX "armas_nombre_arma_key" ON "armas"("nombre_arma");

-- CreateIndex
CREATE UNIQUE INDEX "skins_id_arma_base_nombre_skin_key" ON "skins"("id_arma_base", "nombre_skin");

-- AddForeignKey
ALTER TABLE "skins" ADD CONSTRAINT "fk_arma" FOREIGN KEY ("id_arma_base") REFERENCES "armas"("id_arma") ON DELETE CASCADE ON UPDATE NO ACTION;
