-- ------------------------------------------------------------------
-- SCRIPT COMPLETO PARA CREAR Y POBLAR LA BASE DE DATOS DE SKINS
-- ------------------------------------------------------------------
-- Ejecuta este script completo en pgAdmin o DBeaver.
-- ------------------------------------------------------------------

-- 1. LIMPIEZA: Borramos todo lo anterior para empezar de cero.
-- (Esto da error si es la primera vez, pero no importa, es para asegurar)
DROP TABLE IF EXISTS skins;
DROP TABLE IF EXISTS armas;
DROP TABLE IF EXISTS usuario;
DROP TYPE IF EXISTS tipo_rareza;
DROP TYPE IF EXISTS tipo_categoria_arma;

-- 2. CREACIÓN DE TIPOS (ENUMS)
-- Basado en tu 'schema.prisma'
CREATE TYPE tipo_categoria_arma AS ENUM (
  'Rifle',
  'Pistola',
  'Cuchillo',
  'Guantes',
  'SMG',
  'Escopeta'
);

CREATE TYPE tipo_rareza AS ENUM (
  'Común',
  'No común',
  'Rara',
  'Mítica',
  'Legendaria',
  'Antigua',
  'Contrabando'
);

-- 3. CREACIÓN DE TABLAS (DDL)
-- Tabla de Usuarios
CREATE TABLE ubicacion (
    id_ubicacion SERIAL PRIMARY KEY,
    direccion VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL
);


CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  apellido   VARCHAR(100) NOT NULL,
  mail       VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  token      VARCHAR(255) UNIQUE,
  rol        VARCHAR(50) DEFAULT 'usuario',
  verificado BOOLEAN DEFAULT false,
  ubicacion_id INTEGER,
    FOREIGN KEY (ubicacion_id) REFERENCES ubicacion(id_ubicacion) ON DELETE SET NULL
);

-- Tabla de Armas Base
CREATE TABLE armas (
  id_arma SERIAL PRIMARY KEY,
  nombre_arma VARCHAR(100) UNIQUE NOT NULL,
  categoria tipo_categoria_arma NOT NULL
);

-- Tabla de Skins
CREATE TABLE skins (
  id_skin SERIAL PRIMARY KEY,
  nombre_skin VARCHAR(150) NOT NULL,
  id_arma_base INT NOT NULL,
  rareza tipo_rareza NOT NULL,
  precio NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  url_imagen VARCHAR(255) NOT NULL,
  
  -- Definimos la relación
  CONSTRAINT fk_arma
    FOREIGN KEY(id_arma_base) 
    REFERENCES armas(id_arma)
    ON DELETE CASCADE,
  
  UNIQUE(id_arma_base, nombre_skin)
);

-- 4. INSERCIÓN DE DATOS (DML - "SEEDING")
-- Insertamos las categorías de armas
INSERT INTO armas (id_arma, nombre_arma, categoria) VALUES
  (1, 'AK-47', 'Rifle'),
  (2, 'AWP', 'Rifle'),
  (3, 'Cuchillo Karambit', 'Cuchillo'),
  (4, 'M4A1-S', 'Rifle'),
  (5, 'Guantes de Conductor', 'Guantes')
ON CONFLICT (id_arma) DO NOTHING;

