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
```

La API queda disponible en:

http://localhost:3000

## Endpoints

### Productos

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products?category=Surf`

### Reseñas

- `GET /api/review/product/:productId`
- `POST /api/review` (requiere Bearer Token)

Ejemplo:

```json
{
  "productId": 1,
  "rating": 5,
  "comment": "Muy buena tabla."
}
```

### Autenticación

- `POST /auth/register`
- `POST /auth/login`
- `GET /me` (requiere Bearer Token)

Registro/login devuelven:

```json
{
  "data": {
    "user": {
      "id": 1,
      "email": "usuario@email.com"
    },
    "token": "..."
  }
}
```

## Datos

Para mantenerlo sencillo, los datos se guardan en JSON dentro de `data/`.

Esto está bien para un proyecto junior/demo. Para producción convendría usar una base de datos como PostgreSQL o MongoDB y variables de entorno reales para el secreto JWT.
