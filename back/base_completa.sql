-- ------------------------------------------------------------------
-- SCRIPT COMPLETO PARA CREAR Y POBLAR LA BASE DE DATOS DE SKINS
-- ------------------------------------------------------------------
-- Ejecuta este script completo en pgAdmin o DBeaver.
-- ------------------------------------------------------------------

-- ¡Si no existen las tablas o types se puede tirar un npx prisma db push antes de correr este script en 
-- lugar de los drop+create ))!

-- 1. LIMPIEZA: Borramos todo lo anterior para empezar de cero.
-- (Esto da error si es la primera vez, pero no importa, es para asegurar)
DROP TABLE IF EXISTS ordenes;
DROP TABLE IF EXISTS skins;
DROP TABLE IF EXISTS armas;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS ubicacion;
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
  descripcion VARCHAR(1000),
  CONSTRAINT fk_arma 
    FOREIGN KEY(id_arma_base) 
    REFERENCES armas(id_arma) 
    ON DELETE CASCADE,
  UNIQUE(id_arma_base, nombre_skin)
);

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
INSERT INTO skins (id_arma_base, nombre_skin, rareza, precio, url_imagen, descripcion) VALUES
  -- AK-47
  (1, 'Asiimov', 'Antigua', 150.00, '/images/skins/ak_asiimov.png', 'Diseño de ciencia ficción futurista en blanco, negro y naranja. Una favorita de los fans.'),
  (1, 'Redline', 'Mítica', 45.50, '/images/skins/ak_redline.png', 'Pintada con un patrón de fibra de carbono y detalles en rojo intenso. Elegante y agresiva.'),
  (1, 'Vulcan', 'Antigua', 220.00, '/images/skins/ak_vulcan.png', 'Diseño deportivo inspirado en el alto rendimiento, con colores azul, blanco y negro.'),
  (1, 'The Empress', 'Antigua', 260.50, '/images/skins/ak_empress.png', 'Inspirada en la carta del Tarot "La Emperatriz", con detalles dorados y un arte majestuoso.'),
  (1, 'Bloodshot', 'Legendaria', 80.00, '/images/skins/ak_bloodshot.png', 'Un diseño caótico y monstruoso, con un ojo gigante que te mira desde el arma.'),
  (1, 'Neon Rider', 'Antigua', 110.00, '/images/skins/ak_neon_rider.png', 'Estética retrowave/cyberpunk con colores neón brillantes rosa y azul.'),

  
  -- AWP
  (2, 'Dragon Lore', 'Contrabando', 5000.00, '/images/skins/awp_dragon_lore.png', 'La joya de la corona. Pintada con un dragón escupefuego. Legendaria y extremadamente rara.'),
  (2, 'Asiimov', 'Antigua', 90.00, '/images/skins/awp_asiimov.png', 'El clásico diseño futurista de Asiimov, adaptado perfectamente al cuerpo del AWP.'),
  (2, 'Hyper Beast', 'Antigua', 130.00, '/images/skins/awp_hyperbeast.png', 'Una bestia psicodélica pintada con colores vibrantes y agresivos.'),
  (2, 'Containment Breach', 'Antigua', 310.00, '/images/skins/awp_containment.png', 'Representa una brecha de contención radiactiva, con ratas mutantes y verde tóxico.'),
  (2, 'Mortis', 'Mítica', 35.00, '/images/skins/awp_mortis.png', 'Inspirada en la carta del Tarot "La Muerte", con un diseño oscuro y esquelético.'),
  (2, 'Neo-Noir', 'Antigua', 70.00, '/images/skins/awp_neonoir.png', 'Estilo neo-noir cómic, con una figura femenina en escala de grises y detalles magenta.'),

  -- Cuchillo Karambit
  (3, 'Lore', 'Antigua', 1200.00, '/images/skins/karambit_lore.png', 'Hoja dorada con un grabado intrincado inspirado en la leyenda del Dragon Lore.'),
  (3, 'Fade', 'Contrabando', 2500.00, '/images/skins/karambit_fade.png', 'Acabado cromado que refleja un gradiente de colores translúcidos (rosa, morado, amarillo).'),
  (3, 'Case Hardened', 'Antigua', 1800.00, '/images/skins/karambit_case.png', 'Endurecido al soplete, mostrando una pátina única de azules, morados y dorados.'),
  (3, 'Doppler (Ruby)', 'Contrabando', 4000.00, '/images/skins/karambit_doppler_ruby.png', 'Fase Doppler ultra rara, con un acabado rojo rubí casi completo.'),
  (3, 'Tiger Tooth', 'Antigua', 1600.00, '/images/skins/karambit_tiger_tooth.png', 'Anodizado en naranja con rayas de tigre grabadas a mano.'),

  -- M4A1-S
  (4, 'Hyper Beast', 'Antigua', 88.00, '/images/skins/m4a1s_hyperbeast.png', 'La bestia psicodélica en su versión para M4A1-S. Colores intensos y diseño agresivo.'),
  (4, 'Printstream', 'Antigua', 350.00, '/images/skins/m4_printstream.png', 'Diseño minimalista en blanco y negro con detalles iridiscentes y geométricos.'),
  (4, 'Golden Coil', 'Antigua', 90.00, '/images/skins/m4_goldencoil.png', 'Diseño de serpiente dorada y negra, elegante y letal.'),
  (4, 'Decimator', 'Mítica', 40.00, '/images/skins/m4_decimator.png', 'Estilo retro de los 80s con un patrón geométrico de neón rosa y azul.'),
  (4, 'Welcome to the Jungle', 'Contrabando', 2100.00, '/images/skins/m4_jungle.png', 'Temática selvática con una serpiente dorada recorriendo el cuerpo del arma.'),

  -- Guantes
  (5, 'Rezan the Red', 'Mítica', 150.00, '/images/skins/gloves_rezan.png', 'Guantes de conductor de cuero rojo intenso, usados por el mismísimo Rezan.'),
  (5, 'Slingshot', 'Antigua', 1100.00, '/images/skins/gloves_slingshot.png', 'Guantes deportivos con malla y refuerzos, ideales para combate intenso.'),
  (5, 'Jade', 'Mítica', 300.00, '/images/skins/gloves_jade.png', 'Guantes de operaciones especiales con un acabado verde jade distintivo.'),
  (5, 'Fade', 'Antigua', 2300.00, '/images/skins/gloves_fade.png', 'El clásico acabado Fade aplicado a guantes de especialista de alta calidad.')
ON CONFLICT (id_arma_base, nombre_skin) DO NOTHING;

-- 7. INSERCIÓN DE ÓRDENES DE EJEMPLO
INSERT INTO ordenes (id_usuario, fecha, estado, total, skins_ids) VALUES
  (1, '2020-07-16', 'Abierta', 1747.94, ARRAY[1, 3, 8]),
  (2, '2021-03-05', 'Completada', 5230.00, ARRAY[7, 15]),
  (1, '2022-11-12', 'Cancelada', 220.00, ARRAY[5]),
  (2, '2023-05-20', 'Completada', 2630.00, ARRAY[2, 4, 6]);

SELECT 'Tabla ORDENES creada y poblada correctamente.' AS "Resultado";

COMMIT;

---------------------------------------------------------------------------------------
-- 6. MENSAJE FINAL
---------------------------------------------------------------------------------------

SELECT '¡Base de datos creada y poblada exitosamente!' AS "Resultado";

-- 7. Verificación rápida
SELECT nombre_skin, descripcion FROM skins;