-- Insertamos todas las skins con las URLs correctas
-- (Estas URLs asumen que tienes la carpeta 'public/images/skins' en tu back-end)
INSERT INTO skins (id_arma_base, nombre_skin, rareza, precio, url_imagen) VALUES
  -- AK-47 (id_arma_base: 1)
  (1, 'Asiimov', 'Antigua', 150.00, '/images/skins/ak_asiimov.png'),
  (1, 'Redline', 'Mítica', 45.50, '/images/skins/ak_redline.png'),
  (1, 'Vulcan', 'Antigua', 220.00, '/images/skins/ak_vulcan.png'),
  (1, 'The Empress', 'Antigua', 260.50, '/images/skins/ak_empress.png'),
  (1, 'Bloodshot', 'Legendaria', 80.00, '/images/skins/ak_bloodshot.png'),
  (1, 'Neon Rider', 'Antigua', 110.00, '/images/skins/ak_neon_rider.png'),
  
  -- AWP (id_arma_base: 2)
  (2, 'Dragon Lore', 'Contrabando', 5000.00, '/images/skins/awp_dragon_lore.png'),
  (2, 'Asiimov', 'Antigua', 90.00, '/images/skins/awp_asiimov.png'),
  (2, 'Hyper Beast', 'Antigua', 130.00, '/images/skins/awp_hyperbeast.png'),
  (2, 'Containment Breach', 'Antigua', 310.00, '/images/skins/awp_containment.png'),
  (2, 'Mortis', 'Mítica', 35.00, '/images/skins/awp_mortis.png'),
  (2, 'Neo-Noir', 'Antigua', 70.00, '/images/skins/awp_neonoir.png'),
  
  -- Cuchillo Karambit (id_arma_base: 3)
  (3, 'Lore', 'Antigua', 1200.00, '/images/skins/karambit_lore.png'),
  (3, 'Fade', 'Contrabando', 2500.00, '/images/skins/karambit_fade.png'),
  (3, 'Case Hardened', 'Antigua', 1800.00, '/images/skins/karambit_case.png'),
  (3, 'Doppler (Ruby)', 'Contrabando', 4000.00, '/images/skins/karambit_doppler_ruby.png'),
  (3, 'Tiger Tooth', 'Antigua', 1600.00, '/images/skins/karambit_tiger_tooth.png'),
  
  -- M4A1-S (id_arma_base: 4)
  (4, 'Hyper Beast', 'Antigua', 88.00, '/images/skins/m4a1s_hyperbeast.png'),
  (4, 'Printstream', 'Antigua', 350.00, '/images/skins/m4_printstream.png'),
  (4, 'Golden Coil', 'Antigua', 90.00, '/images/skins/m4_goldencoil.png'),
  (4, 'Decimator', 'Mítica', 40.00, '/images/skins/m4_decimator.png'),
  (4, 'Welcome to the Jungle', 'Contrabando', 2100.00, '/images/skins/m4_jungle.png'),
  
  -- Guantes (id_arma_base: 5)
  (5, 'Rezan the Red', 'Mítica', 150.00, '/images/skins/gloves_rezan.png'),
  (5, 'Slingshot', 'Antigua', 1100.00, '/images/skins/gloves_slingshot.png'),
  (5, 'Jade', 'Mítica', 300.00, '/images/skins/gloves_jade.png'),
  (5, 'Fade', 'Antigua', 2300.00, '/images/skins/gloves_fade.png')
ON CONFLICT (id_arma_base, nombre_skin) DO NOTHING;

-- 5. MENSAJE FINAL
SELECT '¡Base de datos creada y poblada exitosamente!' AS "Resultado";

---------------------------------------------------------------------------------------
-- 6. CREACIÓN DE TABLA 'ordenes' Y SEED DE DATOS
---------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ordenes (
  id_orden SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  estado VARCHAR(50) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  skins_ids INT[] NOT NULL DEFAULT '{}',

  CONSTRAINT fk_usuario_orden
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE
);

-- 7. INSERCIÓN DE ÓRDENES DE EJEMPLO
INSERT INTO ordenes (id_usuario, fecha, estado, total, skins_ids) VALUES
  (1, '2020-07-16', 'Abierta', 1747.94, ARRAY[1, 3, 8]),
  (2, '2021-03-05', 'Completada', 5230.00, ARRAY[7, 15]),
  (1, '2022-11-12', 'Cancelada', 220.00, ARRAY[5]),
  (3, '2023-05-20', 'Completada', 2630.00, ARRAY[2, 4, 6]);

SELECT 'Tabla ORDENES creada y poblada correctamente.' AS "Resultado";

---------------------------------------------------------------------------------------

-- 1. Agregar la columna 'descripcion' a la tabla 'skins' (si no existe)
ALTER TABLE skins 
ADD COLUMN IF NOT EXISTS descripcion VARCHAR(1000);

-- 2. Actualizar cada skin con su descripción (usando una transacción para seguridad)
BEGIN;

-- AK-47
UPDATE skins SET descripcion = 'Diseño de ciencia ficción futurista en blanco, negro y naranja. Una favorita de los fans.' WHERE nombre_skin = 'Asiimov' AND id_arma_base = 1;
UPDATE skins SET descripcion = 'Pintada con un patrón de fibra de carbono y detalles en rojo intenso. Elegante y agresiva.' WHERE nombre_skin = 'Redline' AND id_arma_base = 1;
UPDATE skins SET descripcion = 'Diseño deportivo inspirado en el alto rendimiento, con colores azul, blanco y negro.' WHERE nombre_skin = 'Vulcan' AND id_arma_base = 1;
UPDATE skins SET descripcion = 'Inspirada en la carta del Tarot "La Emperatriz", con detalles dorados y un arte majestuoso.' WHERE nombre_skin = 'The Empress' AND id_arma_base = 1;
UPDATE skins SET descripcion = 'Un diseño caótico y monstruoso, con un ojo gigante que te mira desde el arma.' WHERE nombre_skin = 'Bloodshot' AND id_arma_base = 1;
UPDATE skins SET descripcion = 'Estética retrowave/cyberpunk con colores neón brillantes rosa y azul.' WHERE nombre_skin = 'Neon Rider' AND id_arma_base = 1;

