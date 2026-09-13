# StoreLab Backend

Backend desarrollado en Node.js + Express para la tienda StoreLab, con autenticación de usuarios, gestión de productos, reseñas, wishlist, checkout y administración de cuentas.

## Tecnologías

- Node.js
- Express
- Prisma + PostgreSQL
- MongoDB + Mongoose
- JWT para autenticación
- Cloudinary para imágenes
- Multer para subida de archivos
- CORS para acceso desde frontend

## Requisitos previos

- Node.js 18 o superior
- npm
- PostgreSQL disponible
- MongoDB Atlas o instancia local de MongoDB
- Cloudinary configurado

## Instalación

1. Clona el proyecto y entra en la carpeta backend.
2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con las variables necesarias.

## Variables de entorno

Ejemplo de configuración:

```env
PORT=3000
JWT_SECRET=tu_jwt_secret
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

DATABASE_URL="postgresql://usuario:password@host:5432/storelab?sslmode=require"
DIRECT_URL="postgresql://usuario:password@host:5432/storelab?sslmode=require"

MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/storelab?retryWrites=true&w=majority"

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

NODE_ENV=development
```

## Arranque

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

La API queda disponible en:

```txt
http://localhost:3000
```

## Estructura principal

```txt
backend/
├── app.js
├── server.js
├── config/
│   ├── cloudinary.js
│   ├── config.js
│   └── multer.js
├── controllers/
│   ├── authController.js
│   ├── checkoutController.js
│   ├── productController.js
│   ├── reviewController.js
│   ├── userController.js
│   └── wishlistController.js
├── db/
│   └── configMongo.js
├── lib/
│   └── prisma.js
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── notFound.js
│   └── validateProducts.js
├── models/
│   ├── rating.js
│   ├── reviews.js
│   └── wishlist.js
├── prisma/
│   └── schema.prisma
├── routes/
│   ├── authRoutes.js
│   ├── checkoutRoutes.js
│   ├── productRoutes.js
│   ├── reviewRoutes.js
│   ├── userRoutes.js
│   └── wishlistRoutes.js
├── services/
│   ├── authServices.js
│   ├── checkoutServices.js
│   ├── imageServices.js
│   ├── productsServices.js
│   ├── reviewServices.js
│   ├── userServices.js
│   └── wishlistServices.js
├── utils/
│   ├── jsonDb.js
│   └── token.js
├── .env
├── package.json
├── prisma.config.ts
└── README.md
```

## Endpoints principales

### Autenticación

- `POST /api/auth/register` → registro de usuario
- `POST /api/auth/login` → login
- `GET /api/auth/me` → perfil autenticado
- `POST /api/auth/logout` → cerrar sesión

### Usuarios

- `GET /api/users` → lista usuarios (solo admin)
- `GET /api/users/:id` → detalle de usuario (solo admin)
- `PATCH /api/users/:id/role` → cambiar rol (solo admin)
- `DELETE /api/users/:id` → eliminar usuario (solo admin)
- `GET /api/users/me` → perfil del usuario autenticado

### Productos

- `GET /api/products` → listar productos
- `GET /api/products?category=Surf` → filtrar por categoría
- `GET /api/products?limit=4` → limitar resultados
- `GET /api/products/:id` → detalle del producto
- `POST /api/products` → crear producto (admin)
- `PUT /api/products/:id` → actualizar producto (admin)
- `DELETE /api/products/:id` → eliminar producto (admin)
- `POST /api/products/upload-image` → subir imagen a Cloudinary (admin)

### Reseñas

- `GET /api/reviews/product/:productId` → reseñas de un producto
- `POST /api/reviews` → crear reseña
- `PUT /api/reviews/:id` → actualizar reseña
- `DELETE /api/reviews/:id` → borrar reseña

### Wishlist

- `GET /api/wishlist` → obtener wishlist del usuario
- `POST /api/wishlist/toggle` → añadir o quitar producto

## Autenticación

La API usa JWT en cookies `HttpOnly` para sesiones del usuario. La mayoría de rutas protegidas requieren:

- `authMiddleware`
- `adminMiddleware` para áreas administrativas

## Imágenes con Cloudinary

La subida de imágenes se realiza con `Multer` y `Cloudinary`.

Ejemplo de uso desde frontend:

```js
const formData = new FormData()
formData.append("image", file)

fetch("http://localhost:3000/api/products/upload-image", {
  method: "POST",
  credentials: "include",
  body: formData,
})
```

## Base de datos

### PostgreSQL / Prisma
Usado para:
- usuarios
- productos

### MongoDB
Usado para:
- reseñas
- wishlist

## Consideraciones de seguridad

- No compartir `.env` ni credenciales reales en repositorios públicos.
- Usar `JWT_SECRET`.
- Mantener CORS restringido a orígenes autorizados.
- Revisar permisos de administrador antes de acceder a rutas privadas.

## Estado del proyecto

Este backend está preparado para:

- registro e inicio de sesión
- gestión de usuarios
- catálogo de productos
- reseñas con valoración
- wishlist
- subida de imágenes
- administración por roles

## Autor

Ane Amiano Ibero, The Bridge Student. Proyecto StoreLab Backend.