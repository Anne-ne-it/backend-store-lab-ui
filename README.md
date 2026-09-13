Markdown
# StoreLab Backend

Backend sencillo para el frontend React de StoreLab.

## Requisitos

- Node.js 18 o superior
- npm

## Arrancar

Desde esta carpeta:

```bash
npm install
npm run dev
La API queda disponible en:
http://localhost:3000
Endpoints
Productos
GET /api/products
GET /api/products/:id
GET /api/products?category=Surf
Autenticación
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me (requiere Bearer Token)
Registro/login devuelven:
JSON
{
  "data": {
    "user": {
      "id": 1,
      "email": "usuario@email.com",
      "username": "usuario"
    },
    "token": "..."
  }
}
Reseñas
GET /api/reviews/product/:productId
POST /api/reviews (requiere Bearer Token)
PUT /api/reviews/:id (requiere Bearer Token)
DELETE /api/reviews/:id (requiere Bearer Token)
Ejemplo de creación (POST /api/reviews):
JSON
{
  "productId": 1,
  "rating": 5,
  "comment": "Muy buena tabla."
}
Lista de Deseos
GET /api/wishlist (requiere Bearer Token)
POST /api/wishlist/toggle (requiere Bearer Token)
Ejemplo de toggle (POST /api/wishlist/toggle):
JSON
{
  "productId": 1
}