-- AWP
UPDATE skins SET descripcion = 'La joya de la corona. Pintada con un dragón escupefuego. Legendaria y extremadamente rara.' WHERE nombre_skin = 'Dragon Lore' AND id_arma_base = 2;
UPDATE skins SET descripcion = 'El clásico diseño futurista de Asiimov, adaptado perfectamente al cuerpo del AWP.' WHERE nombre_skin = 'Asiimov' AND id_arma_base = 2;
UPDATE skins SET descripcion = 'Una bestia psicodélica pintada con colores vibrantes y agresivos.' WHERE nombre_skin = 'Hyper Beast' AND id_arma_base = 2;
UPDATE skins SET descripcion = 'Representa una brecha de contención radiactiva, con ratas mutantes y verde tóxico.' WHERE nombre_skin = 'Containment Breach' AND id_arma_base = 2;
UPDATE skins SET descripcion = 'Inspirada en la carta del Tarot "La Muerte", con un diseño oscuro y esquelético.' WHERE nombre_skin = 'Mortis' AND id_arma_base = 2;
UPDATE skins SET descripcion = 'Estilo neo-noir cómic, con una figura femenina en escala de grises y detalles magenta.' WHERE nombre_skin = 'Neo-Noir' AND id_arma_base = 2;

-- Cuchillo Karambit
UPDATE skins SET descripcion = 'Hoja dorada con un grabado intrincado inspirado en la leyenda del Dragon Lore.' WHERE nombre_skin = 'Lore' AND id_arma_base = 3;
UPDATE skins SET descripcion = 'Acabado cromado que refleja un gradiente de colores translúcidos (rosa, morado, amarillo).' WHERE nombre_skin = 'Fade' AND id_arma_base = 3;
UPDATE skins SET descripcion = 'Endurecido al soplete, mostrando una pátina única de azules, morados y dorados.' WHERE nombre_skin = 'Case Hardened' AND id_arma_base = 3;
UPDATE skins SET descripcion = 'Fase Doppler ultra rara, con un acabado rojo rubí casi completo.' WHERE nombre_skin = 'Doppler (Ruby)' AND id_arma_base = 3;
UPDATE skins SET descripcion = 'Anodizado en naranja con rayas de tigre grabadas a mano.' WHERE nombre_skin = 'Tiger Tooth' AND id_arma_base = 3;

-- M4A1-S
UPDATE skins SET descripcion = 'La bestia psicodélica en su versión para M4A1-S. Colores intensos y diseño agresivo.' WHERE nombre_skin = 'Hyper Beast' AND id_arma_base = 4;
UPDATE skins SET descripcion = 'Diseño minimalista en blanco y negro con detalles iridiscentes y geométricos.' WHERE nombre_skin = 'Printstream' AND id_arma_base = 4;
UPDATE skins SET descripcion = 'Diseño de serpiente dorada y negra, elegante y letal.' WHERE nombre_skin = 'Golden Coil' AND id_arma_base = 4;
UPDATE skins SET descripcion = 'Estilo retro de los 80s con un patrón geométrico de neón rosa y azul.' WHERE nombre_skin = 'Decimator' AND id_arma_base = 4;
UPDATE skins SET descripcion = 'Temática selvática con una serpiente dorada recorriendo el cuerpo del arma.' WHERE nombre_skin = 'Welcome to the Jungle' AND id_arma_base = 4;

-- Guantes
UPDATE skins SET descripcion = 'Guantes de conductor de cuero rojo intenso, usados por el mismísimo Rezan.' WHERE nombre_skin = 'Rezan the Red' AND id_arma_base = 5;
UPDATE skins SET descripcion = 'Guantes deportivos con malla y refuerzos, ideales para combate intenso.' WHERE nombre_skin = 'Slingshot' AND id_arma_base = 5;
UPDATE skins SET descripcion = 'Guantes de operaciones especiales con un acabado verde jade distintivo.' WHERE nombre_skin = 'Jade' AND id_arma_base = 5;
UPDATE skins SET descripcion = 'El clásico acabado Fade aplicado a guantes de especialista de alta calidad.' WHERE nombre_skin = 'Fade' AND id_arma_base = 5;

COMMIT;

-- Verificación rápida
SELECT nombre_skin, descripcion FROM skins;
