# 🎮 CSGO Skin Market

Marketplace fullstack para la compra y venta de skins de CS:GO. Proyecto académico desarrollado en el marco de la materia **Taller Web 2** de la Universidad Nacional de La Matanza (UNLaM).

---

## 🛠️ Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | Angular · TypeScript · HTML · CSS |
| **Backend** | Node.js · Express · TypeScript |
| **Base de datos** | PostgreSQL |
| **ORM** | Prisma |
| **Autenticación** | JSON Web Tokens (JWT) |

---

## ✨ Funcionalidades

- 🔐 Registro e inicio de sesión con autenticación stateless via JWT
- 🛒 Listado de skins disponibles en el marketplace
- 📦 Publicación de skins para la venta
- 🔍 Búsqueda y filtrado de items
- 👤 Perfil de usuario con historial de operaciones
- 🔒 Rutas protegidas según el rol del usuario

---

## 📁 Estructura del proyecto

```
csgo-skin-market/
├── back/          # API REST - Node.js + Express + Prisma
└── front/         # SPA - Angular
```

---

## 🚀 Instalación y uso

### Requisitos previos

- Node.js v18+
- PostgreSQL
- npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/GianCroci/csgo-skin-market.git
cd csgo-skin-market
```

### 2. Configurar el backend

```bash
cd back
npm install
```

Crear un archivo `.env` en la carpeta `back/` con las siguientes variables:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/csgo_market"
JWT_SECRET="tu_secreto_jwt"
PORT=3000
```

Ejecutar las migraciones de Prisma:

```bash
npx prisma migrate dev
```

Iniciar el servidor:

```bash
npm run dev
```

### 3. Configurar el frontend

```bash
cd ../front
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

---

## 🔗 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/auth/register` | Registro de usuario |
| `POST` | `/auth/login` | Login — retorna JWT |
| `GET` | `/skins` | Listado de skins disponibles |
| `POST` | `/skins` | Publicar una skin (auth requerida) |
| `GET` | `/skins/:id` | Detalle de una skin |
| `DELETE` | `/skins/:id` | Eliminar publicación (auth requerida) |

---

## 📐 Arquitectura

El proyecto sigue una arquitectura **cliente-servidor desacoplada**:

- El **frontend Angular** consume la API REST mediante servicios HTTP.
- El **backend Node.js/Express** expone los endpoints, valida los JWT en cada request protegido y delega la persistencia a **Prisma + PostgreSQL**.
- La autenticación es **stateless**: no se usan sesiones en el servidor; el cliente almacena y envía el token en el header `Authorization: Bearer <token>`.

---

## 👥 Integrantes

Proyecto grupal — Taller Web 2, UNLaM.

- [Gian Croci](https://github.com/GianCroci)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos.
