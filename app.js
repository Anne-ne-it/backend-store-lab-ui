import "dotenv/config"
import express from "express"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js"

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
]

app.use(
  cors({
    origin(origin, callback ) {
      // Permite curl, Postman y peticiones sin Origin
      if (!origin) {
        return callback(null, true)
      }

      // Permite los frontends locales declarados
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      // No lanzar Error: evita convertir CORS en HTTP 500
      console.warn(`Origen bloqueado por CORS: ${origin}`)
      return callback(null, false)
    },
    credentials: true,
  })
)

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "StoreLab API funcionando",
  })
})

app.get("/health", (req, res) => {
  res.json({
    ok: true,
  })
})

app.use("/api/products", productRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/auth", authRoutes)
app.use("/", userRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
